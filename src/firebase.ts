import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// This configuration object connects the SDK to specific Firebase project.
// These keys are generated in the Firebase console.
const firebaseConfig = {
    apiKey: "AIzaSyCetG0aIM2sRIW6aXoLXFfF8Eiy8FWpV58",
    authDomain: "team7-mob.firebaseapp.com",
    projectId: "team7-mob",
    storageBucket: "team7-mob.firebasestorage.app",
    messagingSenderId: "862388892179",
    appId: "1:862388892179:web:d044fc930aaa37937d05e6"
};

// Initialize the Firebase application with the config object.
// This 'app' object is the main entry point for all Firebase services.
const app = firebase.initializeApp(firebaseConfig);
// Create and export the authentication service instance.
// Other files (like Login.tsx, AuthContext.tsx) will import `auth`
// to handle user login, logout, and registration
export const auth = app.auth();
export default app;