# 🔐 JWT Authentication Implementation Guide

## Overview

Your Real-Time Collaborative Task Board now includes professional JWT (JSON Web Token) authentication! This adds security and user management to your application.

---

## ✨ Features Added

### Backend (Server)
- ✅ User registration with password hashing (bcrypt)
- ✅ User login with JWT token generation
- ✅ Token verification middleware
- ✅ Protected Socket.io connections
- ✅ User-specific task management
- ✅ Secure password storage

### Frontend (Client)
- ✅ Modern login/register UI
- ✅ Authentication context (React Context API)
- ✅ Protected routes
- ✅ Automatic token verification
- ✅ Socket.io authentication
- ✅ User session management

---

## 📁 New Files Created

### Backend Files:
```
server/
├── models/
│   └── User.js                    # User model with password hashing
├── routes/
│   └── auth.js                    # Authentication routes (register, login, verify)
├── middleware/
│   └── auth.js                    # JWT verification middleware
└── sockets/
    └── socketManager.js           # Updated with authentication
```

### Frontend Files:
```
client/src/
├── context/
│   └── AuthContext.jsx            # Authentication state management
├── components/
│   ├── Auth.jsx                   # Login/Register component
│   └── Auth.css                   # Authentication styling
└── services/
    └── socket.js                  # Updated with auth token
```

---

## 🚀 Setup Instructions

### Step 1: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

This will install the new dependencies:
- `jsonwebtoken` - For creating and verifying JWT tokens
- `bcryptjs` - For password hashing

**Frontend:**
```bash
cd client
npm install
```

### Step 2: Set Environment Variables

**Backend (.env):**

Add this to your `server/.env` file:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

**On Render (Production):**
1. Go to your Render dashboard
2. Select your service
3. Environment → Add Environment Variable
4. Key: `JWT_SECRET`
5. Value: (paste your generated secret)
6. Save

### Step 3: Update MongoDB Connection

The Task model now includes a `user` field. Existing tasks in your database won't have this field, so you have two options:

**Option A: Clear existing tasks (recommended for development)**
```bash
# In MongoDB Atlas or your database
db.tasks.deleteMany({})
```

**Option B: Add user field to existing tasks**
```bash
# Replace USER_ID with a valid user ID after creating a user
db.tasks.updateMany({}, { $set: { user: ObjectId("USER_ID") } })
```

---

## 🔑 API Endpoints

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### 3. Verify Token
```http
POST /api/auth/verify
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### 4. Get Current User
```http
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔐 How Authentication Works

### 1. User Registration/Login Flow

```
User enters credentials
        ↓
Frontend sends to /api/auth/register or /api/auth/login
        ↓
Backend validates credentials
        ↓
Backend generates JWT token (expires in 7 days)
        ↓
Token sent to frontend
        ↓
Frontend stores token in localStorage
        ↓
Frontend includes token in all requests
```

### 2. Socket.io Authentication Flow

```
User logs in → Gets JWT token
        ↓
Frontend connects to Socket.io with token
        ↓
Socket.io middleware verifies token
        ↓
If valid: Connection established with userId
If invalid: Connection rejected
        ↓
All socket events are user-specific
```

### 3. Task Management Flow

```
User creates task
        ↓
Task associated with user ID
        ↓
User can only see/modify their own tasks
        ↓
Real-time updates only for user's tasks
```

---

## 🧪 Testing the Authentication

### Test 1: Register a New User

1. Start your backend: `cd server && npm run dev`
2. Start your frontend: `cd client && npm run dev`
3. Open http://localhost:5173
4. Click "Sign Up"
5. Fill in:
   - Username: testuser
   - Email: test@example.com
   - Password: test123
6. Click "Sign Up"
7. You should be logged in automatically

### Test 2: Login with Existing User

1. Click "Logout" button
2. Click "Sign In"
3. Enter email and password
4. Click "Sign In"
5. You should be logged in

### Test 3: Create Tasks

1. After logging in, create a task
2. Task should appear in "To Do" column
3. Refresh the page
4. Task should still be there
5. Logout and login with different user
6. Previous user's tasks should NOT be visible

### Test 4: Real-Time Sync

1. Open app in two browser tabs
2. Login with the same user in both tabs
3. Create a task in one tab
4. Task should appear in both tabs immediately

---

## 🔒 Security Features

### Password Security
- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ Passwords never stored in plain text
- ✅ Passwords never returned in API responses

### Token Security
- ✅ JWT tokens signed with secret key
- ✅ Tokens expire after 7 days
- ✅ Tokens verified on every request
- ✅ Invalid tokens rejected

### Data Privacy
- ✅ Users can only see their own tasks
- ✅ Users can only modify their own tasks
- ✅ Socket connections authenticated
- ✅ User data validated before storage

---

## 🚀 Deployment Checklist

### Backend (Render)

- [ ] Add `JWT_SECRET` environment variable
- [ ] Ensure MongoDB is connected
- [ ] Test authentication endpoints
- [ ] Verify Socket.io authentication works

### Frontend (Vercel)

- [ ] Ensure `VITE_API_URL` points to backend
- [ ] Ensure `VITE_SOCKET_URL` points to backend
- [ ] Test login/register flow
- [ ] Test task creation and real-time sync

---

## 📝 Environment Variables Summary

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://...
PORT=10000
NODE_ENV=production
CORS_ORIGIN=https://real-time-collaborative-taskboard.vercel.app
JWT_SECRET=<your-generated-secret>
```

### Frontend (Vercel)
```env
VITE_API_URL=https://real-time-collaborative-taskboard.onrender.com
VITE_SOCKET_URL=https://real-time-collaborative-taskboard.onrender.com
```

---

## 🐛 Troubleshooting

### Issue: "Authentication error: No token provided"

**Solution:**
- Ensure you're logged in
- Check localStorage has token: `localStorage.getItem('token')`
- Clear cache and login again

### Issue: "Invalid token"

**Solution:**
- Token might be expired (7 days)
- JWT_SECRET might have changed
- Logout and login again

### Issue: "Tasks not showing"

**Solution:**
- Ensure you're logged in
- Check browser console for errors
- Verify Socket.io connection is established
- Check backend logs for errors

### Issue: "Can't create tasks"

**Solution:**
- Ensure Socket.io is connected
- Check authentication token is valid
- Verify backend is running
- Check MongoDB connection

---

## 🎯 Next Steps

After implementing authentication, you can add:

1. **Password Reset** - Email-based password recovery
2. **Email Verification** - Verify email addresses
3. **OAuth** - Login with Google/GitHub
4. **User Profiles** - Avatar, bio, settings
5. **Team Workspaces** - Shared task boards
6. **Role-Based Access** - Admin, member, viewer roles
7. **Activity Logs** - Track user actions
8. **Two-Factor Authentication** - Extra security layer

---

## 📚 Resources

- [JWT.io](https://jwt.io/) - Learn about JWT tokens
- [bcrypt](https://www.npmjs.com/package/bcryptjs) - Password hashing
- [Socket.io Authentication](https://socket.io/docs/v4/middlewares/) - Socket.io auth docs

---

**Your app now has professional-grade authentication! 🎉**

Users must register/login to use the task board, and each user has their own private tasks.
