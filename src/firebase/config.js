// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABAdrtrCfOvVEFoiRzM6xMUCWShgndj7k",
  authDomain: "seacatering-efda0.firebaseapp.com",
  projectId: "seacatering-efda0",
  storageBucket: "seacatering-efda0.firebasestorage.app",
  messagingSenderId: "740671546539",
  appId: "1:740671546539:web:ea7684937e47bd1ccd03ee",
  measurementId: "G-57JVJL1HYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db }