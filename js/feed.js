import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const feed = document.getElementById("feed-container");

const loadFeed = async () => {
  feed.innerHTML = "";
  const q = query(collection(db,"posts"), orderBy("createdAt","desc"));
  const snap = await getDocs(q);

  snap.forEach(docSnap => {
    const data = docSnap.data();
    const card = document.createElement("div");
    card.classList.add("post-card");

    let content = "";
    if(data.type==="image") content += `<img src="${data.url}">`;
    if(data.type==="video") content += `<video controls src="${data.url}"></video>`;
    if(data.type==="music") content += `<audio controls src="${data.url}"></audio>`;
    if(data.type==="text") content += `<p class="caption">${data.caption}</p>`;
    if(data.caption && data.type!=="text") content += `<p class="caption">${data.caption}</p>`;

    // Komentar input
    content += `
      <div class="comment-section" id="comment-section-${docSnap.id}">
        <input type="text" id="name-${docSnap.id}" placeholder="Nama (opsional)">
        <input type="text" id="msg-${docSnap.id}" placeholder="Komentar">
        <button onclick="addComment('${docSnap.id}')">Kirim</button>
        <div id="comment-list-${docSnap.id}"></div>
      </div>
    `;
    card.innerHTML = content;
    feed.appendChild(card);

    // Load komentar
    loadComments(docSnap.id);
  });
};

window.addComment = async (postId) => {
  const name = document.getElementById(`name-${postId}`).value || "Anonim";
  const msg = document.getElementById(`msg-${postId}`).value;
  if(!msg) return alert("Isi komentar dulu!");

  await addDoc(collection(db,"posts",postId,"comments"),{
    name, message: msg
  });

  document.getElementById(`msg-${postId}`).value = "";
  loadComments(postId);
};

const loadComments = async (postId) => {
  const commentList = document.getElementById(`comment-list-${postId}`);
  commentList.innerHTML = "";
  const q = query(collection(db,"posts",postId,"comments"));
  const snap = await getDocs(q);
  snap.forEach(docSnap => {
    const c = docSnap.data();
    const p = document.createElement("p");
    p.textContent = `${c.name}: ${c.message}`;
    commentList.appendChild(p);
  });
};

loadFeed();
