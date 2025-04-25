import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqlGOtYndIvU68qx3JuSn3Nyf5Fiowyyk",
  authDomain: "atakent-yapi-125df.firebaseapp.com",
  projectId: "atakent-yapi-125df",
  storageBucket: "atakent-yapi-125df.appspot.com",
  messagingSenderId: "356561905008",
  appId: "1:356561905008:web:5be6c0e1d0c1751d319bb5",
  measurementId: "G-3DLYSLR3QC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Kontrol için console.log ekle
    console.log({ name, email, phone, message });

    if (!name || !email || !message) {
      alert("Lütfen zorunlu alanları doldurunuz.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        phone,
        message,
        timestamp: new Date()
      });

      // Bildirim
      document.getElementById("formMessage").style.display = "block";
      form.reset();
    } catch (err) {
      console.error("Hata:", err);
      alert("Mesaj gönderilemedi, lütfen tekrar deneyiniz.");
    }
  });
});
