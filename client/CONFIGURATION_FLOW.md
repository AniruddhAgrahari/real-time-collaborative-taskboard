# Configuration Flow Diagram

## Development Environment

```
┌─────────────────────────────────────────────────────────────┐
│                     npm run dev                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  Vite sets: import.meta.env.MODE = 'development'            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  Loads: .env.development                                     │
│  ├─ VITE_API_URL=http://localhost:5000                      │
│  └─ VITE_SOCKET_URL=http://localhost:5000                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  src/config.js reads environment variables                   │
│  ├─ environment = 'development'                             │
│  ├─ API_URL = 'http://localhost:5000'                       │
│  └─ SOCKET_URL = 'http://localhost:5000'                    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  src/services/socket.js imports SOCKET_URL                   │
│  └─ Connects to: http://localhost:5000                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Production Environment

```
┌─────────────────────────────────────────────────────────────┐
│                    npm run build                             │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  Vite sets: import.meta.env.MODE = 'production'             │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  Loads: .env.production                                      │
│  ├─ VITE_API_URL=https://your-backend.onrender.com         │
│  └─ VITE_SOCKET_URL=https://your-backend.onrender.com      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  src/config.js reads environment variables                   │
│  ├─ environment = 'production'                              │
│  ├─ API_URL = 'https://your-backend.onrender.com'          │
│  └─ SOCKET_URL = 'https://your-backend.onrender.com'       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  src/services/socket.js imports SOCKET_URL                   │
│  └─ Connects to: https://your-backend.onrender.com         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  Build output: dist/                                         │
│  └─ URLs are baked into the bundle                          │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  Deploy dist/ to Vercel/Netlify/Render                      │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
client/
├── .env.development              ✅ Committed (localhost URLs)
├── .env.production               ❌ NOT committed (real URLs)
├── .env.production.example       ✅ Committed (template)
├── src/
│   ├── config.js                 ✅ Central configuration
│   ├── services/
│   │   └── socket.js             ✅ Uses SOCKET_URL from config
│   ├── components/
│   │   ├── App.jsx
│   │   ├── Board.jsx
│   │   └── ...
│   └── ...
├── DEPLOYMENT.md                 📚 Full deployment guide
├── ENV_SETUP.md                  📚 Quick reference
└── CONFIGURATION_SUMMARY.md      📚 Implementation summary
```

---

## Environment Variable Priority

Vite loads environment variables in this order (highest priority first):

1. `.env.[mode].local` (e.g., `.env.production.local`)
2. `.env.[mode]` (e.g., `.env.production`)
3. `.env.local`
4. `.env`

**For this project:**
- Development: Uses `.env.development`
- Production: Uses `.env.production`

---

## Key Points

### ✅ What's Safe
- Hardcoded localhost URLs in `.env.development`
- Template file `.env.production.example`
- Configuration logic in `src/config.js`

### ❌ What's Dangerous
- Hardcoded production URLs in source code
- Committing `.env.production` with real URLs
- Using localhost URLs in production builds

### 🎯 The Solution
- Environment-specific `.env` files
- Central `config.js` that reads from environment
- Automatic switching based on build mode
- Git ignores sensitive production config

---

## Debugging

### Check Current Environment

```javascript
import config from './config';
console.log(config);
```

**Development output:**
```javascript
{
  API_URL: "http://localhost:5000",
  SOCKET_URL: "http://localhost:5000",
  isDevelopment: true,
  isProduction: false,
  environment: "development"
}
```

**Production output:**
```javascript
{
  API_URL: "https://your-backend.onrender.com",
  SOCKET_URL: "https://your-backend.onrender.com",
  isDevelopment: false,
  isProduction: true,
  environment: "production"
}
```

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Still using localhost in production | `.env.production` not updated | Update `.env.production` and rebuild |
| Environment variables not loading | Missing `VITE_` prefix | All variables must start with `VITE_` |
| Changes not reflected | Stale build | Restart dev server or rebuild |
| Socket connection fails | CORS not configured | Update backend CORS settings |

---

**Remember:** Environment variables are baked into the build at build time, not runtime!
