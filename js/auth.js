import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

window.login = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    // Cari role di Firestore
    const q = query(collection(db,"admins"), where("email","==",email));
    const snap = await getDocs(q);
    if(snap.empty) return alert("Email belum terdaftar di Firestore");

    const role = snap.docs[0].data().role;

    if(role === "atmin") window.location.href = "admin.html";
    else if(role === "bukanatmin") window.location.href = "feed.html";
    else alert("Role tidak valid");

  } catch(err) {
    alert("Login gagal: " + err.message);
  }
};
