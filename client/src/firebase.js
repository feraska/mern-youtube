// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2UfMerr4C-XCLmiFfO_kLDnifkvY9EoU",
  authDomain: "video-f4753.firebaseapp.com",
  projectId: "video-f4753",
  storageBucket: "video-f4753.appspot.com",
  messagingSenderId: "25196772273",
  appId: "1:25196772273:web:8140c8968d2e73677e1b90",
  measurementId: "G-VML2TLLG6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app