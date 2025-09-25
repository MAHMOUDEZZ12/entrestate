
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
const { google } = require('googleapis');
const dataflow = google.dataflow('v1b3');
const cheerio = require('cheerio');


admin.initializeApp();
const db = admin.firestore();
const storage = new Storage();

// In a real production environment, this would be stored more securely (e.g., Secret Manager)
const BUCKET = functions.config().firebase?.storage_bucket || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;


// Creates a signed URL for uploading a file to a user-specific path.
exports.createUploadUrl = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Authentication required.");
  }
  const uid = context.auth.uid;
  const { filename, type, contentType } = data; // type: 'logo' or 'knowledge_base'

  if (!filename || !type || !contentType) {
    throw new functions.https.HttpsError("invalid-argument", "filename, type, and contentType are required.");
  }

  const fileId = uuidv4();
  const path = `${type}/${uid}/${fileId}/${filename}`;
  
  if (!BUCKET) {
      throw new functions.https.HttpsError('internal', 'Storage bucket is not configured.');
  }

  const file = storage.bucket(BUCKET).file(path);

  const [url] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: contentType,
  });
  
  // Also create a record in Firestore to track this import
  const importRef = db.collection("xmlImports").doc(fileId);
  await importRef.set({
      type: "search_context_xml",
      fileName: filename,
      storagePath: path,
      ownerUid: uid,
      status: "awaiting_upload",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return { uploadUrl: url, importId: fileId };
});


// New function to trigger a Dataflow job
async function launchDataflowJob(jobName, parameters) {
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    const projectId = process.env.GCLOUD_PROJECT;
    if (!projectId) {
        throw new functions.https.HttpsError('internal', 'Google Cloud Project ID is not configured.');
    }

    const gcsPath = `gs://dataflow-templates-us-central1/latest/flex/My_Pipeline_Template`; // Example, should be your template

    const request = {
        projectId: projectId,
        location: 'us-central1',
        resource: {
            jobName: `${jobName.replace(/_/g, '-')}-${Date.now()}`,
            parameters: parameters,
            environment: {},
            gcsPath: gcsPath
        }
    };

    // This is where you would call the actual API. We simulate for now.
    // const response = await dataflow.projects.locations.flexTemplates.launch(request);
    // return response.data.job;

    return {
        id: `df-job-${Date.now()}`,
        name: request.resource.jobName,
        status: 'JOB_STATE_PENDING',
        parameters: parameters,
        gcsPath: gcsPath
    };
}

exports.triggerDataflow = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be an authenticated admin.');
    }
    
    const { jobType, params } = data;
    if (!jobType) {
        throw new functions.https.HttpsError('invalid-argument', "A 'jobType' is required.");
    }

    let jobResult;
    if (jobType === 'deep-ingestion') {
        jobResult = await launchDataflowJob('deep-ingestion', {
            target_url: params.targetUrl || 'https://www.bayut.com',
            output_table: `${process.env.GCLOUD_PROJECT}:entrestate.layer1_listings`,
        });
    } else if (jobType === 'transform-market-data') {
         jobResult = await launchDataflowJob('transform-market-data', {
            input_gcs_path: `gs://${BUCKET}/market_data/options_data.csv`,
            output_bigquery_table: `${process.env.GCLOUD_PROJECT}:entrestate.transformed_market_data`,
        });
    } else {
        throw new functions.https.HttpsError('invalid-argument', `Unknown job type: ${jobType}`);
    }

    await db.collection('dataflow_jobs').add({
        jobType,
        jobId: jobResult.id,
        status: 'PENDING',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        parameters: jobResult.parameters,
    });

    return { status: 'Dataflow job launch request sent.', job: jobResult };
});


// New function to trigger scraping
async function scrapeSite(source) {
    let projects = [];
    if (source === 'dxboffplan') {
        const baseUrl = "https://dxboffplan.com";
        const response = await fetch(`${baseUrl}/developers/`);
        const html = await response.text();
        const $ = cheerio.load(html);
        $('.project-item').each((i, el) => {
            const name = $(el).find('h2').text().trim();
            if (name) projects.push({ id: `dxboffplan-${name.toLowerCase().replace(/\s+/g, '-')}`, name });
        });
    }
    // Add other sources here...
    return projects;
}

exports.triggerScrape = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be an authenticated admin.');
    }
    const { source } = data;
    if (!source) {
        throw new functions.https.HttpsError('invalid-argument', 'A source is required.');
    }
    
    const projects = await scrapeSite(source);
    if (projects.length === 0) {
      return { projectsAdded: 0, source, message: "No projects found or failed to parse." };
    }

    const batch = db.batch();
    projects.forEach(project => {
      const docRef = db.collection('projects_catalog').doc(project.id);
      batch.set(docRef, { ...project, source, scrapedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    });

    await batch.commit();
    return { projectsAdded: projects.length, source };
});
