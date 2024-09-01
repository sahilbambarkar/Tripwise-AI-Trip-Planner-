// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDVRZOdK-zJrvCVv6kaqgYY8r7oMWe-eOk",
    authDomain: "ai-trip-planner-40b66.firebaseapp.com",
    projectId: "ai-trip-planner-40b66",
    storageBucket: "ai-trip-planner-40b66.appspot.com",
    messagingSenderId: "458700712552",
    appId: "1:458700712552:web:4b4be86021b579d9a369dd",
    measurementId: "G-DZ3GTKT1VF"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app)
