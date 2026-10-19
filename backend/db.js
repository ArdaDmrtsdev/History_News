// backend/db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "user here",
    password: "password here",
    database: "tarih_tavsiye"
});

db.connect(err => {
    if (err) console.error("MySQL bağlantı hatası:", err);
    else console.log("MySQL bağlandı");
});

module.exports = db;
