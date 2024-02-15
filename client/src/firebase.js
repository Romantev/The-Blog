// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "the-blog-432f2.firebaseapp.com",
  projectId: "the-blog-432f2",
  storageBucket: "the-blog-432f2.appspot.com",
  messagingSenderId: "154162761528",
  appId: "1:154162761528:web:3d5656696c768c833d7bcd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
