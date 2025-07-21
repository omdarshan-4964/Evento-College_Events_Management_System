# Evento - College Event Management System

Evento is a full-stack MERN application designed to solve the core problem of venue booking conflicts and streamline event management for college clubs. It provides a centralized platform for admins to manage venues, for clubs to create events and book venues, and for students to discover and register for upcoming events.

## Live Demo

[Link to your deployed application will go here]

## Features

- **Role-Based Access Control:** Differentiated dashboards and permissions for Super Admins, Club Admins, and Students.
- **Venue Management:** Admins can create and manage event venues, setting details like location and capacity.
- **Event & Booking System:** Club admins can create events and submit booking requests for available venues.
- **Conflict Detection:** The backend automatically prevents double-booking of venues for overlapping time slots.
- **Real-time Booking Calendar:** A public calendar that displays all approved events, providing a clear view of venue availability.
- **Student Registration:** Students can browse upcoming events and register with a single click, with automatic capacity enforcement.
- **Analytics Dashboard:** A comprehensive dashboard for super admins to view key metrics and venue utilization charts.
- **Dark/Light Theme:** Modern, responsive UI with a persistent dark mode toggle.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Recharts, React Big Calendar
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT)

---

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (A free MongoDB Atlas account is recommended)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/evento-project.git](https://github.com/your-username/evento-project.git)
    cd evento-project
    ```

2.  **Setup the Backend (`server`):**
    ```bash
    cd server
    npm install
    ```
    - Create a `.env` file in the `server` directory.
    - Copy the contents of `.env.example` into your new `.env` file.
    - Fill in the required environment variables, especially your `MONGO_URI` and a strong `JWT_SECRET`.

3.  **Setup the Frontend (`client`):**
    ```bash
    cd ../client
    npm install
    ```
    - The frontend is configured to proxy API requests to `http://localhost:5000` during development, so no `.env` file is needed for development.

### Running the Application

1.  **Run the Backend Server:**
    - From the `server` directory:
    ```bash
    npm run dev
    ```
    - The server will start on `http://localhost:5000`.

2.  **Run the Frontend Client:**
    - From the `client` directory (in a new terminal):
    ```bash
    npm run dev
    ```
    - The client will start on `http://localhost:5173`.

You can now open your browser and navigate to `http://localhost:5173` to use the application.

---

## Deployment

To deploy this project, you will typically:

1.  **Deploy the Backend:** Host the `server` folder on a service like Render, Vercel, or Heroku. Remember to set your production environment variables in the service's dashboard.
2.  **Deploy the Frontend:** Host the `client` folder on a static hosting service like Netlify or Vercel.
    - Before deploying, you'll need to create a `.env.production` file in the `client` directory.
    - Add the following variable, pointing to your deployed backend URL: `VITE_API_URL=https://your-deployed-backend-url.com`
    - Update the `FRONTEND_URL` in your backend's production environment variables to match your deployed frontend URL to ensure CORS works correctly.
