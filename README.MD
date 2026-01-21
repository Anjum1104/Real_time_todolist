# 🚀 Frontend Developer Internship Task – Full Stack Task Manager
## 🌐 Live Demo

🚀 **Deployed Application:**  
👉 https://task-buddy-app.onrender.com/

> The application is fully deployed and functional.  
> Users can register, log in, and manage tasks through a secure, protected dashboard.

A **production-ready full-stack web application** demonstrating real-world frontend and backend engineering skills.  
This project includes authentication, protected routes, CRUD operations, clean architecture, and scalability considerations.

---

## 📌 Project Overview

This application is a **Task Management System** where users can:

- Register and log in securely
- Access a protected dashboard
- Create, view, update, and delete tasks
- Manage their user profile
- Use the app on both mobile and desktop devices

The project is designed following **modern best practices**, suitable for internship and entry-level developer evaluation.

---

## 🧱 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)
- dotenv
- cors

---

## 📁 Project Structure
frontend-developer-task/
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Login, Register, Dashboard
│ │ ├── services/ # Axios API layer
│ │ ├── hooks/ # Custom React hooks
│ │ ├── utils/ # Helper utilities
│ │ └── App.jsx
│ ├── tailwind.config.js
│ └── package.json
│
├── backend/
│ ├── src/
│ │ ├── routes/ # API routes
│ │ ├── controllers/ # Business logic
│ │ ├── models/ # MongoDB schemas
│ │ ├── middleware/ # Auth & error handling
│ │ ├── config/ # Database config
│ │ └── server.js
│ └── package.json
│
├── postman_collection.json
├── README.md
└── SCALING_NOTES.md
