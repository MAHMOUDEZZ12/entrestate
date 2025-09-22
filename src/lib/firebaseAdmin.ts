
'use server';

import {
  getApps,
  initializeApp,
  cert,
  applicationDefault,
  App,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp: App | undefined;

function initializeAdminApp() {
    if (getApps().some(app => app.name === 'firebase-admin-app')) {
        return getApps().find(app => app.name === 'firebase-admin-app');
    }

    try {
        // Recommended for Google Cloud environments
        return initializeApp({
            credential: applicationDefault(),
        }, 'firebase-admin-app');
    } catch (e: any) {
        console.warn(`Admin SDK default credential initialization failed: ${e.message}. Trying service account.`);
        
        const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (serviceAccountString) {
            try {
                const serviceAccount = JSON.parse(serviceAccountString);
                return initializeApp({
                    credential: cert(serviceAccount),
                }, 'firebase-admin-app');
            } catch (parseError: any) {
                console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:", parseError);
                return undefined;
            }
        } else {
            console.warn("FIREBASE_SERVICE_ACCOUNT env var not set. Firebase Admin SDK not initialized.");
            return undefined;
        }
    }
}

adminApp = initializeAdminApp();

const adminDb = adminApp ? getFirestore(adminApp) : null;
const adminAuth = adminApp ? getAuth(adminApp) : null;


if (!adminDb) {
    console.warn("Firestore Admin DB is not available. Check server environment and credentials.");
}

export { adminDb, adminAuth };
