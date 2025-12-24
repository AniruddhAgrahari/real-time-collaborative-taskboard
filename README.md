# Real-Time Collaborative Task Board

A Trello-style Kanban board with real-time updates using Socket.io, React, and Node.js.

## Features
- **Real-time Collaboration**: Changes (add, move, delete) reflect instantly on all connected clients.
- **Drag and Drop**: Smooth drag and drop interface using `@hello-pangea/dnd`.
- **Persistence**: Tasks are saved to a local JSON file (`server/data.json`) for easy testing (mocking MongoDB).

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS (Premium Dark Mode).
- **Backend**: Node.js, Express, Socket.io.
- **Database**: Mocked (File-based) for this MVP to ensure it runs without MongoDB installation. Code contains comments to enable MongoDB easily.

## Getting Started

### Prerequisites
- Node.js installed.

### Installation

1.  **Clone/Open the repository**.
2.  **Install Server Dependencies**:
    ```bash
    cd server
    npm install
    ```
3.  **Install Client Dependencies**:
    ```bash
    cd client
    npm install
    ```

### Running the App

1.  **Start the Backend**:
    ```bash
    cd server
    npm run dev
    ```
    (Runs on http://localhost:5000)

2.  **Start the Frontend**:
    ```bash
    cd client
    npm run dev
    ```
    (Runs on http://localhost:5173)

3.  Open `http://localhost:5173` in your browser. Open multiple tabs to test real-time syncing!

## Documentation

For more detailed information, please refer to the following guides in the `docs/` directory:

### General Architecture & Guides
- [Authentication Guide](./docs/AUTHENTICATION_GUIDE.md)
- [Auth Quick Setup](./docs/AUTH_QUICK_SETUP.md)
- [GitHub Setup & Secrets](./docs/GITHUB_SETUP.md)
- [Mobile Optimization Details](./docs/MOBILE_OPTIMIZATION.md)
- [Git Initialization Summary](./docs/GIT_INITIALIZATION_SUMMARY.md)

### Deployment & Backend
- [Backend Deployment Guide](./docs/BACKEND_DEPLOYMENT.md)
- [Quick Backend Deploy](./docs/QUICK_BACKEND_DEPLOY.md)
- [Deployment Verification](./docs/DEPLOYMENT_VERIFICATION.md)
- [MongoDB Fixes](./docs/MONGODB_FIX.md)

### Client Documentation
- [Client Deployment Guide](./docs/client/DEPLOYMENT.md)
- [Environment Setup](./docs/client/ENV_SETUP.md)
- [Configuration Flow](./docs/client/CONFIGURATION_FLOW.md)
- [Configuration Summary](./docs/client/CONFIGURATION_SUMMARY.md)
- [Pre-deployment Checklist](./docs/client/PRE_DEPLOYMENT_CHECKLIST.md)

