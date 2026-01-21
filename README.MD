# 🚀 Frontend Developer Task – Full Stack Task Manager
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

## 🔐 Features

### Authentication
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes

### User Management
- Fetch user profile
- Update user profile

### Task Manager (CRUD)
- Create tasks
- Fetch user-specific tasks
- Update tasks
- Delete tasks
- Search and filter tasks

### Frontend
- Protected dashboard
- Responsive design
- Centralized API handling
- Loading and error states
- Logout functionality

---

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |

### User
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/user/profile` | Get user profile |
| PUT | `/user/profile` | Update profile |

### Tasks
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/tasks` | Create task |
| GET | `/tasks` | Get all tasks |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

> 🔐 All `/user` and `/tasks` routes are protected using JWT.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd frontend-developer-task
