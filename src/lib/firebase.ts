
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "mtcmartechgooodstage-456-326b5",
  appId: "1:1027578634776:web:ce0c242cb89426ec69196d",
  apiKey: "AIzaSyDCSzowjxm_iouMsr-fMl5mV3jZ_3anFMY",
  authDomain: "mtcmartechgooodstage-456-326b5.firebaseapp.com",
  messagingSenderId: "1027578634776",
  storageBucket: "mtcmartechgooodstage-456-326b5.appspot.com"
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

// Export the Firestore and Auth instances
export const db = app ? getFirestore(app) : undefined; // Use undefined for better type inference if not initialized
export const auth = app ? getAuth(app) : undefined; // Use undefined for better type inference if not initialized

if (!app) {
    console.warn("Firebase client was not initialized. This may be expected during server-side rendering or if config is missing.");
}
