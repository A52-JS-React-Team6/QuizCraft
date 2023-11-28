// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBvDbJb1tM4dbICwXckgLuFm1QPcSSTj74",
  authDomain: "quizcraft-76a19.firebaseapp.com",
  projectId: "quizcraft-76a19",
  storageBucket: 'gs://quizcraft-76a19.appspot.com',
  messagingSenderId: "642106802855",
  appId: "1:642106802855:web:f33754f1c53252306d5182",
  databaseURL: "https://quizcraft-76a19-default-rtdb.europe-west1.firebasedatabase.app/",
  measurementId: "G-GZTT7PP9WC"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
