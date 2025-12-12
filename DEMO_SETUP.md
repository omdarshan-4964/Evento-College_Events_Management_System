# 🎉 Evento - Demo Setup Guide

## For Recruiters & Visitors

Welcome! This guide will help you quickly set up and explore the **full functionality** of the Evento project, including all user roles (Student, Club Admin, Super Admin).

---

## 🚀 Quick Start (5 Minutes Setup)

### Step 1: Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the `server` folder with your MongoDB connection:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Step 3: Seed the Database with Demo Data

This command will populate your database with:
- ✅ 5 Demo Users (Student, Club Admins, Super Admin)
- ✅ 8 Sample Events (Future events with different categories)
- ✅ 5 Venues (Auditoriums, Seminar Halls, etc.)
- ✅ 6 Bookings (Approved and Pending)
- ✅ 3 Event Registrations

Run the seed command:

```bash
cd server
npm run seed
```

You should see a success message with all demo credentials listed!

### Step 4: Start the Application

```bash
# Terminal 1: Start the backend server
cd server
npm run dev

# Terminal 2: Start the frontend client
cd client
npm run dev
```

---

## 🔐 Demo Credentials

The application comes with pre-configured demo accounts:

### 👨‍🎓 Student Account
- **Email:** `student@demo.com`
- **Password:** `demo123`
- **Features:** View events, register for events, see upcoming events

### 👔 Club Admin Account
- **Email:** `club@demo.com`
- **Password:** `demo123`
- **Features:** Create events, request venue bookings, manage club events

### 🔧 Tech Club Admin
- **Email:** `techclub@demo.com`
- **Password:** `demo123`
- **Features:** Manage tech-related events and workshops

### 🎭 Cultural Club Admin
- **Email:** `cultural@demo.com`
- **Password:** `demo123`
- **Features:** Manage cultural events and festivals

### 👑 Super Admin Account
- **Email:** `admin@demo.com`
- **Password:** `demo123`
- **Features:** 
  - User management (change user roles)
  - Venue management (add/edit/delete venues)
  - Approve/reject booking requests
  - View analytics and reports
  - Full system access

---

## 🎯 How to Explore Different Dashboards

1. **Visit the Home Page:** You'll see a demo banner explaining the features
2. **Click Login:** You'll find clickable demo credential cards
3. **One-Click Login:** Click any credential card to auto-fill and explore!
4. **Switch Roles:** Logout and login with different accounts to see various dashboards

---

## 📊 What You'll See

### Student Dashboard
- List of upcoming events
- Your registered events
- Event registration functionality

### Club Admin Dashboard
- Create new events
- View your club's events
- Request venue bookings
- Track booking status

### Super Admin Dashboard
- **User Management:** View all users, change roles
- **Venue Management:** Add/edit/delete venues
- **Analytics:** View system statistics
- **Booking Approvals:** Approve or reject booking requests

---

## 🛠️ Troubleshooting

### Database is Empty
If you don't see events after logging in, make sure you ran the seed command:
```bash
cd server
npm run seed
```

### Already Have Data
The seed script will **clear existing data** and create fresh demo data. This is intentional for demo purposes.

### Need to Reset Data
Simply run the seed command again:
```bash
npm run seed
```

---

## 💡 Project Highlights

This project demonstrates:
- ✅ **Role-Based Access Control (RBAC)** - Three distinct user roles
- ✅ **RESTful API** with Express.js and MongoDB
- ✅ **Modern React UI** with Tailwind CSS and dark mode
- ✅ **Event Management System** - Complete CRUD operations
- ✅ **Venue Booking System** - With approval workflow
- ✅ **User Management** - Admin can change user roles
- ✅ **Authentication & Authorization** - JWT-based security
- ✅ **Responsive Design** - Works on all devices

---

## 📱 Pages to Explore

1. **Home Page** - Landing page with project overview
2. **Dashboard** - Role-specific dashboards
3. **Calendar** - View all events on a calendar
4. **My Registrations** - Student's registered events
5. **User Management** - Super Admin only
6. **Venue Management** - Super Admin only
7. **Analytics** - Super Admin only

---

## 🎨 Tech Stack

**Frontend:**
- React 18
- React Router
- Tailwind CSS
- Lucide Icons
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

---

## 📧 Contact

For any questions about this project, feel free to reach out!

Happy Exploring! 🚀
