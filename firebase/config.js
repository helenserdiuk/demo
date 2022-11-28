import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB6GN4I-UEAF_ut1_waOIFxWRKx2n12A8k",
  authDomain: "rn-demo-7942d.firebaseapp.com",
  databaseURL:
    "https://rn-demo-7942d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rn-demo-7942d",
  storageBucket: "rn-demo-7942d.appspot.com",
  messagingSenderId: "414594801102",
  appId: "1:414594801102:web:e0e782da1184fe760f5f9f",
  measurementId: "G-PZ7RH69P9T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
