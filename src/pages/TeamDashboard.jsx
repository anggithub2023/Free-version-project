// src/pages/TeamDashboard.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTeamData } from '../hooks/useTeamData';
import PlayerList from '../components/Roster/PlayerList';
import ScheduleList from '../components/Schedule/ScheduleList';
import GamesList from '../components/Games/GamesList';
import UsersPanel from '../components/Users/UsersPanel';

const TeamDashboard = () => {
    const { teamId } = useParams();
    const { players, schedule, games, users, loading, error } = useTeamData(teamId);

    if (loading) return <p>Loading team data...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div>
            <h1>Team Dashboard</h1>
            <PlayerList players={players} />
            <ScheduleList schedule={schedule} />
            <GamesList games={games} />
            <UsersPanel users={users} />
        </div>
    );
};

export default TeamDashboard;