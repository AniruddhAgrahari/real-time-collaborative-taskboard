# Backend Deployment Guide - Render

## 🎯 Overview

This guide will help you deploy your Node.js/Express/Socket.io backend to **Render** (free tier available).

**Your Frontend:** https://real-time-collaborative-taskboard.vercel.app/  
**Backend will be deployed to:** `https://your-app-name.onrender.com`

---

## 📋 Prerequisites

Before deploying, you need:

1. ✅ GitHub repository (already done!)
2. ✅ MongoDB Atlas account (for database)
3. ✅ Render account (free)

---

## Part 1: Set Up MongoDB Atlas (Database)

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Choose **"Create a deployment"** → **"M0 Free"** tier
4. Select a cloud provider and region (choose closest to you)
5. Click **"Create Deployment"**

### Step 2: Create Database User

1. You'll see a prompt to create a database user
2. **Username:** Choose a username (e.g., `taskboard_user`)
3. **Password:** Click "Autogenerate Secure Password" and **COPY IT**
4. Click **"Create Database User"**

### Step 3: Set Up Network Access

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### Step 4: Get Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` with your database username
6. Replace `<password>` with the password you copied earlier
7. Add `/taskboard` before the `?` to specify database name:
   ```
   mongodb+srv://taskboard_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskboard?retryWrites=true&w=majority
   ```

**SAVE THIS CONNECTION STRING** - you'll need it for Render!

---

## Part 2: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to https://render.com/
2. Click **"Get Started for Free"**
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

### Step 2: Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - If not connected, click **"Connect GitHub"**
   - Find and select **"real-time-collaborative-taskboard"**
4. Click **"Connect"**

### Step 3: Configure Web Service

Fill in the following settings:

**Basic Settings:**
- **Name:** `taskboard-api` (or your preferred name)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `server` ⚠️ **IMPORTANT!**
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** (this is sufficient for testing)

### Step 4: Add Environment Variables

Scroll down to **"Environment Variables"** section and add:

1. Click **"Add Environment Variable"**

**Variable 1:**
- **Key:** `MONGODB_URI`
- **Value:** Your MongoDB Atlas connection string (from Part 1, Step 4)

**Variable 2:**
- **Key:** `PORT`
- **Value:** `10000` (Render uses this port)

**Variable 3:**
- **Key:** `NODE_ENV`
- **Value:** `production`

**Variable 4:**
- **Key:** `CORS_ORIGIN`
- **Value:** `https://real-time-collaborative-taskboard.vercel.app`

### Step 5: Deploy

1. Click **"Create Web Service"** button at the bottom
2. Render will start building and deploying your app
3. Wait for the build to complete (2-5 minutes)
4. You'll see logs in real-time

### Step 6: Get Your Backend URL

Once deployed, you'll see:
- **Status:** "Live" (green)
- **URL:** `https://taskboard-api.onrender.com` (or your chosen name)

**COPY THIS URL** - you'll need it for the frontend!

---

## Part 3: Update Frontend Configuration

Now that your backend is deployed, update your frontend to use it:

### Step 1: Update Local .env.production

On your local machine:

1. Open `client/.env.production`
2. Update with your Render backend URL:
   ```env
   VITE_API_URL=https://taskboard-api.onrender.com
   VITE_SOCKET_URL=https://taskboard-api.onrender.com
   ```
3. Save the file

### Step 2: Update Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your **"real-time-collaborative-taskboard"** project
3. Go to **"Settings"** tab
4. Click **"Environment Variables"** in the left sidebar
5. Add two variables:

**Variable 1:**
- **Key:** `VITE_API_URL`
- **Value:** `https://taskboard-api.onrender.com` (your Render URL)
- **Environment:** Select all (Production, Preview, Development)

**Variable 2:**
- **Key:** `VITE_SOCKET_URL`
- **Value:** `https://taskboard-api.onrender.com` (your Render URL)
- **Environment:** Select all (Production, Preview, Development)

