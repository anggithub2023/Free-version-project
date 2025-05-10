// src/pages/TeamDashboard.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import useTeamData from '../hooks/useTeamData';
import PlayerList from '../components/Roster/PlayerList';
import ScheduleList from '../components/Schedule/ScheduleList';

const TeamDashboard = () => {
    const { teamId } = useParams();
    const { players, schedule, loading, error } = useTeamData(teamId);

    if (loading) return <p>Loading team data...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="team-dashboard">
            <h1>Team Dashboard</h1>
            <PlayerList players={players} />
            <ScheduleList schedule={schedule} />
            {/* Future Enhancements: Games, Users */}
        </div>
    );
};

export default TeamDashboard;