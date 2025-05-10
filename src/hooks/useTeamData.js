// src/hooks/useTeamData.js
import { useState, useEffect } from 'react';
import {
    getPlayers,
    getSchedule,
    getGames,
    getUsers,
} from '../services/teamService';

export default function useTeamData(teamId) {
    const [state, setState] = useState({
        players: [],
        schedule: [],
        games: [],
        users: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!teamId) return;

        const fetchData = async () => {
            setState(prev => ({ ...prev, loading: true }));
            try {
                const [players, schedule, games, users] = await Promise.all([
                    getPlayers(teamId),
                    getSchedule(teamId),
                    getGames(teamId),
                    getUsers(teamId),
                ]);

                setState({
                    players,
                    schedule,
                    games,
                    users,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                console.error('Data fetch error:', error);
                setState(prev => ({ ...prev, loading: false, error }));
            }
        };

        fetchData();
    }, [teamId]);

    return state;
}