import { db, storage } from "./firebase.js";
import { addDoc, collection, serverTimestamp, query, orderBy, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const feedContainer = document.getElementById("admin-feed");

window.uploadMedia = async () => {
  const type = document.getElementById("media-type").value;
  const caption = document.getElementById("caption-input").value;
  const file = document.getElementById("file-input").files[0];

  let url = "";

  if(type !== "text") {
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
  loadAdminFeed();
};

export const loadAdminFeed = async () => {
  feedContainer.innerHTML = "";
  const q = query(collection(db, "posts"), orderBy("createdAt","desc"));
  const snap = await getDocs(q);

  snap.forEach(post => {
    const data = post.data();
    const card = document.createElement("div");
    card.classList.add("post-card");
    let content = "";

    if(data.type === "image") content += `<img src="${data.url}">`;
    if(data.type === "video") content += `<video controls src="${data.url}"></video>`;
    if(data.type === "music") content += `<audio controls src="${data.url}"></audio>`;
    if(data.type === "text") content += `<p>${data.caption}</p>`;
    if(data.caption && data.type!=="text") content += `<p class="caption">${data.caption}</p>`;

    content += `<button onclick="deletePost('${post.id}')">Hapus Post</button>`;
    card.innerHTML = content;
    feedContainer.appendChild(card);
  });
};

window.deletePost = async (id) => {
  const docRef = doc(db,"posts",id);
  await deleteDoc(docRef);
  alert("Post dihapus!");
  loadAdminFeed();
};

loadAdminFeed();
