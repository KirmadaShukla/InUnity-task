# InUnity Task

A full-stack MERN application for collaborative learning groups and personal goal tracking.

---

## Features
- User authentication (register, login, logout)
- Create and join learning groups
- View group members
- Create, view, and update personal learning goals
- Modern, responsive UI (React + Tailwind)
- RESTful API (Express + MongoDB)

---

## Project Structure

```
InUnity-task/
  backend/      # Node.js + Express + MongoDB API
  frontend/     # React + Vite + Tailwind frontend
```

---

## Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```
2. **Configure environment:**
   - Create a `.env` file in `backend/` with:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=3000
     ```
3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The API will run on `http://localhost:3000/api` by default.

---

## Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Start the frontend dev server:**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173` by default.

---

## Usage

- Register a new account or log in.
- Create or join groups.
- Click a group to view its members.
- Add, view, and update your learning goals.
- Logout securely from the navigation bar.

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose

---

## Scripts

### Backend
- `npm run dev` — Start backend with nodemon
- `npm start` — Start backend normally

### Frontend
- `npm run dev` — Start frontend dev server
- `npm run build` — Build frontend for production

---

