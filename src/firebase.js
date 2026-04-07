// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  //  Firestore import

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCOuN4M3qfUb8jhreTpur8mt8Xen6TkQI",
  authDomain: "clone-project-8f4c3.firebaseapp.com",
  projectId: "clone-project-8f4c3",
  storageBucket: "clone-project-8f4c3.firebasestorage.app",
  messagingSenderId: "728637121299",
  appId: "1:728637121299:web:d368bbf48d6db4f09470e6",
  measurementId: "G-HVV738Q460"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
