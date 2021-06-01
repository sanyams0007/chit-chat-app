import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtqJAkKMtP-PFE6RRpXiW_MhfwS4nOsJ8",
  authDomain: "chat-app-35574.firebaseapp.com",
  projectId: "chat-app-35574",
  storageBucket: "chat-app-35574.appspot.com",
  messagingSenderId: "706515941355",
  appId: "1:706515941355:web:52a1e8eb74fc9acda00bae",
  measurementId: "G-EYM59PMSP3",
};

export const auth = firebase.initializeApp(firebaseConfig).auth();
