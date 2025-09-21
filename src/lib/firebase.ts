
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDCSzowjxm_iouMsr-fMl5mV3jZ_3anFMY",
  authDomain: "mtcmartechgooodstage-456-326b5.firebaseapp.com",
  databaseURL: "https://mtcmartechgooodstage-456-326b5-default-rtdb.firebaseio.com",
  projectId: "mtcmartechgooodstage-456-326b5",
  storageBucket: "mtcmartechgooodstage-456-326b5.appspot.com",
  messagingSenderId: "1027578634776",
  appId: "1:1027578634776:web:ce0c242cb89426ec69196d",
  measurementId: "G-NV310J76N2"
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
