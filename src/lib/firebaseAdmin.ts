
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
        // Recommended for Google Cloud environments (e.g., Cloud Run, App Hosting)
        return initializeApp({ credential: applicationDefault() }, 'firebase-admin-app');
    } catch (e: any) {
        // Fallback for local development or other environments
        const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (serviceAccountString) {
            try {
                const serviceAccount = JSON.parse(serviceAccountString);
                return initializeApp({ credential: cert(serviceAccount) }, 'firebase-admin-app');
            } catch (parseError: any) {
                console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT JSON. Firebase Admin SDK not initialized.", parseError.message);
                return undefined;
            }
        } else {
            console.warn("Firebase Admin SDK not initialized. Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT.");
            return undefined;
        }
    }
}

adminApp = initializeAdminApp();

const adminDb: Firestore | null = adminApp ? getFirestore(adminApp) : null;
const adminAuth: Auth | null = adminApp ? getAuth(adminApp) : null;

if (!adminDb || !adminAuth) {
    console.error("Firebase Admin features are unavailable. Ensure server environment is configured correctly.");
}

export { adminDb, adminAuth };
