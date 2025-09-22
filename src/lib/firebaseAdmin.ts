
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

function initializeAdminApp(): App | undefined {
    if (getApps().length > 0 && getApps().find(app => app.name === 'firebase-admin-app')) {
        return getApps().find(app => app.name === 'firebase-admin-app');
    }

    try {
        const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (serviceAccountString) {
            console.log("Initializing Firebase Admin with FIREBASE_SERVICE_ACCOUNT...");
            const serviceAccount = JSON.parse(serviceAccountString);
            return initializeApp({ credential: cert(serviceAccount) }, 'firebase-admin-app');
        }

        // Recommended for Google Cloud environments (e.g., Cloud Run, App Hosting)
        console.log("Initializing Firebase Admin with Application Default Credentials...");
        return initializeApp({ credential: applicationDefault() }, 'firebase-admin-app');
        
    } catch (e: any) {
        console.error("Firebase Admin SDK initialization failed critically.", e);
        console.warn("Ensure FIREBASE_SERVICE_ACCOUNT is set for local/Vercel or Application Default Credentials are available for Google Cloud environments.");
        return undefined;
    }
}

try {
    adminApp = initializeAdminApp();
} catch (e) {
    console.error("Caught an error during top-level Firebase Admin initialization:", e);
}


const adminDb: Firestore | null = adminApp ? getFirestore(adminApp) : null;
const adminAuth: Auth | null = adminApp ? getAuth(adminApp) : null;

if (!adminApp) {
    console.error("Firebase Admin App is not initialized. All admin features will be unavailable.");
} else if (!adminDb || !adminAuth) {
    console.error("Firebase Admin features (Firestore or Auth) are partially unavailable. Ensure server environment is configured correctly.");
}

export { adminDb, adminAuth };
