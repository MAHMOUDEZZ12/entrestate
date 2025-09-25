
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

interface FirebaseServices {
    app: FirebaseApp;
    auth: Auth;
    db: Firestore;
    analytics: Analytics | null;
}

// Centralized function to get Firebase services
export function getFirebase(): FirebaseServices | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const isFirebaseConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId;

  if (!isFirebaseConfigValid) {
    console.warn("Firebase client configuration is missing or incomplete. Firebase services will be unavailable.");
    return null;
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  let analytics: Analytics | null = null;
  
  isSupported().then(supported => {
      if (supported) {
          analytics = getAnalytics(app);
      }
  });

  return { app, auth, db, analytics };
}

// We still export the individual services for any legacy imports,
// but the new preferred way is via getFirebase().
const services = getFirebase();
export const app = services?.app;
export const auth = services?.auth;
export const db = services?.db;
export const analytics = services?.analytics;
