
'use server';

import {
  getApps,
  initializeApp,
  cert,
  applicationDefault,
  App,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp: App;

try {
    if (getApps().length > 0) {
        adminApp = getApps()[0];
    } else {
        const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (serviceAccountString) {
            try {
                const serviceAccount = JSON.parse(serviceAccountString);
                adminApp = initializeApp({
                    credential: cert(serviceAccount),
                });
            } catch (error: any) {
                 console.warn(`Firebase Admin SDK initialization with service account failed: ${error.message}. Falling back to application default credentials. This is expected in a managed cloud environment.`);
                 adminApp = initializeApp({
                    credential: applicationDefault(),
                 });
            }
        } else {
             adminApp = initializeApp({
                credential: applicationDefault(),
            });
        }
    }
} catch (error: any) {
    console.error("Firebase Admin SDK failed to initialize:", error);
    // If initialization fails, we might not be in a server environment
    // or the credentials are not set up. We'll proceed without a default app
    // and let individual function calls handle their potential failures.
}


const adminDb = adminApp ? getFirestore(adminApp) : null;

if (!adminDb) {
    console.warn("Firestore Admin DB is not available. This might happen if Firebase Admin SDK initialization failed.");
}


export { adminDb };
