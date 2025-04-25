// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Firebase konfigürasyonu
const firebaseConfig = {
  apiKey: "AIzaSyCqlGOtYndIvU68qx3JuSn3Nyf5Fiowyyk",
  authDomain: "atakent-yapi-125df.firebaseapp.com",
  projectId: "atakent-yapi-125df",
  storageBucket: "atakent-yapi-125df.firebasestorage.app",
  messagingSenderId: "356561905008",
  appId: "1:356561905008:web:5be6c0e1d0c1751d319bb5",
  measurementId: "G-3DLYSLR3QC"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Verileri çek
async function loadMessages() {
        const tableBody = document.querySelector("#messagesTable tbody");
        tableBody.innerHTML = "<tr><td colspan='6'>Yükleniyor...</td></tr>";
      
        try {
          const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
          const snapshot = await getDocs(q);
      
          if (snapshot.empty) {
            tableBody.innerHTML = "<tr><td colspan='6' class='text-center'>Henüz mesaj yok.</td></tr>";
            return;
          }
      
          let html = "";
          snapshot.forEach(doc => {
            const data = doc.data();
            const id = doc.id;
            const date = data.timestamp?.toDate?.().toLocaleString("tr-TR") || "Yok";
            const statusBadge = data.status === "yanıtlandı"
              ? `<span class="badge bg-success">Yanıtlandı</span>`
              : `<span class="badge bg-warning text-dark">Bekliyor</span>`;
      
            html += `
              <tr>
                <td>${data.name || "-"}</td>
                <td>${data.email || "-"}</td>
                <td>${data.phone || "-"}</td>
                <td>${data.message || "-"}</td>
                <td>${date}</td>
                <td>
                  ${statusBadge}
                  <div class="mt-2 d-flex gap-2">
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteMessage('${id}')">Sil</button>
                    <button class="btn btn-sm btn-outline-primary" onclick="markAsAnswered('${id}')">Yanıtlandı</button>
                  </div>
                </td>
              </tr>
            `;
          });
      
          tableBody.innerHTML = html;
      
        } catch (error) {
          console.error("Veriler alınamadı:", error);
          tableBody.innerHTML = "<tr><td colspan='6' class='text-danger text-center'>Hata oluştu.</td></tr>";
        }
      }
      

      
      


      




// Sayfa yüklendiğinde başlat
document.addEventListener("DOMContentLoaded", loadMessages);
