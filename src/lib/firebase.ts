import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSXX-1nv2hgrYYrr0thUZiBp8zHV0S9y0",
  authDomain: "thecryptodash-b8ff7.firebaseapp.com",
  projectId: "thecryptodash-b8ff7",
  storageBucket: "thecryptodash-b8ff7.firebasestorage.app",
  messagingSenderId: "241016269355",
  appId: "1:241016269355:web:925802abcbba870374986e",
  measurementId: "G-K2WLRYV6VK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);