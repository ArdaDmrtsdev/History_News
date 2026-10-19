// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express(); // app en başta tanımlandı

app.use(cors());
app.use(express.json());

// FRONTEND DOSYALARINI SUN
const frontendPath = path.resolve(__dirname, "../frontend");
console.log("Frontend path:", frontendPath); // path kontrolü için

app.use(express.static(frontendPath));

// ====== TAVSİYELER ======
app.get("/tavsiye/:kategori", (req, res) => {
    const kategori = req.params.kategori;
    db.query(
        "SELECT * FROM tavsiye WHERE kategori = ?",
        [kategori],
        (err, result) => {
            if (err) return res.status(500).json({ hata: err.message });
            res.json(result);
        }
    );
});

app.post("/tavsiye", (req, res) => {
    const { baslik, aciklama, kategori, imdb } = req.body;
    db.query(
        "INSERT INTO tavsiye (baslik, aciklama, kategori, imdb) VALUES (?, ?, ?, ?)",
        [baslik, aciklama, kategori, imdb],
        (err) => {
            if (err) return res.status(500).json({ hata: err.message });
            res.json({ mesaj: "Tavsiye eklendi" });
        }
    );
});

app.delete("/tavsiye/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ hata: "Geçersiz ID" });

    db.query(
        "DELETE FROM tavsiye WHERE id = ? LIMIT 1",
        [id],
        (err, result) => {
            if (err) return res.status(500).json({ hata: err.message });
            if (result.affectedRows === 0) {
                return res.json({ mesaj: "Kayıt bulunamadı" });
            }
            res.json({ mesaj: "Tavsiye silindi" });
        }
    );
});

// ====== EN İYİ FİLMLER (IMDB) ======
app.get("/en-iyi-filmler", (req, res) => {
    db.query(
        `SELECT * FROM tavsiye
         WHERE kategori = 'film'
           AND imdb IS NOT NULL
         ORDER BY imdb DESC
         LIMIT 10`,
        (err, result) => {
            if (err) return res.status(500).json({ hata: err.message });
            res.json(result);
        }
    );
});

// ====== ANTİK ŞEHİRLER ======
app.get("/antik_sehirler", (req, res) => {
    db.query("SELECT * FROM antik_sehirler", (err, result) => {
        if (err) return res.status(500).json({ hata: err.message });
        res.json(result);
    });
});

app.post("/antik_sehirler", (req, res) => {
    const { ulke, sehir, bilgi, fotograf } = req.body;
    db.query(
        "INSERT INTO antik_sehirler (ulke, sehir, bilgi, fotograf) VALUES (?, ?, ?, ?)",
        [ulke, sehir, bilgi, fotograf],
        (err) => {
            if (err) return res.status(500).json({ hata: err.message });
            res.json({ mesaj: "Antik şehir eklendi" });
        }
    );
});

// ====== TEST ======
app.get("/test", (req, res) => {
    res.json({ ok: true });
});

// ====== ROOT ======
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// ====== SERVER BAŞLAT ======
app.listen(3001, () => {
    console.log("Server çalışıyor → http://localhost:3001");
});










