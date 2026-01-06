import { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

// Create the SocketContext
export const SocketContext = createContext();

// Create a single socket instance
const socket = io(`${import.meta.env.VITE_BASE_URL}`,{
    withCredentials: true,
  transports: ['websocket'], 
});


const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Handle connection event
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        // Handle disconnection event
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Clean up the socket connection on unmount
   
    }, []);

 
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
