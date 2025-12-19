import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.login = async () => {
  const email = email.value;
  const password = password.value;

  await signInWithEmailAndPassword(auth, email, password);

  const admin = await getDoc(doc(db, "admins", "adminAccount"));
  const viewer = await getDoc(doc(db, "admins", "viewerAccount"));

  if (email === admin.data().email) {
    location.href = "admin.html";
  } else if (email === viewer.data().email) {
    location.href = "feed.html";
  }
};
