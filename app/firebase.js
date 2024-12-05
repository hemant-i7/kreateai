import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUR2hegNuUxbwiL8pKoHGUNglm6DL7j8g",
  authDomain: "kreateai-c1b8d.firebaseapp.com",
  projectId: "kreateai-c1b8d",
  storageBucket: "kreateai-c1b8d.firebasestorage.app",
  messagingSenderId: "129285470043",
  appId: "1:129285470043:web:8fc2d23e4e4f5594580c7e",
  measurementId: "G-B6KQ63BJXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;