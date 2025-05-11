// src/context/TeamContext.js

import { createContext, useContext, useState } from 'react';

// Create context
const TeamContext = createContext(null);

// Provider component
export const TeamProvider = ({ children }) => {
    const [team, setTeam] = useState(null);

    return (
        <TeamContext.Provider value={{ team, setTeam }}>
            {children}
        </TeamContext.Provider>
    );
};

// Custom hook to access team context
export const useTeam = () => {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeam must be used within a TeamProvider');
    }
    return context;
};