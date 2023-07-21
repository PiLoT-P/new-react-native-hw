// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-rppA9YBnxW5pqGSvpu7z-cAZD90_4mw",
  authDomain: "myapp-86680.firebaseapp.com",
  databaseURL: "https://myapp-86680-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myapp-86680",
  storageBucket: "myapp-86680.appspot.com",
  messagingSenderId: "404535708183",
  appId: "1:404535708183:web:975539fd68e0a4d1146a52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);