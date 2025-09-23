
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");

admin.initializeApp();
const db = admin.firestore();
const storage = new Storage();
const BUCKET = functions.config().firebase.storage_bucket;

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
  
  const file = storage.bucket(BUCKET).file(path);

  const [url] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: contentType,
  });

  // The public URL for accessing the file after upload
  const fileUrl = `https://storage.googleapis.com/${BUCKET}/${path}`;

  return { uploadUrl: url, fileUrl: fileUrl };
});
