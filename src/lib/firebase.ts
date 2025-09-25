
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  const isFirebaseConfigValid = firebaseConfig.apiKey &&
                                firebaseConfig.projectId;

  if (isFirebaseConfigValid) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    // Initialize App Check
    if (process.env.NODE_ENV !== 'production') {
      // Allow self to be garbage collected
      (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }
    
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6Ld-pA8qAAAAAK2Y-hS47w_s_doymXz_Y4E0_z-N'), // Replace with your reCAPTCHA v3 site key
      isTokenAutoRefreshEnabled: true
    });

    isSupported().then(supported => {
        if (supported) {
            analytics = getAnalytics(app as FirebaseApp);
        }
    });
  } else {
    console.warn("Firebase client configuration is missing or incomplete. Firebase services will be unavailable.");
  }
}

export { app, auth, db, analytics };
