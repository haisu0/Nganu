import { db, storage } from "./firebase.js";
import { addDoc, collection, serverTimestamp } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

window.upload = async () => {
  const type = document.getElementById("type").value;
  const caption = document.getElementById("caption").value;
  const file = document.getElementById("file").files[0];

  let url = "";

  if (type !== "text") {
    const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    url = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "posts"), {
    type,
    url,
    caption,
    createdAt: serverTimestamp()
  });

  alert("Upload berhasil!");
};
