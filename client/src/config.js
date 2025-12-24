/**
 * Configuration file for environment-specific settings
 * Automatically switches between development and production URLs
 */

const config = {
    development: {
        apiUrl: 'http://localhost:5000',
        socketUrl: 'http://localhost:5000',
    },
    production: {
        // Replace these with your actual production URLs after deployment
        apiUrl: import.meta.env.VITE_API_URL || 'https://your-backend-url.com',
        socketUrl: import.meta.env.VITE_SOCKET_URL || 'https://your-backend-url.com',
    },
};

// Determine the current environment
const environment = import.meta.env.MODE || 'development';

// Export the appropriate configuration
export const API_URL = config[environment].apiUrl;
export const SOCKET_URL = config[environment].socketUrl;

// Export environment info for debugging
export const isDevelopment = environment === 'development';
export const isProduction = environment === 'production';

// Default export
export default {
    API_URL,
    SOCKET_URL,
    isDevelopment,
    isProduction,
    environment,
};
