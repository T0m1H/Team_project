import firebase from "firebase/compat/app";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCetG0aIM2sRIW6aXoLXFfF8Eiy8FWpV58",
    authDomain: "team7-mob.firebaseapp.com",
    projectId: "team7-mob",
    storageBucket: "team7-mob.firebasestorage.app",
    messagingSenderId: "862388892179",
    appId: "1:862388892179:web:d044fc930aaa37937d05e6"
};


const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;