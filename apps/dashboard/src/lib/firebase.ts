// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_ugh40lxNwpXpq8XvUhFY_Vtx8G3FL2A",
  authDomain: "upvote-app-196ea.firebaseapp.com",
  projectId: "upvote-app-196ea",
  storageBucket: "upvote-app-196ea.firebasestorage.app",
  messagingSenderId: "764291055557",
  appId: "1:764291055557:web:05a17401454d5fdb4cd5ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
