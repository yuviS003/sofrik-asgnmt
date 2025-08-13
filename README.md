# Project Management Tool

A full-stack project management application built with Next.js (TypeScript) for the frontend, Node.js/Express for the backend, and MongoDB for the database. The application supports user authentication, project creation, task tracking, and includes a seed script for populating the database with dummy data.

## Features

- **User Authentication**:
- Register and login with email and password
- JWT-based authentication
- Passwords hashed using bcrypt

- **Projects**:
- Create, update, and delete projects
- View list of user's projects
- Project fields: title, description, status (active, completed)

- **Tasks**:
- Create, update, and delete tasks associated with projects
- Task fields: title, description, status (todo, in-progress, done), due date
- Filter tasks by status

- **Seed Data**:
- Script to populate the database with one user, two projects, and three tasks per project

- **Frontend**:
- Next.js with TypeScript
- Login and register pages
- Dashboard with project list
- Project details page with task management
- Basic styling (using Tailwind CSS)

- **Backend**:
- Node.js with Express.js
- MongoDB integration using Mongoose
- RESTful API for CRUD operations
- Rate limiting and security headers via middleware

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- npm (v7 or higher)

## Environment Setup

### Backend Environment

Create a `.env` file in the `backend` directory with the following variables:

```plaintext
PORT=5000
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.f4auexn.mongodb.net/sofrik?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRES_IN=7d
RATE_LIMIT_WINDOW_MS=15 * 60 * 1000
RATE_LIMIT_MAX=100

```

- Replace `your-username` and `your-password` in `MONGO_URI` with your MongoDB Atlas credentials.
- Replace `your_secure_jwt_secret_key` in `JWT_SECRET` with a secure secret key (e.g., a long random string).
- These values ensure connection to your MongoDB Atlas cluster and configure JWT and rate limiting.

### Frontend Environment

Create a `.env.local` file in the `frontend` directory with the following variable:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:5000
```

- Ensure `NEXT_PUBLIC_API_URL` matches the backend server URL.

## Running the Application

1. Start MongoDB (e.g., MongoDB Atlas cluster or local instance).
2. Start the backend server (`cd backend && npm start`).
3. Start the frontend server (`cd frontend && npm run dev`).
4. (Optional) Run the seed script (`cd backend && npm run seed`).
5. Open `http://localhost:3000` in your browser to access the application.

## Test Credentials

```plaintext
EMAIL:    test1@exmaple.com
PASSWORD: Test@123
```

## Project Structure

```

project-management-tool/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ │ ├── authController.js
│ │ │ ├── projectController.js
│ │ │ ├── taskController.js
│ │ │ ├── userController.js
│ │ ├── middlewares/
│ │ │ ├── authMiddleware.js
│ │ │ ├── errorHandler.js
│ │ │ ├── rateLimiter.js
│ │ ├── models/
│ │ │ ├── Project.js
│ │ │ ├── Task.js
│ │ │ ├── User.js
│ │ ├── routes/
│ │ ├── scripts/
│ │ │ ├── seed-db.js
│ │ ├── services/
│ │ ├── utils/
│ │ │ ├── token.js
│ │ ├── app.js
│ │ └── db.js
│ ├── .env
│ ├── index.js
│ ├── package-lock.json
│ └── package.json

├── frontend/
│ ├── .next/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── app/
│ │ │ ├── api/
│ │ │ ├── dashboard/
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── components/
│ │ ├── lib/
│ │ │ ├── axiosInstance.ts
│ │ ├── types/
│ │ ├── middleware.ts
│ │ ├── .env
│ │ ├── .gitignore
│ │ ├── next-env.d.ts
│ │ ├── next.config.ts
│ │ ├── package-lock.json
│ │ ├── package.json
│ │ ├── postcss.config.mjs
│ │ ├── README.md
│ │ └── tsconfig.json
└── README.md
```
