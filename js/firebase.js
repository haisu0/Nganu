import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_qOQhRth7t6hsQCt3jhiZE3f8NDdV8vc",
  authDomain: "testtt-97a0c.firebaseapp.com",
  projectId: "testtt-97a0c",
  storageBucket: "testtt-97a0c.firebasestorage.app",
  messagingSenderId: "25840148718",
  appId: "1:25840148718:web:5ae15898445aea9e9bd3ff"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
