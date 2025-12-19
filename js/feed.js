import { db } from "./firebase.js";
import { collection, getDocs, orderBy, query } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const feed = document.getElementById("feed");

const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
const snap = await getDocs(q);

snap.forEach(doc => {
  const p = doc.data();
  let html = `<div class="post">`;

  if (p.type === "image") html += `<img src="${p.url}">`;
  if (p.type === "video") html += `<video controls src="${p.url}"></video>`;
  if (p.type === "music") html += `<audio controls src="${p.url}"></audio>`;
  if (p.type === "text") html += `<p>${p.caption}</p>`;

  if (p.caption && p.type !== "text") {
    html += `<p class="caption">${p.caption}</p>`;
  }

  html += `</div>`;
  feed.innerHTML += html;
});
