# Quick Start: Environment Configuration

## 🚀 For Local Development

Just run:
```bash
npm run dev
```

The app automatically uses `http://localhost:5000` from `.env.development`.

---

## 🌐 For Production Deployment

### 1️⃣ Update `.env.production`

Replace the placeholder URL with your actual backend URL:

```env
VITE_API_URL=https://your-backend-url.com
VITE_SOCKET_URL=https://your-backend-url.com
```

### 2️⃣ Build

```bash
npm run build
```

### 3️⃣ Deploy

Deploy the `dist` folder to your hosting platform.

---

## 📝 Common Production URLs

**Render:**
```env
VITE_API_URL=https://your-app.onrender.com
VITE_SOCKET_URL=https://your-app.onrender.com
```

**Railway:**
```env
VITE_API_URL=https://your-app.up.railway.app
VITE_SOCKET_URL=https://your-app.up.railway.app
```

**Heroku:**
```env
VITE_API_URL=https://your-app.herokuapp.com
VITE_SOCKET_URL=https://your-app.herokuapp.com
```

---

## ⚠️ Important

- ✅ `.env.development` is committed to Git (localhost URLs)
- ✅ `.env.production.example` is committed to Git (template)
- ❌ `.env.production` is NOT committed to Git (contains real URLs)

---

## 🔍 Verify Configuration

Check browser console after importing:
```javascript
import config from './config';
console.log(config);
```

---

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
