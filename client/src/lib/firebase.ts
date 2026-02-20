import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAalYro3vkWGXH9AF2qWY6pDvk4YBkO2T0",
  authDomain: "puchy-e4486.firebaseapp.com",
  projectId: "puchy-e4486",
  appId: "1:827633847742:web:9a3dccc36c64d0fc507def"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
