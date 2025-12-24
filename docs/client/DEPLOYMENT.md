# Deployment Guide

## Environment Configuration

This application uses environment-specific configuration to switch between development and production URLs automatically.

### Files Overview

- **`src/config.js`** - Central configuration file that reads environment variables
- **`.env.development`** - Development environment variables (localhost)
- **`.env.production`** - Production environment variables (your deployed backend URL)
- **`.env.production.example`** - Template for production environment variables

### Local Development

For local development, the app automatically uses `.env.development`:

```bash
npm run dev
```

This will connect to `http://localhost:5000` for both API and Socket.io connections.

### Production Deployment

#### Step 1: Configure Production URLs

Before deploying, update `.env.production` with your actual backend URL:

```env
VITE_API_URL=https://your-actual-backend-url.com
VITE_SOCKET_URL=https://your-actual-backend-url.com
```

**Examples for common platforms:**

**Render.com:**
```env
VITE_API_URL=https://taskboard-api.onrender.com
VITE_SOCKET_URL=https://taskboard-api.onrender.com
```

**Railway:**
```env
VITE_API_URL=https://taskboard-api.up.railway.app
VITE_SOCKET_URL=https://taskboard-api.up.railway.app
```

**Heroku:**
```env
VITE_API_URL=https://taskboard-api.herokuapp.com
VITE_SOCKET_URL=https://taskboard-api.herokuapp.com
```

**Custom Domain:**
```env
VITE_API_URL=https://api.yourdomain.com
VITE_SOCKET_URL=https://api.yourdomain.com
```

#### Step 2: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder with the production URLs baked in.

#### Step 3: Deploy

Deploy the `dist` folder to your hosting platform (Vercel, Netlify, Render, etc.).

### Platform-Specific Deployment

#### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Set environment variables in Vercel dashboard or via CLI:
   ```bash
   vercel env add VITE_API_URL
   vercel env add VITE_SOCKET_URL
   ```
3. Deploy: `vercel --prod`

#### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   ```
3. Set environment variables in Netlify dashboard
4. Deploy: `netlify deploy --prod`

#### Render (Static Site)

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Render dashboard:
   - `VITE_API_URL`
   - `VITE_SOCKET_URL`

### Environment Variables in CI/CD

If using GitHub Actions or other CI/CD:

```yaml
env:
  VITE_API_URL: ${{ secrets.VITE_API_URL }}
  VITE_SOCKET_URL: ${{ secrets.VITE_SOCKET_URL }}
```

### Security Notes

⚠️ **Important:**
- Never commit `.env.production` with real URLs to version control
- The `.env.production` file is gitignored by default
- Use `.env.production.example` as a template
- Set production environment variables through your hosting platform's dashboard or CLI

### Troubleshooting

**Issue: App still connects to localhost in production**
- Ensure `.env.production` has correct URLs
- Rebuild the app: `npm run build`
- Clear browser cache

**Issue: Socket.io connection fails**
- Verify backend URL is accessible
- Check CORS settings on backend
- Ensure backend supports WebSocket connections
- Check browser console for connection errors

**Issue: Environment variables not loading**
- Vite requires variables to be prefixed with `VITE_`
- Restart dev server after changing `.env` files
- For production, rebuild the app

### Checking Current Configuration

You can verify which URLs are being used by checking the browser console:

```javascript
import config from './config';
console.log('Environment:', config.environment);
console.log('API URL:', config.API_URL);
console.log('Socket URL:', config.SOCKET_URL);
```

### Backend CORS Configuration

Ensure your backend allows requests from your frontend domain. In your backend code:

```javascript
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',           // Local development
  'https://your-frontend-url.com',   // Production frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
```

### Quick Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] `.env.production` has correct backend URL
- [ ] Backend CORS allows your frontend domain
- [ ] Run `npm run build`
- [ ] Test the production build locally: `npm run preview`
- [ ] Deploy `dist` folder to hosting platform
- [ ] Verify Socket.io connection in production
- [ ] Test all features in production environment

---

For more information, see the [Vite Environment Variables documentation](https://vitejs.dev/guide/env-and-mode.html).
