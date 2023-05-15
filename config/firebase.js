import { initializeApp } from "firebase/app";
import Constants from "expo-constants";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {

  apiKey: "AIzaSyCwY69mu5CZBWA_PIkYbcBBnFTWQWULSL0",
  authDomain: "myapp-9d79f.firebaseapp.com",
  databaseURL: "https://myapp-9d79f-default-rtdb.firebaseio.com",
  projectId: "myapp-9d79f",
  storageBucket: "myapp-9d79f.appspot.com",
  messagingSenderId: "822095226396",
  appId: "1:822095226396:web:0ec9ff0a62cc388e4c21d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore();
export const storage = getStorage(app);