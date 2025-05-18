Berikut adalah versi **README** yang telah dimodifikasi dan ditingkatkan untuk mencerminkan upgrade yang Anda lakukan pada fitur fuzzy search dengan toleransi 60% dan algoritma Levenshtein:

---

# 🔍 Fuzzy Search Table — React + Vite Application

A powerful and responsive table application built with **React**, **Vite**, **TailwindCSS**, **Fuzzysort.js**, and a custom **Levenshtein Distance** algorithm for highly tolerant fuzzy searching.

## ✨ Features

* 🔎 Global and per-column search filters
* 🔁 Fuzzy matching with typo tolerance (60% similarity)
* 📄 Pagination for large datasets
* 📱 Responsive design
* ✨ Smart highlighting for matched results
* 🎚️ Adjustable similarity tolerance via slider
* 📉 Algorithmic scoring and matching detail view
* 💨 Smooth row transition animations

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn

### Installation

```bash
# Install dependencies
npm install    # or yarn

# Start the development server
npm run dev    # or yarn dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```plaintext
fuzzy-search-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── FuzzySearchTable.jsx    # Main table UI
│   │   ├── SearchInput.jsx         # Reusable search input
│   │   ├── Pagination.jsx          # Page navigation
│   │   └── TableRow.jsx            # Row display + smart highlighting
│   ├── data/
│   │   └── employees.js            # Sample dataset
│   ├── hooks/
│   │   └── useFuzzySearch.js       # Core fuzzy + Levenshtein logic
│   ├── utils/
│   │   └── levenshtein.js          # Levenshtein algorithm & similarity scoring
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🧠 How Fuzzy Search Works (60% Tolerance)

This app combines **Fuzzysort.js** with a **Levenshtein Distance** algorithm to deliver typo-tolerant search.

### 1. **Fuzzysort Threshold Matching**

* Uses score-based fuzzy matching (lower score = better match)
* A 60% tolerance roughly corresponds to a `threshold ≈ -400`
* Formula:

  ```js
  threshold = -1000 * (1 - tolerancePercent / 100)
  ```

### 2. **Levenshtein Distance Matching**

* Calculates the number of character edits needed to match
* Converts that into a similarity percentage:

  ```js
  similarity = (1 - distance / maxLength) * 100
  ```
* Matches if `similarity ≥ 60%`

### 3. **Text Normalization**

* Case-insensitive
* Removes extra spaces, trims input

---

## 💡 Key Functionalities

* **Multi-layered Matching**:

  * ✅ Direct substring search
  * ✅ Fuzzysort score-based matching
  * ✅ Levenshtein similarity matching

* **Highlighting**:

  * Matches are highlighted (even fuzzy ones)
  * Fallback to Levenshtein-based highlighting if Fuzzysort fails

* **Tolerance Slider**:

  * Users can adjust tolerance level from 0%–100%
  * Affects both Fuzzysort threshold & Levenshtein cutoff

---

## 🧪 Examples

| Input        | Matches              |
| ------------ | -------------------- |
| `mikale`     | Michael, Mike, Mikel |
| `jonson`     | Johnson              |
| `engenering` | Engineering          |
| `dev`        | Developer            |
| `mgr`        | Manager              |
| `senior dev` | Senior Developer     |

---

## 🛠 Build for Production

```bash
npm run build    # or yarn build
```

Files will be compiled to the `dist/` folder.

---

## 🧰 Tech Stack

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [TailwindCSS](https://tailwindcss.com/)
* [Fuzzysort.js](https://github.com/farzher/fuzzysort)
* [Font Awesome](https://fontawesome.com/)
* **Levenshtein Distance** (custom implementation)

---

## 🎮 Demo Highlights

* Real-time search with typo tolerance
* Adjustable tolerance via slider
* Highlighting logic adapts to match type (exact, fuzzy, Levenshtein)
* Intuitive UI for navigating large datasets

---

## 📌 Contribution

Have suggestions or want to improve the search logic? PRs are welcome!

---

Jika Anda ingin saya bantu menambahkan badge GitHub, lisensi, atau instruksi deployment (misalnya ke Netlify atau Vercel), beri tahu saya!
