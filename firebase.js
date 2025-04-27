// firebase.js

// 1) Firebase core (CDN 경로)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAnalytics }  from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js';

// 2) Firestore (CDN 경로)
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

// 3) Firebase 설정 (기존대로)
const firebaseConfig = {
  apiKey: "AIzaSyCZnA996rXWWWpKgGbMjU48w3jTuUZQoGk",
  authDomain: "cardshare-3b852.firebaseapp.com",
  projectId: "cardshare-3b852",
  storageBucket: "cardshare-3b852.appspot.com",
  messagingSenderId: "252755775508",
  appId: "1:252755775508:web:b20d968138914ea09b1701",
  measurementId: "G-YKXNQKFNTR"
};

// 4) 초기화
const app       = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db        = getFirestore(app);

// 5) export
export {
  db,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
};
