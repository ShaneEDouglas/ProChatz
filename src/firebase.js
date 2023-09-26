
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
 
const apikey =process.env.REACT_APP_FIREBASE_KEY;
// Firebase Configuration
const firebaseConfig = {
        apiKey: "AIzaSyAfBPZ_0e2FxvBHS7V7Y3OWq2YV5jEF3AM",
        authDomain: "prochatz.firebaseapp.com",
        projectId: "prochatz",
        storageBucket: "prochatz.appspot.com",
        messagingSenderId: "2843648135",
        appId: "1:2843648135:web:daa046265850170e3a5822",
        measurementId: "G-TTYF769JPX"
    
}

const app = initializeApp(firebaseConfig)

//Databse and authentication
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage();


export {app, db, auth, provider, storage}


