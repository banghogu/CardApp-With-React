import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5WmjpLfWYQMGM8GysUyvGJckBlmGIwLE",
  authDomain: "bangcard-fa034.firebaseapp.com",
  projectId: "bangcard-fa034",
  storageBucket: "bangcard-fa034.appspot.com",
  messagingSenderId: "321100083350",
  appId: "1:321100083350:web:8a8e0d2b6089024c8312b7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const store = getFirestore(app);
export const storage = getStorage(app);
