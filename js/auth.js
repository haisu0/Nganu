import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

window.login = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    const adminDoc = await getDoc(doc(db, "admins", "adminAccount"));
    const viewerDoc = await getDoc(doc(db, "admins", "viewerAccount"));

    if (email === adminDoc.data().email) {
      window.location.href = "admin.html";
    } else if (email === viewerDoc.data().email) {
      window.location.href = "feed.html";
    } else {
      alert("Email tidak terdaftar");
    }

  } catch (err) {
    alert("Login gagal: " + err.message);
  }
};
