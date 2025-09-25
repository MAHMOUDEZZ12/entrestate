
'use server';

import {
  getApps,
  initializeApp,
  cert,
  applicationDefault,
  App,
} from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let adminApp: App | undefined;
let adminDb: Firestore | null = null;
let adminAuth: Auth | null = null;

function initializeAdminApp(): App | undefined {
  if (getApps().length > 0) {
    const existingApp = getApps().find(app => app.name === 'firebase-admin-app');
    if (existingApp) {
        // console.log("Found existing Firebase Admin app.");
        return existingApp;
    }
  }

  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
    
    // Vercel or local dev environment with .env.local
    if (serviceAccountString) {
      // console.log("Initializing Firebase Admin with FIREBASE_SERVICE_ACCOUNT...");
      const serviceAccount = JSON.parse(serviceAccountString);
      return initializeApp({ credential: cert(serviceAccount) }, 'firebase-admin-app');
    } 
    // Google Cloud environment (App Hosting, Cloud Run)
    else if (process.env.GOOGLE_CLOUD_PROJECT) {
      // console.log("Initializing Firebase Admin with Application Default Credentials...");
      return initializeApp({ credential: applicationDefault() }, 'firebase-admin-app');
    }
    else {
        console.warn("Firebase Admin SDK not initialized. Neither FIREBASE_SERVICE_ACCOUNT nor GOOGLE_CLOUD_PROJECT environment variables were found.");
        return undefined;
    }
    
  } catch (e: any) {
    console.error("Firebase Admin SDK initialization failed critically. Error:", e.message);
    return undefined;
  }
}

// Initialize on module load
adminApp = initializeAdminApp();

if (adminApp) {
  adminDb = getFirestore(adminApp);
  adminAuth = getAuth(adminApp);
  // console.log("Firebase Admin SDK initialized successfully.");
} else {
  // This message is important for debugging deployment issues.
  console.error("Firebase Admin App is not initialized. All admin-dependent features will be unavailable. Check environment variable configuration.");
}

export { adminDb, adminAuth };
