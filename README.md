
# 🏨 StayFinder — Hotel Management System

A fully responsive Hotel Management application built with **React JS**, **Redux Toolkit**, and **Bootstrap 5**. This project was developed as part of an interview assignment.

## 📌 Project Overview
StayFinder is a Single Page Application (SPA) that allows users to manage hotel listings. Users can view, add, edit, delete, search, and filter hotels. The application includes a detail page with map integration, SEO optimization, and an extra **"Stats & Compare"** dashboard to showcase data insights.

## 🛠️ Technology Stack
- **Frontend:** React JS, Vite, JavaScript (ES6+)
- **State Management:** Redux Toolkit (Thunks for async actions)
- **Routing:** React Router DOM (v6 - `createBrowserRouter`)
- **Styling:** Bootstrap 5, Custom CSS3
- **SEO:** React Helmet Async
- **Icons:** Lucide React
- **Map:** Leaflet, React Leaflet (OpenStreetMap)
- **Backend (Mock):** json-server (simulating REST APIs)
- **HTTP Client:** Axios
- **Code Quality:** ESLint

## ✨ Key Features
1. **CRUD Operations:** Create, Read, Update, and Delete hotel records.
2. **API-Level Filtering:** Search by title and filter by price range using json-server query parameters (`title_like`, `price_gte`, `price_lte`).
3. **Pagination:** Server-side pagination using `_page` and `_limit`.
4. **Form Validation:** Custom validation for image, title, description, price, and coordinates.
5. **Image Upload:** Preview image before saving (Base64 implementation for mock backend).
6. **Geolocation API:** Displays the hotel's location and the user's current location on a Leaflet map.
7. **SEO Optimized:** Dynamic page titles and meta descriptions using React Helmet.
8. **Responsive UI:** Mobile-first design with a collapsible filter sidebar and Bootstrap grid.
9. **Extra Feature:** 
   - **Dashboard:** Displays total hotels, average price, and price categories (Budget, Mid, Luxury).
   - **Comparison Tool:** Side-by-side comparison of two selected hotels.

## 📂 Folder Structure
```text
src/
├── components/   # Reusable UI components
│   ├── Header.jsx
│   ├── HotelCard.jsx
│   ├── HotelForm.jsx
│   ├── HotelMap.jsx
│   └── Pagination.jsx
├── pages/        # Route pages
│   ├── AddHotelPage.jsx
│   ├── EditHotelPage.jsx
│   ├── ExtrasPage.jsx
│   ├── HotelDetailsPage.jsx
│   ├── HotelListPage.jsx
│   └── NotFoundPage.jsx
├── redux/        # State management
│   ├── hotelSlice.js
│   └── store.js
├── services/     # API integration
│   └── hotelService.js
├── utils/        # Helper functions
│   ├── imageHelper.js
│   └── validation.js
├── styles/       # Global CSS
│   └── global.css
├── App.jsx
├── main.jsx
└── router.jsx


## 🚀 How to Run Locally

1. **Install dependencies:**
   ```bash
  // npm install

2.Start the mock backend (json-server):
(Open a new terminal and run this)

   // npx json-server --watch db.json --port 5000   

3.Start the React development server:
(In a separate terminal)

   //  npm run dev

4.Open http://localhost:5173 in your browser.

🗄️ Mock Backend (db.json)
The app uses json-server to simulate a Node.js/Express + PostgreSQL backend. The db.json file acts as the local database. It supports standard RESTful methods:

GET /api/hotels (Supports _page, _limit, title_like, price_gte, price_lte)

POST /api/hotels

PUT /api/hotels/:id

DELETE /api/hotels/:id

⚠️ Known Limitations
Image Storage: Images are converted to Base64 strings for the mock backend. In a production environment, images should be uploaded to a cloud storage service (like AWS S3 or Cloudinary) and only the URL should be saved in the database.

Authentication: No user login/authentication is implemented (as per task scope).

Backend: Uses mock data (json-server) instead of a real Node.js + PostgreSQL database.