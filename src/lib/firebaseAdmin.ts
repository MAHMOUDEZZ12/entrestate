
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
    if (getApps().some(app => app.name === 'firebase-admin-app')) {
        return getApps().find(app => app.name === 'firebase-admin-app');
    }

    try {
        const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (serviceAccountString) {
            const serviceAccount = JSON.parse(serviceAccountString);
            return initializeApp({ credential: cert(serviceAccount) }, 'firebase-admin-app');
        }

        // Recommended for Google Cloud environments (e.g., Cloud Run, App Hosting)
        return initializeApp({ credential: applicationDefault() }, 'firebase-admin-app');
    } catch (e: any) {
        console.error("Firebase Admin SDK initialization failed.", e.message);
        console.warn("Set FIREBASE_SERVICE_ACCOUNT (for local/Vercel) or ensure Application Default Credentials are available (for Google Cloud).");
        return undefined;
    }
}

adminApp = initializeAdminApp();

const adminDb: Firestore | null = adminApp ? getFirestore(adminApp) : null;
const adminAuth: Auth | null = adminApp ? getAuth(adminApp) : null;

if (!adminDb || !adminAuth) {
    console.error("Firebase Admin features are unavailable. Ensure server environment is configured correctly.");
}

export { adminDb, adminAuth };
