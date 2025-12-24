# 🚀 Quick Setup: JWT Authentication

## ✅ Authentication Added Successfully!

Your task board now has professional JWT authentication! Here's what you need to do:

---

## 📋 Setup Steps

### Step 1: Install Dependencies (Local Testing)

```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

### Step 2: Add JWT Secret to Environment

**Local (.env file):**

Add to `server/.env`:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Generate a secure secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 3: Test Locally

```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

Visit http://localhost:5173 and you'll see the login screen!

---

## 🌐 Deploy to Production

### Backend (Render)

1. **Add JWT_SECRET environment variable:**
   - Go to Render dashboard
   - Select your service
   - Environment → Add Environment Variable
   - Key: `JWT_SECRET`
   - Value: (paste your generated secret)
   - Save

2. **Render will auto-deploy** (detects GitHub changes)

### Frontend (Vercel)

1. **Redeploy frontend:**
   - Go to Vercel dashboard
   - Deployments → Redeploy latest
   - **Uncheck** "Use existing Build Cache"
   - Deploy

---

## 🧪 Test Your App

### 1. Register a New User

1. Visit your app
2. Click "Sign Up"
3. Enter:
   - Username: testuser
   - Email: test@example.com
   - Password: test123
4. Click "Sign Up"
5. You're automatically logged in!

### 2. Create Tasks

1. Create a task
2. It's saved to YOUR account
3. Logout and login with different user
4. Previous user's tasks won't be visible

### 3. Real-Time Sync

1. Open app in two tabs
2. Login with same user
3. Create task in one tab
4. Appears in both tabs instantly!

---

## 🔐 What Changed?

### Backend
- ✅ User registration & login
- ✅ Password hashing (bcrypt)
- ✅ JWT token generation
- ✅ Protected Socket.io
- ✅ User-specific tasks

### Frontend
- ✅ Login/Register UI
- ✅ Authentication context
- ✅ Protected routes
- ✅ User info display
- ✅ Logout button

---

## 📝 Environment Variables Needed

### Render (Backend)
```
MONGODB_URI = <your MongoDB connection>
PORT = 10000
NODE_ENV = production
CORS_ORIGIN = https://real-time-collaborative-taskboard.vercel.app
JWT_SECRET = <your generated secret>  ← NEW!
```

### Vercel (Frontend)
```
VITE_API_URL = https://real-time-collaborative-taskboard.onrender.com
VITE_SOCKET_URL = https://real-time-collaborative-taskboard.onrender.com
```

---

## ⚠️ Important Notes

### Existing Tasks

If you have existing tasks in MongoDB, they won't have a `user` field. You have two options:

**Option 1: Clear all tasks (recommended for development)**
```javascript
// In MongoDB Atlas or Compass
db.tasks.deleteMany({})
```

**Option 2: Keep existing tasks**
- They won't be visible to any user
- Create new tasks after logging in

### First User

- First person to register becomes a user
- Each user has their own private tasks
- Users can't see each other's tasks

---

## 🎯 Quick Checklist

- [ ] Install dependencies (`npm install` in both folders)
- [ ] Add `JWT_SECRET` to `server/.env`
- [ ] Test locally (register, login, create tasks)
- [ ] Add `JWT_SECRET` to Render environment variables
- [ ] Wait for Render to redeploy (auto-detects changes)
- [ ] Redeploy Vercel frontend (without cache)
- [ ] Test production app
- [ ] Register your account
- [ ] Create tasks!

---

## 🆘 Troubleshooting

**Issue: Can't login/register**
- Check backend logs in Render
- Verify MongoDB is connected
- Check `JWT_SECRET` is set

**Issue: Tasks not showing**
- Ensure you're logged in
- Check Socket.io connection (browser console)
- Verify token is valid

**Issue: "Authentication error"**
- `JWT_SECRET` might not be set
- Token might be expired
- Logout and login again

---

## 📚 Full Documentation

See **AUTHENTICATION_GUIDE.md** for:
- Complete API documentation
- Security features
- Advanced configuration
- Troubleshooting guide

---

**Your app is now production-ready with authentication! 🎉**

Users must register/login, and each user has private tasks.
