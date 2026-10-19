// ====== TAVSİYELER ======
function getTavsiyeler(kategori) {
    fetch(`http://localhost:3001/tavsiye/${kategori}`)
        .then(res => res.json())
        .then(data => {
            const cards = document.getElementById("cards");
            cards.innerHTML = "";
            if (data.length === 0) {
                cards.innerHTML = "<p>Bu kategoride tavsiye yok.</p>";
                return;
            }
         data.forEach(item => {
    let imdbHTML = "";

    if (kategori === "film") {
       imdbHTML = `
    <p class="imdb-text">IMDB: ${item.imdb}</p>
    ${imdbToStars(item.imdb)}
`;

    }

    cards.innerHTML += `
        <div class="tavsiye-card">
            <h3>${item.baslik}</h3>
            <p>${item.aciklama}</p>
            ${imdbHTML}
               <button class="sil-btn" onclick="silTavsiye(${item.id}, '${kategori}')">
            ❌ Sil
        </button>
        </div>
    `;
});

        })
        .catch(err => console.error("Hata:", err));
}

// Tavsiye ekleme formu
const form = document.getElementById("tavsiye-form");
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const baslik = form.baslik.value;
    const aciklama = form.aciklama.value;
    const kategori = form.kategori.value;
    const imdb = form.imdb.value;

    fetch("http://localhost:3001/tavsiye", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baslik, aciklama, kategori, imdb })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.mesaj);
        form.reset();
        getTavsiyeler(kategori);
    })
    .catch(err => console.error("Hata:", err));
});

// ====== ANTİK ŞEHİRLER ======
function getAntikSehirler() {
    fetch("http://localhost:3001/antik_sehirler")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("antik-cards");
            container.innerHTML = "";
            if (data.length === 0) {
                container.innerHTML = "<p>Bu kategoride antik şehir yok.</p>";
                return;
            }
            data.forEach(item => {
                container.innerHTML += `
                    <div class="antik-card">
                        <img src="${item.fotograf}" alt="${item.sehir}">
                        <h3>${item.sehir}, ${item.ulke}</h3>
                        <p>${item.bilgi}</p>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Hata:", err));
}
// Dark / Light Mode toggle
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "🌙 / ☀️";
toggleBtn.className = "toggle-mode";
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
// ====== KATEGORİYE GÖRE IMDB GÖSTER / GİZLE ======
const kategoriSelect = document.getElementById("kategori");
const imdbInput = document.getElementById("imdb");

if (kategoriSelect && imdbInput) {
    imdbInput.style.display = "none"; // ilk başta gizli

    kategoriSelect.addEventListener("change", () => {
        if (kategoriSelect.value === "film") {
            imdbInput.style.display = "block";
        } else {
            imdbInput.style.display = "none";
            imdbInput.value = "";
        }
    });
}
// ====== IMDB PUANINI YILDIZA ÇEVİR ======
function imdbToStars(imdb) {
    const temizImdb = temizImdbDegeri(imdb);
    if (!temizImdb) return "";

    const starCount = Math.round(temizImdb / 2);
    let starsHTML = "";

    for (let i = 1; i <= 5; i++) {
        starsHTML += `<span class="star ${i <= starCount ? "filled" : ""}">★</span>`;
    }

    return `<div class="stars">${starsHTML}</div>`;
}

function temizImdbDegeri(imdb) {
    if (!imdb) return null;

    // String ise sadece sayıyı ayıkla
    if (typeof imdb === "string") {
        imdb = imdb.replace(",", "."); // 8,5 → 8.5
        const match = imdb.match(/(\d+(\.\d+)?)/);
        if (!match) return null;
        imdb = parseFloat(match[0]);
    }

    if (isNaN(imdb)) return null;
    return imdb;
}
function silTavsiye(id, kategori) {
    if (!id) {
        alert("Geçersiz kayıt, silinemedi.");
        return;
    }

    if (!confirm("Bu tavsiyeyi silmek istediğine emin misin?")) return;

    fetch(`http://localhost:3001/tavsiye/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        alert(data.mesaj);
        getTavsiyeler(kategori);
    })
    
    .catch(err => console.error("Silme hatası:", err));
}
function getEnIyiFilmler() {
    fetch("http://localhost:3001/en-iyi-filmler")
        .then(res => res.json())
        .then(data => {
            const cards = document.getElementById("cards");
            cards.innerHTML = "";

            if (data.length === 0) {
                cards.innerHTML = "<p>Henüz IMDB puanlı film yok.</p>";
                return;
            }

            data.forEach(item => {
                cards.innerHTML += `
                    <div class="tavsiye-card">
                        <h3>🏆 ${item.baslik}</h3>
                        <p>${item.aciklama}</p>

                        <div class="imdb-stars">
                            ${imdbToStars(item.imdb)}
                            <span class="imdb-text">${item.imdb}</span>
                        </div>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Hata:", err));
}







