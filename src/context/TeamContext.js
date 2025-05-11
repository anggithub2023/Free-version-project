import { createContext, useContext, useState } from 'react';

const TeamContext = createContext();

export function TeamProvider({ children }) {
    const [team, setTeam] = useState(null);

    return (
        <TeamContext.Provider value={{ team, setTeam }}>
            {children}
        </TeamContext.Provider>
    );
}

// ✅ Add this
export function useTeamContext() {
    return useContext(TeamContext);
}