
'use server';

import {
  getApps,
  initializeApp,
  cert,
  applicationDefault,
  App,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getFirebaseAdminApp(): App {
    if (getApps().length > 0) {
        return getApps()[0];
    }

    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountString) {
        try {
            const serviceAccount = JSON.parse(serviceAccountString);
            return initializeApp({
                credential: cert(serviceAccount),
            });
        } catch (error: any) {
            console.warn(`Firebase Admin SDK initialization with service account failed: ${error.message}. Falling back to application default credentials. This is expected in a managed cloud environment.`);
        }
    }
    
    return initializeApp({
        credential: applicationDefault(),
    });
}

const app = getFirebaseAdminApp();
const adminDb = getFirestore(app);

export { adminDb };
