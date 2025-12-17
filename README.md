MERN Stack Mini Event Platform

A full-stack MERN application that allows users to create events, view upcoming events, and RSVP while enforcing strict capacity, authorization, and concurrency rules.
The application is fully deployed with a production-ready backend and frontend.

Live Application

Frontend (Vercel):
https://mern-stack-assignment-three.vercel.app/

Backend (Render):
Deployed and connected via API

Source Code

GitHub Repository:
https://github.com/sainirahul1/MernStack-Assignment

Project Overview

This project was built as part of a Full Stack Developer Intern Technical Screening Assignment.
The goal was to design, implement, and deploy a secure and scalable event management platform using the MERN stack.

The application allows users to:

Register and authenticate securely

Create events with capacity limits

View all upcoming events

RSVP to events with strict capacity enforcement

Leave events

Edit or delete only the events they created

Special care has been taken to handle race conditions, authorization, and data integrity, following real-world backend engineering practices.

Technology Stack
Frontend

React.js (Vite)

React Router DOM

Axios

Plain CSS (responsive layout)

React Toastify (notifications)

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JSON Web Tokens (JWT)

bcrypt

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Application Architecture
Backend Architecture

The backend follows a clean, modular structure:

server/
├── server.js            # Entry point
├── src/
│   ├── app.js           # Express app configuration
│   ├── config/
│   │   └── db.js        # MongoDB connection
│   ├── models/
│   │   ├── User.js
│   │   └── Event.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── event.controller.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── event.routes.js
│   └── middleware/
│       └── auth.middleware.js


Responsibilities are clearly separated into routes, controllers, models, and middleware.

Frontend Architecture

The frontend uses a component-based React structure:

event-platform-client/
├── src/
│   ├── api/
│   │   └── api.js       # Axios configuration
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── CreateEvent.jsx
│   ├── App.jsx
│   └── main.jsx


Routing, authentication state, and API communication are handled cleanly.

Authentication & Authorization (JWT)

Users register and log in using email and password

Passwords are hashed using bcrypt

On successful login, a JWT token is issued

The token is stored in localStorage

Axios automatically attaches the token to protected requests

Backend middleware verifies the token and extracts user identity

This approach enables stateless, scalable authentication without server-side sessions.

Event Management (CRUD)

Authenticated users can:

Create events

Update events they created

Delete events they created

Each event stores a createdBy field.
Before updating or deleting an event, ownership is verified to prevent unauthorized access.

RSVP System & Concurrency Handling

The RSVP system enforces strict business rules:

Event capacity cannot be exceeded

A user can RSVP only once

Multiple users attempting to RSVP simultaneously cannot overbook an event

Implementation Strategy

The RSVP logic uses an atomic MongoDB update:

$expr and $size ensure capacity is not exceeded

$addToSet prevents duplicate RSVPs

The operation executes as a single database transaction

Because the update is atomic, race conditions are safely handled even under concurrent requests.

Default Event Image Strategy

A single standard default image is applied at the schema level in the backend:

Ensures every event always has an image

Eliminates frontend conditional logic

Maintains consistent UI

Keeps the database clean and predictable

If the user does not provide an image, the default image is automatically stored.

UI & User Experience

Responsive layout using CSS Grid and Flexbox

Event cards adapt to different screen sizes

Clean and minimal forms

Toast-based notifications instead of blocking alerts

Navbar dynamically updates based on authentication state

Environment Variables
Backend (server/.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Frontend (event-platform-client/.env)
VITE_API_URL=http://localhost:5000/api


In production, environment variables are configured directly on Render and Vercel.

How to Run Locally
1. Clone the Repository
git clone https://github.com/sainirahul1/MernStack-Assignment.git
cd MernStack-Assignment

2. Backend Setup
cd server
npm install
npm run dev


Backend runs at:

http://localhost:5000

3. Frontend Setup
cd event-platform-client
npm install
npm run dev


Frontend runs at:

http://localhost:5173

Deployment

Backend deployed on Render

Frontend deployed on Vercel

Database hosted on MongoDB Atlas

Environment variables securely configured in deployment platforms

Both deployments are publicly accessible and production-ready.

Assignment Alignment

This project fulfills all mandatory requirements:

Secure authentication

Event CRUD operations

Capacity-safe RSVP system

Concurrency handling

Responsive UI

Cloud deployment

Additional polish such as clean architecture, notifications, and default image handling has been added without overengineering.

Conclusion

This MERN Stack Mini Event Platform demonstrates practical full-stack development skills, real-world backend logic, and production deployment practices.
The application is clean, secure, scalable, and fully aligned with the technical screening requirements.