import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { socket } from './services/socket';

function App() {
  const [userCount, setUserCount] = useState(1);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [showDisconnectToast, setShowDisconnectToast] = useState(false);

  useEffect(() => {
    let disconnectTimer = null;

    const onConnect = () => {
      setIsConnected(true);
      setShowDisconnectToast(false);
      if (disconnectTimer) {
        clearTimeout(disconnectTimer);
        disconnectTimer = null;
      }
    };

    const onDisconnect = () => {
      setIsConnected(false);
      // Only show toast after 2 seconds of being disconnected
      disconnectTimer = setTimeout(() => {
        setShowDisconnectToast(true);
      }, 2000);
    };

    const onUserCount = (count) => setUserCount(count);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('onlineUsers', onUserCount);

    return () => {
      if (disconnectTimer) clearTimeout(disconnectTimer);
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('onlineUsers', onUserCount);
    }
  }, []);

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '2rem' }}>
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
      <Board />
    </div>
  );
}

export default App;
