import { io } from "socket.io-client";
import { SOCKET_URL } from "../config";

export const socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    timeout: 20000,
    autoConnect: true,
});
