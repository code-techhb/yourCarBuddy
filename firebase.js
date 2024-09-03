// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuhYiaMAZSCNEJNGGBj_yKmaoEFJFM4rY",
  authDomain: "carbuddy-5456a.firebaseapp.com",
  projectId: "carbuddy-5456a",
  storageBucket: "carbuddy-5456a.appspot.com",
  messagingSenderId: "437771114485",
  appId: "1:437771114485:web:d4c9a4921cc15d777db2bc",
  measurementId: "G-EXEFJWB01F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app)

export {db}

export default app