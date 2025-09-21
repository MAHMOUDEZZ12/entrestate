
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase for client-side (browser) usage
function getClientApp() {
    if (getApps().length) {
        return getApp();
    }
    
    const isFirebaseConfigValid = firebaseConfig.apiKey &&
                                  firebaseConfig.authDomain &&
                                  firebaseConfig.projectId;

    if (!isFirebaseConfigValid) {
        console.error("Firebase client configuration is missing or incomplete. Please check your environment variables.");
        // Return null or throw an error to prevent further issues if config is bad
        return null;
    }
    
    return initializeApp(firebaseConfig);
}

const app = getClientApp();

// Initialize Analytics if supported
let analytics;
if (app && typeof window !== 'undefined') {
    isSupported().then(supported => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

// Export the Firestore and Auth instances
export const db = app ? getFirestore(app) : undefined;
export const auth = app ? getAuth(app) : undefined;

if (!app) {
    console.warn("Firebase client was not initialized. This may be expected during server-side rendering or if config is missing.");
}
