import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FASTCARD_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FASTCARD_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FASTCARD_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FASTCARD_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FASTCARD_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FASTCARD_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}