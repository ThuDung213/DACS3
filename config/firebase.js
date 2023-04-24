
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCwY69mu5CZBWA_PIkYbcBBnFTWQWULSL0",
    authDomain: "myapp-9d79f.firebaseapp.com",
    projectId: "myapp-9d79f",
    storageBucket: "myapp-9d79f.appspot.com",
    messagingSenderId: "822095226396",
    appId: "1:822095226396:web:0ec9ff0a62cc388e4c21d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// // Initialize Firebase Authentication and get a reference to the service

export const auth = getAuth(app);
// export const firestore = app.firestore();