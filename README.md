# 🗳️ Voting Application

A full-stack voting application with role-based authentication, built using **Node.js**, **Express**, **MongoDB**, and vanilla **JavaScript**. Users can securely log in and cast a single vote, while admins can monitor live results through a dedicated dashboard.

---

## 📋 Features

- 🔐 **Secure Authentication** — JWT-based login with bcrypt password hashing
- 🗳️ **One Vote Per User** — Users can vote only once; duplicate attempts are blocked
- 👤 **Role-Based Access** — Separate views for regular users and admin
- 📊 **Live Results Dashboard** — Admin can view real-time vote counts and percentages
- 🚪 **Logout Functionality** — Users and admin can securely log out
- 💾 **Persistent Storage** — All data stored in MongoDB, survives server restarts

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3 (inline styling)
- JavaScript (Fetch API)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)

---

## 📁 Project Structure

```
voting-app/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema (username, password, role, hasVoted)
│   │   └── Vote.js          # Vote schema (candidate, count)
│   ├── server.js            # Express server & API routes
│   ├── seed.js               # Seeds database with users & candidates
│   └── package.json
└── frontend/
    ├── index.html            # Redirects to login page
    ├── login.html             # Login page (user + admin)
    ├── vote.html               # Voting page for users
    └── admin.html              # Results dashboard for admin
```

---

## ⚙️ Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org) (v16 or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

---

## 🚀 Installation & Setup

### 1. Clone or download the project
```bash
cd voting-app/backend
```

### 2. Install dependencies
```bash
npm install express cors body-parser mongoose bcryptjs jsonwebtoken
```

### 3. Start MongoDB
Open a terminal and run:
```bash
mongod
```

### 4. Seed the database
This creates 10 users, 1 admin, and 3 candidates.
```bash
node seed.js
```
You should see: `✅ Database seeded!`

> ⚠️ Run this only once. Running it again will wipe and reset all votes.

### 5. Start the server
```bash
node server.js
```
You should see:
```
✅ MongoDB connected
✅ Server running at http://localhost:3000
```

### 6. Open the app
Visit **http://localhost:3000** in your browser.

---

## 🔑 Login Credentials

| Username | Password | Role |
|----------|----------|------|
| user1 – user10 | pass1 – pass10 | User |
| admin | admin123 | Admin |

---

## 🔄 How It Works

```
Login Page
   ├── User login  → Vote Page  (vote once → logout)
   └── Admin login → Admin Page (view live results → logout)
```

1. **Login** — User enters credentials, receives a JWT token stored in `localStorage`
2. **Vote** — User selects a candidate; backend checks `hasVoted` flag before recording the vote
3. **Results** — Admin views vote counts and percentages per candidate, pulled live from MongoDB
4. **Logout** — Clears the token and redirects to the login page

---

## 📡 API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|--------------|
| POST | `/api/login` | Public | Authenticate user/admin, returns JWT token |
| POST | `/api/vote` | User only | Cast a vote for a candidate (one-time) |
| GET | `/api/results` | Admin only | Fetch vote counts for all candidates |

---

## 🔮 Future Scope

- Prevent double voting using sessions across devices
- Real-time updates using WebSockets
- Add user registration with admin approval
- Mobile-responsive UI improvements
- Email notification on successful vote

---

## 👨‍💻 Author

Built as a Full Stack Development Lab Project — Sreyas Institute of Engineering and Technology.
