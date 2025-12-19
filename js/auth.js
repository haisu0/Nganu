import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    // Cari role di Firestore collection "atmins"
    const q = query(collection(db,"atmins"), where("email","==",email));
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