6. Click **"Save"**

### Step 3: Redeploy Frontend

1. In Vercel dashboard, go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for redeployment to complete

---

## Part 4: Test Your Deployment

### Step 1: Test Backend

1. Visit your backend URL: `https://taskboard-api.onrender.com`
2. You should see: **"Task Board API Running"**

### Step 2: Test Frontend

1. Visit: https://real-time-collaborative-taskboard.vercel.app/
2. Open browser console (F12)
3. Check for Socket.io connection
4. Try creating a task
5. Open in multiple tabs/devices to test real-time sync

### Step 3: Verify Real-Time Features

- [ ] Tasks sync across multiple browser tabs
- [ ] User count updates in real-time
- [ ] Drag-and-drop works
- [ ] Tasks persist after page refresh
- [ ] No CORS errors in console

---

## 🔧 Troubleshooting

### Issue: "Application failed to respond"

**Solution:**
- Check Render logs for errors
- Verify `PORT` environment variable is set to `10000`
- Ensure `Start Command` is `npm start`

### Issue: "Cannot connect to MongoDB"

**Solution:**
- Verify MongoDB connection string is correct
- Check username and password are properly replaced
- Ensure IP whitelist includes `0.0.0.0/0`
- Check MongoDB Atlas cluster is running

### Issue: "CORS error" in frontend

**Solution:**
- Verify backend `allowedOrigins` includes your Vercel URL
- Check Vercel environment variables are set
- Redeploy both frontend and backend

### Issue: "Socket.io connection failed"

**Solution:**
- Check browser console for specific error
- Verify backend URL in frontend config
- Ensure backend is running (visit backend URL)
- Check Render logs for WebSocket errors

### Issue: "Free instance spins down"

**Note:** Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Consider upgrading to paid tier for production
- Or use a service like UptimeRobot to ping your backend

---

## 📊 Monitoring Your Deployment

### Render Dashboard

- **Logs:** View real-time server logs
- **Metrics:** CPU, memory, bandwidth usage
- **Events:** Deployment history

### MongoDB Atlas

- **Metrics:** Database connections, operations
- **Performance:** Query performance
- **Alerts:** Set up alerts for issues

---

## 🔒 Security Checklist

- [ ] MongoDB connection string is in environment variables (not code)
- [ ] CORS is configured with specific origins (not `*`)
- [ ] MongoDB network access is configured
- [ ] Environment variables are set on Render
- [ ] `.env` files are gitignored

---

## 💰 Cost Breakdown

**Free Tier Limits:**

**Render Free:**
- 750 hours/month
- Spins down after 15 min inactivity
- 512 MB RAM
- Shared CPU

**MongoDB Atlas Free (M0):**
- 512 MB storage
- Shared RAM
- Sufficient for small projects

**Vercel Free:**
- 100 GB bandwidth/month
- Unlimited deployments

---

## 🚀 Next Steps

After successful deployment:

1. **Custom Domain (Optional):**
   - Add custom domain in Vercel
   - Update CORS origins in backend

2. **Monitoring:**
   - Set up error tracking (Sentry)
   - Monitor uptime (UptimeRobot)

3. **Performance:**
   - Enable caching
   - Optimize database queries
   - Consider CDN for static assets

4. **Security:**
   - Add rate limiting
   - Implement authentication
   - Enable HTTPS only

---

## 📝 Environment Variables Summary

### Backend (Render)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taskboard?retryWrites=true&w=majority
PORT=10000
NODE_ENV=production
CORS_ORIGIN=https://real-time-collaborative-taskboard.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://taskboard-api.onrender.com
VITE_SOCKET_URL=https://taskboard-api.onrender.com
```

---

## 🆘 Need Help?

- **Render Docs:** https://render.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Socket.io Docs:** https://socket.io/docs/v4/

---

**Ready to deploy?** Follow the steps above and your app will be live! 🚀
