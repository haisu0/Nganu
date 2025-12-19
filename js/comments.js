import { db } from "./firebase.js";
import { addDoc, collection } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function addComment(postId, name, message) {
  await addDoc(collection(db, "posts", postId, "comments"), {
    name: name || "Anonim",
    message
  });
}
