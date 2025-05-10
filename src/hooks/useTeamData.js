import { useState, useEffect } from 'react';
import {
    getPlayers,
    getSchedule,
    getGames,
    getUsers
} from '../services/teamService';

export function useTeamData(teamId) {
    const [players, setPlayers] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [games, setGames] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [playersRes, scheduleRes, gamesRes, usersRes] = await Promise.all([
                    getPlayers(teamId),
                    getSchedule(teamId),
                    getGames(teamId),
                    getUsers(teamId),
                ]);

                setPlayers(playersRes || []);
                setSchedule(scheduleRes || []);
                setGames(gamesRes || []);
                setUsers(usersRes || []);
            } catch (err) {
                setError(err.message || 'Failed to load team data.');
            } finally {
                setLoading(false);
            }
        }

        if (teamId) fetchData();
    }, [teamId]);

    return { players, schedule, games, users, loading, error };
}