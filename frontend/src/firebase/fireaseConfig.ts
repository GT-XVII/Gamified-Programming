// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL7Ehx5AjaMyZqi9SUY0WweFNwWa5SiMA",
  authDomain: "gamified-programming.firebaseapp.com",
  projectId: "gamified-programming",
  storageBucket: "gamified-programming.appspot.com",
  messagingSenderId: "956821077730",
  appId: "1:956821077730:web:b9cdf0e24cdfda5619a8bb",
  measurementId: "G-MYTY5RESC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);