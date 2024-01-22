// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDg_QqECP0Yl7EyFE1sDj0EggdR_Qm8ZF8',
  authDomain: 'myfirebase-bcca9.firebaseapp.com',
  projectId: 'myfirebase-bcca9',
  storageBucket: 'myfirebase-bcca9.appspot.com',
  messagingSenderId: '451433004149',
  appId: '1:451433004149:web:e6cfb8fb476faeea7a4c3c',
  measurementId: 'G-11VZ0X645L',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);