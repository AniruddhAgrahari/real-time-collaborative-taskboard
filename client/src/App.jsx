import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Auth from './components/Auth';
import { AuthProvider, useAuth } from './context/AuthContext';
import { socket, connectSocket, disconnectSocket } from './services/socket';
import './App.css';

function AppContent() {
  const { user, loading, logout, token } = useAuth();
  const [userCount, setUserCount] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const [showDisconnectToast, setShowDisconnectToast] = useState(false);

  // Connect socket when user is authenticated
  useEffect(() => {
    if (user && token) {
      connectSocket(token);
    } else {
      disconnectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [user, token]);

  useEffect(() => {
    let disconnectTimer = null;

    const onConnect = () => {
      console.log('Socket connected');
      setIsConnected(true);
      setShowDisconnectToast(false);
      if (disconnectTimer) {
        clearTimeout(disconnectTimer);
        disconnectTimer = null;
      }
    };

    const onDisconnect = () => {
      console.log('Socket disconnected');
      setIsConnected(false);
      // Only show toast after 2 seconds of being disconnected
      disconnectTimer = setTimeout(() => {
        setShowDisconnectToast(true);
      }, 2000);
    };

    const onConnectError = (error) => {
      console.error('Socket connection error:', error.message);
      if (error.message.includes('Authentication')) {
        // Token might be invalid, logout user
        logout();
      }
    };

    const onUserCount = (count) => setUserCount(count);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.on('onlineUsers', onUserCount);

    return () => {
      if (disconnectTimer) clearTimeout(disconnectTimer);
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('onlineUsers', onUserCount);
    };
  }, [logout]);

  const handleLogout = () => {
    disconnectSocket();
    logout();
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#38bdf8',
        fontSize: '1.5rem'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="App">
      {showDisconnectToast && (
        <div className="disconnect-toast">
          <span>⚠️</span> Connection lost. Reconnecting...
        </div>
      )}

      <div className="app-header">
        <div className="app-header-left">
          <h1 style={{ margin: 0 }}>Collaborative Task Board</h1>
          <div className="user-badge">
            <span className="user-badge-dot"></span>
            {userCount} {userCount === 1 ? 'User' : 'Users'} Online
          </div>
        </div>

        <div className="app-header-right">
          <div className="user-info">
            Welcome, <strong>{user.username}</strong>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <Board />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
