// from firebase setting
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm8axiYJnWGlqq7ursNYCXr7M8PSV3I8c",
  authDomain: "beer-favorite.firebaseapp.com",
  projectId: "beer-favorite",
  storageBucket: "beer-favorite.appspot.com",
  messagingSenderId: "251444552022",
  appId: "1:251444552022:web:6ff8d17b7ae9451f25b6f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// use for auth and firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
