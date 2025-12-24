# Pre-Deployment Checklist

Use this checklist before deploying your Real-Time Collaborative Task Board to production.

---

## Backend Deployment

### Step 1: Deploy Backend
- [ ] Choose a hosting platform (Render, Railway, Heroku, etc.)
- [ ] Deploy your backend code
- [ ] Verify backend is running and accessible
- [ ] Copy the backend URL (e.g., `https://your-app.onrender.com`)

### Step 2: Configure Backend
- [ ] Set environment variables on hosting platform:
  - [ ] `MONGODB_URI` (your MongoDB connection string)
  - [ ] `PORT` (usually auto-set by platform)
  - [ ] Any other required environment variables
- [ ] Update CORS settings to allow your frontend domain
- [ ] Test backend endpoints manually (use Postman or browser)

### Step 3: Verify Backend
- [ ] Backend server starts without errors
- [ ] Database connection is successful
- [ ] API endpoints respond correctly
- [ ] Socket.io server is running
- [ ] CORS allows requests from your frontend domain

---

## Frontend Configuration

### Step 4: Update Environment File
- [ ] Open `.env.production` in the `client` folder
- [ ] Replace `https://your-backend-url.com` with your actual backend URL
- [ ] Ensure both `VITE_API_URL` and `VITE_SOCKET_URL` are set
- [ ] Double-check for typos in the URL
- [ ] Save the file

**Example:**
```env
VITE_API_URL=https://taskboard-api.onrender.com
VITE_SOCKET_URL=https://taskboard-api.onrender.com
```

### Step 5: Test Locally
- [ ] Run `npm run build` in the `client` folder
- [ ] Run `npm run preview` to test the production build locally
- [ ] Open browser and test all features:
  - [ ] Creating tasks
  - [ ] Moving tasks between columns
  - [ ] Deleting tasks
  - [ ] Real-time updates (open in multiple tabs)
  - [ ] User count badge
  - [ ] Connection status

---

## Frontend Deployment

### Step 6: Choose Hosting Platform
Select one:
- [ ] Vercel (recommended for React apps)
- [ ] Netlify
- [ ] Render (Static Site)
- [ ] GitHub Pages
- [ ] Other: _______________

### Step 7: Deploy Frontend

#### For Vercel:
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run `vercel` in the `client` folder
- [ ] Follow prompts
- [ ] Set environment variables in Vercel dashboard
- [ ] Deploy with `vercel --prod`

#### For Netlify:
- [ ] Install Netlify CLI: `npm i -g netlify-cli`
- [ ] Run `netlify deploy` in the `client` folder
- [ ] Set publish directory to `dist`
- [ ] Set environment variables in Netlify dashboard
- [ ] Deploy with `netlify deploy --prod`

#### For Render:
- [ ] Connect GitHub repository
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] Add environment variables in dashboard
- [ ] Deploy

### Step 8: Verify Deployment
- [ ] Frontend loads without errors
- [ ] No console errors in browser
- [ ] Socket.io connects successfully
- [ ] All features work correctly
- [ ] Test in multiple browsers
- [ ] Test on mobile devices

---

## Post-Deployment Testing

### Step 9: Functional Testing
- [ ] Create a new task
- [ ] Move task between columns
- [ ] Delete a task
- [ ] Open app in multiple tabs/devices
- [ ] Verify real-time synchronization
- [ ] Check user count badge updates
- [ ] Test connection recovery (disable/enable network)

### Step 10: Performance Testing
- [ ] Check page load time
- [ ] Monitor Socket.io connection latency
- [ ] Test with multiple concurrent users
- [ ] Check browser console for warnings
- [ ] Verify no memory leaks (leave app open for a while)

---

## Security & Best Practices

### Step 11: Security Check
- [ ] `.env.production` is NOT committed to Git
- [ ] No hardcoded credentials in source code
- [ ] Backend CORS is properly configured
- [ ] Environment variables are set on hosting platforms
- [ ] HTTPS is enabled on both frontend and backend

### Step 12: Documentation
- [ ] Update README.md with deployment URLs
- [ ] Document any deployment-specific configurations
- [ ] Add troubleshooting notes if needed
- [ ] Update team members on deployment

---

## Monitoring & Maintenance

### Step 13: Set Up Monitoring
- [ ] Enable error tracking (Sentry, LogRocket, etc.)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom, etc.)
- [ ] Configure alerts for downtime
- [ ] Monitor backend logs
- [ ] Monitor frontend errors

### Step 14: Backup & Recovery
- [ ] Database backups are configured
- [ ] Know how to rollback deployment
- [ ] Document recovery procedures
- [ ] Test backup restoration

---

## Final Checks

### Step 15: Go Live
- [ ] All tests pass
- [ ] Team is notified
- [ ] Documentation is updated
- [ ] Monitoring is active
- [ ] Support plan is in place

### Step 16: Post-Launch
- [ ] Monitor for first 24 hours
- [ ] Collect user feedback
- [ ] Address any issues promptly
- [ ] Plan for future improvements

---

## Troubleshooting

### Common Issues

**Issue: Frontend can't connect to backend**
- [ ] Check `.env.production` has correct URL
- [ ] Verify backend is running
- [ ] Check CORS settings on backend
- [ ] Inspect browser console for errors

**Issue: Socket.io connection fails**
- [ ] Verify backend supports WebSocket
- [ ] Check firewall settings
- [ ] Ensure HTTPS is used (if backend uses HTTPS)
- [ ] Check Socket.io server configuration

**Issue: Environment variables not loading**
- [ ] Ensure variables start with `VITE_`
- [ ] Rebuild the app after changing `.env` files
- [ ] Check hosting platform environment settings
- [ ] Clear build cache and rebuild

**Issue: Real-time updates not working**
- [ ] Check Socket.io connection in browser console
- [ ] Verify backend Socket.io events are emitting
- [ ] Check network tab for WebSocket connection
- [ ] Test with multiple clients

---

## Quick Reference

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Environment Files
- `.env.development` - Local development (localhost)
- `.env.production` - Production deployment (real URLs)
- `.env.production.example` - Template for production

### Important URLs to Update
1. `.env.production` - Frontend environment variables
2. Backend CORS settings - Allow frontend domain
3. Hosting platform environment variables

---

## Success Criteria

Your deployment is successful when:
- ✅ Frontend loads without errors
- ✅ Backend API is accessible
- ✅ Socket.io connection is established
- ✅ Real-time updates work across multiple clients
- ✅ All CRUD operations work correctly
- ✅ User count badge updates in real-time
- ✅ Connection recovery works after network interruption
- ✅ No console errors or warnings
- ✅ Performance is acceptable
- ✅ Mobile devices work correctly

---

**Date:** _____________
**Deployed By:** _____________
**Frontend URL:** _____________
**Backend URL:** _____________
**Status:** ☐ In Progress  ☐ Completed  ☐ Issues

---

For detailed instructions, see:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- [ENV_SETUP.md](./ENV_SETUP.md) - Quick environment setup
- [CONFIGURATION_FLOW.md](./CONFIGURATION_FLOW.md) - How configuration works
