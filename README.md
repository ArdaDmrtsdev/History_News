[![HTML5](https://img.shields.io/badge/HTML5-Standard-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Standard-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![XAMPP](https://img.shields.io/badge/XAMPP-Local_Server-FB7A24?style=flat-square&logo=xampp&logoColor=white)](https://www.apachefriends.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)



<h1 align="center">History1.0</h1>

<p align="center">
  <b>A history and archaeology platform that connects traces of the past with today</b><br>
  History pages, ancient cities, and a MySQL-powered recommendation corner
</p>

---

## **About the Project**

**History1.0** is a multi-page website built for history and archaeology enthusiasts. The site consists of two parts:

- **Showcase pages:** Home, Modern History, Archaeology, and Civilizations
- **Recommendation Corner:** A dynamic section powered by **Node.js + Express + MySQL**, where book, film, and documentary recommendations can be added and deleted, and ancient cities are listed

---

## **Technologies Used**

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (ES6), Bootstrap 4.6.2, Font Awesome 7 |
| **Backend** | Node.js, Express 5, CORS |
| **Database** | MySQL (XAMPP / MariaDB), `mysql2` package |
| **Fonts** | Google Fonts: Playfair Display, Roboto |

---

## **Project Structure**

```
tavsiye-proje/
├── backend/
│   ├── server.js          # Express server and API endpoints
│   ├── db.js              # MySQL connection
│   └── package.json
└── frontend/
    ├── Tarih.html         # Home page (Bootstrap)
    ├── YakınÇağ.html      # Modern History page
    ├── arkeoloji.html     # Archaeology page
    ├── Uygarlıklar.html   # Civilizations page
    ├── index.html         # Recommendations and Ancient Cities page
    ├── script.js          # JavaScript for the recommendations page
    ├── style.css          # Styles for the recommendations page
    ├── nav.css            # Shared navigation menu styles
    ├── resim/             # Background image
    └── resimler/          # Page images
```

---

## **Frontend: HTML, CSS, and Bootstrap**

### **What was done with Bootstrap 4 (Tarih.html)**
The home page was built with Bootstrap's ready-made patterns:

- **Grid system:** The page is divided into a 12-column grid using the `container`, `row`, `col-md-4`, `col-lg-3`, and `col-sm-12` classes. The layout sits side by side on desktop and stacks vertically on mobile.
- **Card component:** News and discovery cards were created with `card`, `card-body`, `card-title`, `card-text`, and `card-img-top`. `no-gutters` was used for the horizontal card.
- **Spacing utilities:** Classes such as `mt-5`, `my-5`, `mb-3`, and `px-3` adjust margins without writing extra CSS.
- **Font Awesome icons:** Icons are used in the menu and headings.

Custom CSS was layered on top of Bootstrap: a **grow effect on card hover**, a **3D rotation animation** (`rotateY`) on the "Practical Info Corner" box, a **sticky menu** that stays visible while scrolling, and a dark-themed **footer**.

### **Pages built with custom CSS**
The other pages were built without Bootstrap, using hand-written CSS:

- **Modern History:** Timeline, quote cards, document cards, and statistics boxes
- **Archaeology:** Hero header area, excavation site cards, and artifact cards
- **Civilizations:** Zigzag journey through time, collapsible questions using `<details>`, and civilization cards

Shared techniques:
- **CSS variables** (`:root`) for managing colors from a single place
- **CSS Grid** (`repeat(auto-fit, minmax(280px, 1fr))`) for automatically adapting card layouts
- **Media queries** for mobile compatibility
- A consistent **brown / earth-tone** theme across all pages

### **Recommendations page design (style.css)**
- An ancient city image used as a **fixed background**
- Semi-transparent, rounded headings with a **blur effect** (`backdrop-filter`)
- Gradient buttons and card hover animations
- **Dark mode** styles (`body.dark-mode`)
- Gold **IMDB stars** with a "pop" animation
- A round **delete button** in the corner of each card

---

## **JavaScript: What Was Done (script.js)**

All interaction on the recommendations page is handled by JavaScript that sends requests to the backend using `fetch`.

| Function | What it does |
|---|---|
| **`getTavsiyeler(kategori)`** | Fetches records of the selected category (book / film / documentary) with `GET` and turns them into cards. Shows an info message if there are no records. |
| **Form `submit` event** | Sends the new recommendation to the backend with `POST`, clears the form, and refreshes the list. |
| **`getAntikSehirler()`** | Fetches ancient cities from the database and displays them as cards with a photo, city, country, and description. |
| **`silTavsiye(id, kategori)`** | Shows a confirmation dialog (`confirm`), sends a `DELETE` request if confirmed, and refreshes the list. |
| **`imdbToStars(imdb)`** | Converts the IMDB rating (0-10) into a 5-star system. Example: 8.5 becomes 4 out of 5 stars. |
| **`temizImdbDegeri(imdb)`** | Even if the user types `8,5` or `IMDB: 8.5`, it converts the comma to a dot and extracts the number. |
| **Category change** | The IMDB field is only visible when **Film** is selected; it is hidden and cleared for other categories. |
| **Dark mode** | The moon/sun button in the top right is created with JavaScript and toggles the `dark-mode` class. |
| **`getEnIyiFilmler()`** | Lists the top 10 films with the highest IMDB rating, marked with a trophy. |

---

## **Backend: Node.js and Express (server.js)**

The backend is an **Express** server running on port `3001`. It has two jobs:

1. **Serving the frontend files:** The `frontend` folder is published with `express.static`, so the site opens at `http://localhost:3001`.
2. **Providing a REST API:** Database operations are performed through the endpoints below.

| Method | Address | Description |
|---|---|---|
| `GET` | `/tavsiye/:kategori` | Lists recommendations by category |
| `POST` | `/tavsiye` | Adds a new recommendation |
| `DELETE` | `/tavsiye/:id` | Deletes a recommendation |
| `GET` | `/en-iyi-filmler` | Returns the top 10 films by IMDB rating |
| `GET` | `/antik_sehirler` | Lists ancient cities |
| `POST` | `/antik_sehirler` | Adds a new ancient city |
| `GET` | `/test` | Checks whether the server is running |

- **`cors`** allows the frontend to access the API.
- **`express.json()`** reads incoming JSON data.
- All queries use `?` **parameterized queries**, which protects against **SQL injection**.

---

## **MySQL Connection (db.js)**

The database connection is set up with the **`mysql2`** package. Connection details live in `db.js`, and `server.js` imports this file to run queries.

```js
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tarih_tavsiye"
});
```

The database runs on the MySQL (MariaDB) bundled with **XAMPP**. Two tables are used: **`tavsiye`** (book, film, and documentary recommendations) and **`antik_sehirler`** (ancient cities).

---

## **Running the Project**

**1. Start XAMPP:** Open XAMPP and **Start** the **MySQL Database**.

**2. Create the database:** Go to `http://localhost/phpmyadmin` and create a database named `tarih_tavsiye` with the `tavsiye` and `antik_sehirler` tables.

**3. Start the backend:**

```bash
cd backend
npm install
npm start
```

You should see `MySQL bağlandı` and `Server çalışıyor → http://localhost:3001` in the terminal.

**4. Open the site:** Go to the following address in your browser:

```
http://localhost:3001/Tarih.html
```

> Do not open the files by double-clicking them. Open the site through the server so the recommendations page works.

---

## **Features**

- Add, list, and delete book, film, and documentary recommendations
- Display IMDB ratings for films as **stars**
- List ancient cities from the database
- **Dark / light** mode
- **Mobile-friendly** design
- Shared navigation menu across all pages

---

<p align="center">
  © 2025 <b>Tarih1.0</b> • Developer: <i>Your Name</i>
</p>
