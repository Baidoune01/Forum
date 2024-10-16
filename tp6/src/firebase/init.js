// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCT9D8IzdI_6JBKW5Fj7LEjetyDt2Wy0Q0",
    authDomain: "tp6-e8c21.firebaseapp.com",
    projectId: "tp6-e8c21",
    storageBucket: "tp6-e8c21.appspot.com",
    messagingSenderId: "1025019096036",
    appId: "1:1025019096036:web:40b537a670e88cd5fbb5f1",
    measurementId: "G-5NF45Q87RV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };