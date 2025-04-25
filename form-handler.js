// firebase/form-handler.js
import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    console.log("Form verisi:", { name, email, phone, message });

    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        phone,
        message,
        timestamp: new Date()
      });

      alert("Mesajınız başarıyla gönderildi.");
      form.reset();
    } catch (err) {
      console.error("Firestore Hatası:", err);
      alert("Veri gönderilemedi.");
    }
  });
});
