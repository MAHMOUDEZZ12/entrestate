/* index.js - XML import preview + confirm + export
   Deploy: firebase deploy --only functions
*/
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const { parseStringPromise, Builder } = require("xml2js");
const Ajv = require("ajv");
const { v4: uuidv4 } = require("uuid");

admin.initializeApp();
const db = admin.firestore();
const storage = new Storage();
const BUCKET = functions.config().firebase.storage_bucket; // auto-provided

// ---------- JSON Schema (AJV) for basic SearchEngineContext validation ----------
const ajv = new Ajv({ allErrors: true, strict: false });
const searchContextSchema = {
  type: "object",
  properties: {
    SearchEngineContext: {
      type: "object",
      properties: {
        Site: {
          type: "object",
          properties: {
            $: { type: "object", properties: { domain: { type: "string" } }, required: ["domain"] },
            Page: {
              oneOf: [
                { type: "array", items: { type: "object" } },
                { type: "object" }
              ]
            }
          },
          required: ["$"]
        }
      },
      required: ["Site"]
    }
  },
  required: ["SearchEngineContext"]
};
const validateSearchContext = ajv.compile(searchContextSchema);

// ---------- Utility: create upload URL and xmlImports doc ----------
exports.createUploadUrl = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Auth required");
  const { filename, type } = data;
  if (!filename || !type) throw new functions.https.HttpsError("invalid-argument", "filename & type required");

  const uid = context.auth.uid;
  const importId = `${uid}_${Date.now()}_${uuidv4().slice(0,8)}`;
  const destPath = `xml_imports/${uid}/${importId}/${filename}`;

  const importDoc = {
    type,
    fileName: filename,
    storagePath: destPath,
    ownerUid: uid,
    status: "created",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };

  await db.collection("xmlImports").doc(importId).set(importDoc);

  const bucket = storage.bucket(BUCKET);
  const file = bucket.file(destPath);
  const expiresAt = Date.now() + 1000 * 60 * 30; // 30 minutes

  const [uploadUrl] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: expiresAt,
    contentType: "application/xml"
  });

  return { uploadUrl, importId, destPath };
});

