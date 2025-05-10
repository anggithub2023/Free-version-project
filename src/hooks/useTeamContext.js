// src/hooks/useTeamContext.js
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export function useTeamContext() {
    const [teamId, setTeamId] = useState(() => localStorage.getItem('team_id'));
    const [role, setRole] = useState(null);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🚀 Fetch all teams this user is in
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

    // 🧠 Call this to switch teams manually
    const changeTeam = (newTeamId) => {
        setTeamId(newTeamId);
        localStorage.setItem('team_id', newTeamId);
        const selected = teams.find(t => t.team_id === newTeamId);
        if (selected) setRole(selected.role);
    };

    return {
        teamId,
        setTeamId: changeTeam,
        role,
        teams,
        loading,
    };
}