import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAL7Ehx5AjaMyZqi9SUY0WweFNwWa5SiMA",
  authDomain: "gamified-programming.firebaseapp.com",
  projectId: "gamified-programming",
  storageBucket: "gamified-programming.appspot.com",
  messagingSenderId: "956821077730",
  appId: "1:956821077730:web:b9cdf0e24cdfda5619a8bb",
  measurementId: "G-MYTY5RESC1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);