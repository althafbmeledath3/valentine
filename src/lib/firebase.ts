import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS3gpt5DH-WwCdSqEdzrzvKyWVPVnb1rI",
  authDomain: "valentinedatabase.firebaseapp.com",
  projectId: "valentinedatabase",
  storageBucket: "valentinedatabase.firebasestorage.app",
  messagingSenderId: "501679264191",
  appId: "1:501679264191:web:caae78b1021d45d50ad10a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
