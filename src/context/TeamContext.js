// src/context/TeamContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export const TeamContext = createContext();

export function TeamProvider({ children }) {
    const [teamId, setTeamId] = useState(() => localStorage.getItem('team_id'));
    const [role, setRole] = useState(null);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('get_my_teams')
                    .select('*');

                if (error) {
                    console.error('❌ Failed to load teams:', error.message);
                    return;
                }

                setTeams(data);

                if (!teamId && data.length > 0) {
                    const defaultTeam = data[0];
                    setTeamId(defaultTeam.team_id);
                    setRole(defaultTeam.role);
                    localStorage.setItem('team_id', defaultTeam.team_id);
                } else {
                    const match = data.find(t => t.team_id === teamId);
                    if (match) setRole(match.role);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [teamId]);

    const changeTeam = (newTeamId) => {
        setTeamId(newTeamId);
        localStorage.setItem('team_id', newTeamId);
        const selected = teams.find(t => t.team_id === newTeamId);
        if (selected) setRole(selected.role);
    };

    return (
        <TeamContext.Provider value={{
            teamId,
            setTeamId: changeTeam,
            role,
            teams,
            loading
        }}>
            {children}
        </TeamContext.Provider>
    );
}