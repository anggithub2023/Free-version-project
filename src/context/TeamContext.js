import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
    const location = useLocation();
    const [teamId, setTeamId] = useState(null);
    const [teamName, setTeamName] = useState(null);

    useEffect(() => {
        const match = location.pathname.match(/\/team\/([^/]+)/);
        if (match && match[1] !== teamId) {
            setTeamId(match[1]);
        }
    }, [location.pathname, teamId]);

    return (
        <TeamContext.Provider value={{ teamId, setTeamId, teamName, setTeamName }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeamContext = () => useContext(TeamContext);