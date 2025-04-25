// Firebase modüllerini içe aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Firebase yapılandırması (atakent-yapi-125df projesi)
const firebaseConfig = {
  apiKey: "AIzaSyCqlGOtYndIvU68qx3JuSn3Nyf5Fiowyyk",
  authDomain: "atakent-yapi-125df.firebaseapp.com",
  projectId: "atakent-yapi-125df",
  storageBucket: "atakent-yapi-125df.firebasestorage.app",
  messagingSenderId: "356561905008",
  appId: "1:356561905008:web:5be6c0e1d0c1751d319bb5",
  measurementId: "G-3DLYSLR3QC"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form gönderimi
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone")?.value || "";
      const message = document.getElementById("message").value;

      try {
        await addDoc(collection(db, "messages"), {
          name,
          email,
          phone,
          message,
          createdAt: new Date()
        });

        // Başarı mesajı göster
        alert("Mesajınız başarıyla gönderildi!");
        form.reset();
      } catch (err) {
        console.error("Hata:", err);
        alert("Mesaj gönderilirken bir hata oluştu.");
      }
    });
  }
});
