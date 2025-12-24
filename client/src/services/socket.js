import { io } from "socket.io-client";
import { SOCKET_URL } from "../config";

// Create socket instance but don't auto-connect
export const socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    timeout: 20000,
    autoConnect: false, // Don't auto-connect, we'll connect after auth
});

// Function to connect socket with authentication
export const connectSocket = (token) => {
    if (token) {
        socket.auth = { token };
        socket.connect();
    }
};

// Function to disconnect socket
export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};
