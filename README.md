
# 🎬 Fullstack Video Application

## 1. Overview
- Project builds → **video streaming platform**.
- Users → **sign up**, **log in**, **browse dashboard**, **watch videos**, **track watch history**.
- Stack → **MERN (MongoDB, Express, React, Node.js)** with **JWT authentication** and **Material UI styling**.

---

## 2. System Architecture
- **Frontend** → React + React Router + Material UI.
- **Backend** → Express.js + MongoDB + JWT.
- **Database** → MongoDB (Mongoose models for User, Video, WatchHistory).
- **Communication** → REST API with protected routes via JWT middleware.

---

## 3. Backend Components

### 3.1 Database Connection (`db.js`)
- Function → `connectDB`.
- Connects → `mongoose` to MongoDB via `MONGO_URI`.
- Exports → connection object.

### 3.2 Server Setup (`server.js`)
- Creates → Express app.
- Loads → middlewares (`cors`, `json`).
- Mounts → `/api/auth` and `/api/videos`.
- Starts → server only after DB connection.

### 3.3 Middleware (`authMiddleware.js`)
- Extracts → `Authorization` header.
- Verifies → JWT with `JWT_SECRET`.
- Attaches → `req.userId`.
- Rejects → if invalid / missing token.

### 3.4 Models
- **User** (`user.js`)
  - Fields → `username`, `email`, `password`.
  - Method → `comparePassword` with bcrypt.
- **Video** (`video.js`)
  - Fields → `title`, `description`, `url`, `thumbnail`, `duration`, `uploadedBy`.
- **WatchHistory** (`watchhistory.js`)
  - Fields → `user`, `video`, `minutesWatched`, `lastWatchedAt`.

### 3.5 Routes
- **Auth (`auth.js`)**
  - POST `/signup` → validate, hash password, create user, issue token.
  - POST `/login` → validate, compare password, issue token.
- **Videos (`video.js`)**
  - GET `/` → fetch all videos (requires auth).
  - GET `/:id` → fetch video by ID.
  - POST `/track` → update watch progress.

---

## 4. Frontend Components

### 4.1 Entry
- **index.js** → React root + `BrowserRouter`.
- **App.js** → Defines routes:
  - `/` → LoginPage
  - `/signup` → SignupPage
  - `/dashboard` → Dashboard
  - `/video/:id` → VideoPage

### 4.2 Pages
- **LoginPage.js**
  - Inputs → email, password.
  - On submit → call `/api/auth/login`.
  - Stores → token + user in localStorage.
  - Redirects → Dashboard.

- **SignupPage.js**
  - Inputs → username, email, password.
  - On submit → call `/api/auth/signup`.
  - Redirects → Login.
  - Handles → duplicate email errors.

- **Dashboard.js**
  - Fetches → videos with token.
  - Displays → username greeting.
  - Shows → video thumbnails as cards.
  - Clicking → navigate to VideoPage.
  - Background → animated cubes.

- **VideoPage.js**
  - Fetches → video by ID.
  - Plays → HTML5 video.
  - Tracks → watch progress (`/api/videos/track`).
  - Back button → returns to Dashboard.
  - Styles → in `VideoPage.css`.

- **AnimatedCubes.js**
  - Renders → moving 3D cubes as animated background.

---

## 5. Key Data Flow
- User signs up → Backend stores user + returns token.
- User logs in → Backend verifies + returns token.
- Token saved → localStorage, used in headers.
- Dashboard fetches → video list with token.
- User selects video → VideoPage loads video.
- Watch progress → tracked by `onTimeUpdate` → `/api/videos/track`.

---

## 6. Security
- Passwords → bcrypt hashed.
- Tokens → JWT with 1-day expiry.
- Protected routes → middleware checks.
- Email → validated regex.
- Password → must contain ≥8 chars, 1 number, 1 special symbol.

---

## 7. Styling and UI
- Framework → Material UI (MUI).
- Colors → gradients for backgrounds.
- Components → Cards, Typography, AppBar, Buttons.
- Dashboard → responsive grid layout.
- VideoPage → fullscreen player with floating button.

---

## 8. Deployment Notes
- Backend → needs `MONGO_URI` and `JWT_SECRET` in `.env`.
- Frontend → assumes backend runs on `http://localhost:5000`.
- Production → update API base URL accordingly.

---

## 9. Future Enhancements
- Video upload feature with file storage (e.g., S3 / Cloudinary).
- Comments and likes per video.
- Playlist creation.
- Admin dashboard for video management.
- Responsive mobile UI improvements.

---
