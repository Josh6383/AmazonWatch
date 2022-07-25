// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYaxESDdUGtGALxig_Yu_YJwRbx1BWdnA",
  authDomain: "watch-b9943.firebaseapp.com",
  projectId: "watch-b9943",
  storageBucket: "watch-b9943.appspot.com",
  messagingSenderId: "301245347345",
  appId: "1:301245347345:web:c9e5877b76d5cc9f4f23b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);