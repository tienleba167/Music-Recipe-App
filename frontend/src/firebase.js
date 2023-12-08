// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth, signInWithCustomToken } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGWn54m1a9pVwb5MckBJ6lzG98YuRuzZQ",
  authDomain: "cs411-project-87e5a.firebaseapp.com",
  databaseURL: "https://cs411-project-87e5a-default-rtdb.firebaseio.com",
  projectId: "cs411-project-87e5a",
  storageBucket: "cs411-project-87e5a.appspot.com",
  messagingSenderId: "1055447144285",
  appId: "1:1055447144285:web:702c1f4514191b93753ab4",
  measurementId: "G-NC3BKXHWZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "cs-411-project");
const auth = getAuth(app);

export const databaseRef = ref(getDatabase(app));
export { app, auth, signInWithCustomToken};