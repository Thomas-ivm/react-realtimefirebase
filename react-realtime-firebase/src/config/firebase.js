// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJYyQ-LlCFBnCc952bSkNdWOkQq3S5P7Y",
  authDomain: "react-realtime-firebase.firebaseapp.com",
  databaseURL: "https://react-realtime-firebase-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "react-realtime-firebase",
  storageBucket: "react-realtime-firebase.appspot.com",
  messagingSenderId: "879127573975",
  appId: "1:879127573975:web:3181d1623bf9d83d5e4792",
  measurementId: "G-SE1GN9D5JE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
const provider = new OAuthProvider('microsoft.com');