# 🚀 Quick Backend Deployment Steps

## Your Frontend
✅ **Already deployed:** https://real-time-collaborative-taskboard.vercel.app/

---

## Step 1: MongoDB Atlas (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free M0 cluster
3. Create database user (save password!)
4. Allow access from anywhere (0.0.0.0/0)
5. Get connection string:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/taskboard?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy to Render (10 minutes)

1. Go to https://render.com/ and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your **"real-time-collaborative-taskboard"** repo
4. Configure:
   - **Name:** `taskboard-api`
   - **Root Directory:** `server` ⚠️
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

5. Add Environment Variables:
   ```
   MONGODB_URI = <your MongoDB connection string>
   PORT = 10000
   NODE_ENV = production
   CORS_ORIGIN = https://real-time-collaborative-taskboard.vercel.app
   ```

6. Click **"Create Web Service"**
7. Wait 2-5 minutes for deployment
8. Copy your backend URL: `https://taskboard-api.onrender.com`

---

## Step 3: Update Frontend (5 minutes)

### On Vercel:
1. Go to https://vercel.com/dashboard
2. Select your project
3. **Settings** → **Environment Variables**
4. Add:
   ```
   VITE_API_URL = https://taskboard-api.onrender.com
   VITE_SOCKET_URL = https://taskboard-api.onrender.com
   ```
5. **Deployments** → **Redeploy** latest

---

## Step 4: Test (2 minutes)

1. Visit backend: `https://taskboard-api.onrender.com`
   - Should see: "Task Board API Running"

2. Visit frontend: https://real-time-collaborative-taskboard.vercel.app/
   - Create a task
   - Open in multiple tabs
   - Verify real-time sync works

---

## ✅ Done!

Your full-stack app is now live! 🎉

**Frontend:** https://real-time-collaborative-taskboard.vercel.app/  
**Backend:** https://taskboard-api.onrender.com

---

## 🆘 Issues?

See **BACKEND_DEPLOYMENT.md** for detailed troubleshooting.

**Common fixes:**
- CORS error → Check environment variables
- Can't connect → Verify MongoDB connection string
- 404 error → Check Root Directory is set to `server`

---

**Total Time:** ~20 minutes
