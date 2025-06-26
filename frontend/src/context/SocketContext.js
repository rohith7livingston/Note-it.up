import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        // Only establish connection if the user is authenticated
        if (isAuthenticated) {
            const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:3001');
            setSocket(newSocket);

            // Cleanup on dismount or when auth status changes
            return () => newSocket.close();
        } else if (socket) {
            // If user logs out, disconnect the socket
            socket.close();
            setSocket(null);
        }
    }, [isAuthenticated]); // Re-run effect when authentication status changes

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};