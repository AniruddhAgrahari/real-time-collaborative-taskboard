import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Auth from './components/Auth';
import { AuthProvider, useAuth } from './context/AuthContext';
import { socket, connectSocket, disconnectSocket } from './services/socket';

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
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'var(--danger)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: '500',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <span>⚠️</span> Connection lost. Reconnecting...
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h1 style={{ margin: 0 }}>Collaborative Task Board</h1>
          <div style={{
            background: 'rgba(56, 189, 248, 0.2)',
            color: 'var(--accent-color)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(56, 189, 248, 0.3)'
          }}>
            <span style={{
              display: 'block',
              width: '8px',
              height: '8px',
              background: 'var(--accent-color)',
              borderRadius: '50%',
              boxShadow: '0 0 8px var(--accent-color)'
            }}></span>
            {userCount} {userCount === 1 ? 'User' : 'Users'} Online
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            color: '#94a3b8',
            fontSize: '0.9rem'
          }}>
            Welcome, <strong style={{ color: '#38bdf8' }}>{user.username}</strong>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#fca5a5',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.2)';
            }}
          >
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