// ---------- Storage trigger: parse XML -> write preview to xmlImports/{importId}.preview ----------
exports.onXmlUploaded = functions.storage.object().onFinalize(async (object) => {
  const storagePath = object.name;
  if (!storagePath || !storagePath.startsWith("xml_imports/")) return null;

  // path: xml_imports/{uid}/{importId}/{filename}
  const parts = storagePath.split("/");
  if (parts.length < 4) return null;
  const uid = parts[1];
  const importId = parts[2];

  const importRef = db.collection("xmlImports").doc(importId);
  await importRef.update({ status: "processing", updatedAt: admin.firestore.FieldValue.serverTimestamp() });

  try {
    const bucket = storage.bucket(object.bucket || BUCKET);
    const file = bucket.file(storagePath);
    const [contents] = await file.download();
    const xmlText = contents.toString("utf8");

    // parse XML
    const parsed = await parseStringPromise(xmlText, { explicitArray: false, trim: true, mergeAttrs: true });

    // Basic detection
    const rootKey = Object.keys(parsed)[0] || "";
    if (rootKey.toLowerCase().includes("searchengine") || rootKey.toLowerCase().includes("searchcontext")) {
      // validate structure with schema
      const valid = validateSearchContext(parsed);
      if (!valid) {
        await importRef.update({ status: "error", errors: validateSearchContext.errors, processedAt: admin.firestore.FieldValue.serverTimestamp() });
        return null;
      }
      // create preview payload (first few pages)
      const ctx = parsed.SearchEngineContext;
      const site = ctx.Site;
      const domain = (site && site.domain) || (site.$ && site.$.domain) || (site.$ && site.$.domain);
      // normalize pages
      let pages = [];
      if (site.Page) {
        pages = Array.isArray(site.Page) ? site.Page : [site.Page];
      }
      // map to preview objects (limit to first 10)
      const previewPages = pages.slice(0, 10).map(p => ({
        url: p.url || p.$?.url || (p.$ && p.$.url) || null,
        title: p.title || p.$?.title || null,
        lang: p.lang || p.$?.lang || "en",
        summary: p.Summary || p.summary || null,
        tags: (p.Tags && (Array.isArray(p.Tags.Tag) ? p.Tags.Tag : [p.Tags.Tag]).filter(Boolean)) || [],
        meta: (p.CustomMeta && (Array.isArray(p.CustomMeta.Item) ? p.CustomMeta.Item : [p.CustomMeta.Item]).reduce((acc, it) => {
          const key = it.$?.key || it.key;
          const value = (it._ !== undefined) ? it._ : (it.value || "");
          if (key) acc[key] = value;
          return acc;
        }, {})) || {}
      }));

      await importRef.update({
        status: "pending_preview",
        preview: { domain: domain || "unknown", pages: previewPages, rawXmlPath: storagePath },
        processedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      return null;
    } else {
      // not a search context - mark error
      await importRef.update({ status: "error", errors: ["unrecognized root: " + rootKey], processedAt: admin.firestore.FieldValue.serverTimestamp() });
      return null;
    }
  } catch (err) {
    console.error("XML parse error:", err);
    await importRef.update({ status: "error", errors: [err.message || String(err)], processedAt: admin.firestore.FieldValue.serverTimestamp() });
    return null;
  }
});

// ---------- Confirm import callable: commit preview -> searchContext/{domain}/pages ----------
exports.confirmImport = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Auth required");
  const { importId, mergePolicy } = data; // mergePolicy: "overwrite" | "skip" (default skip)
  if (!importId) throw new functions.https.HttpsError("invalid-argument", "importId required");

  const importRef = db.collection("xmlImports").doc(importId);
  const importDoc = (await importRef.get()).data();
  if (!importDoc) throw new functions.https.HttpsError("not-found", "import not found");
  if (importDoc.ownerUid !== context.auth.uid) throw new functions.https.HttpsError("permission-denied", "not owner");
  if (importDoc.status !== "pending_preview") throw new functions.https.HttpsError("failed-precondition", "import not in preview state");

  const preview = importDoc.preview;
  if (!preview || !preview.pages) throw new functions.https.HttpsError("failed-precondition", "no preview available");

  const domain = preview.domain || (`import-${importId}`);
  const pages = preview.pages;

  // commit pages in batches
  const batch = db.batch();
  const siteDocRef = db.collection("searchContext").doc(domain);
  batch.set(siteDocRef, { domain, importedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });

  pages.forEach(p => {
    const pageId = encodeURIComponent(p.url || (uuidv4()));
    const pageRef = siteDocRef.collection("pages").doc(pageId);
    if (mergePolicy === "overwrite") {
      batch.set(pageRef, {
        url: p.url,
        title: p.title,
        lang: p.lang,
        summary: p.summary,
        tags: p.tags || [],
        meta: p.meta || {},
        importedFrom: importId,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } else {
      // skip duplicates: create only if not exists (we can't conditionally in batch easily, do set with merge)
      batch.set(pageRef, {
        url: p.url,
        title: p.title,
        lang: p.lang,
        summary: p.summary,
        tags: p.tags || [],
        meta: p.meta || {},
        importedFrom: importId,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }
  });

  await batch.commit();
  await importRef.update({ status: "done", committedAt: admin.firestore.FieldValue.serverTimestamp() });
  return { ok: true, committed: pages.length };
});

// ---------- Export function: build XML from searchContext domain and return signed GET url ----------
exports.exportSearchContext = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Auth required");
  const { domain } = data;
  if (!domain) throw new functions.https.HttpsError("invalid-argument", "domain required");

  const siteDoc = await db.collection("searchContext").doc(domain).get();
  if (!siteDoc.exists) throw new functions.https.HttpsError("not-found", "domain not found");

  const pagesSnap = await siteDoc.ref.collection("pages").get();
  const pages = [];
  pagesSnap.forEach(doc => pages.push(doc.data()));

  const xmlObj = {
    SearchEngineContext: {
      $: { exportDate: new Date().toISOString(), source: "firestore" },
      Site: {
        $: { domain },
        Page: pages.map(p => ({
          $: { url: p.url || "", title: p.title || "", lang: p.lang || "en" },
          Summary: p.summary || "",
          Tags: { Tag: (p.tags || []) },
          CustomMeta: { Item: Object.entries(p.meta || {}).map(([k, v]) => ({ $: { key: k }, _: String(v) })) }
        }))
      }
    }
  };

  const builder = new Builder({ headless: false, xmldec: { version: '1.0', encoding: 'UTF-8' } });
  const xml = builder.buildObject(xmlObj);

  // store into storage and generate GET URL
  const filePath = `xml_exports/${context.auth.uid}/search_context_${domain}_${Date.now()}.xml`;
  const bucket = storage.bucket(BUCKET);
  const file = bucket.file(filePath);
  await file.save(xml, { contentType: 'application/xml' });
  const [url] = await file.getSignedUrl({ version: 'v4', action: 'read', expires: Date.now() + 1000 * 60 * 60 });

  return { downloadUrl: url, filePath };
});
