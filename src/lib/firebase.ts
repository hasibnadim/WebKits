'use client';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOCso7zupq3-YW8MWSPSwolw5R44WWQeI",
  authDomain: "go2let.firebaseapp.com",
  projectId: "go2let",
  storageBucket: "go2let.firebasestorage.app",
  messagingSenderId: "73342434802",
  appId: "1:73342434802:web:35ea92bbfc38365edc3f6b",
  measurementId: "G-3YW1GJSWPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client-side and if supported
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

// Initialize Firebase Auth and providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 
export const db = getFirestore(app);
export { analytics };
export default app;