import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import ScheduleList from '../components/Schedule/ScheduleList';
import ConfirmDeleteModal from '../components/common/ConfirmDeleteModal';
import { MdDelete, MdKeyboardArrowLeft } from 'react-icons/md';
import { ROUTES } from '../constants/routes';

export default function TeamDashboard() {
    const { teamId: paramTeamId } = useParams();
    const navigate = useNavigate();
    const teamId = paramTeamId || localStorage.getItem('teamId');

    const [team, setTeam] = useState(null);
    const [events, setEvents] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!teamId) return;

        const fetchTeam = async () => {
            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .eq('id', teamId)
                .single();

            if (error) {
                console.error('Error fetching team:', error);
                setTeam(null);
            } else {
                setTeam(data);
            }
        };

        const fetchEvents = async () => {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('team_id', teamId)
                .order('event_date', { ascending: true });

            if (error) {
                console.error('Error fetching events:', error);
            } else {
                setEvents(data);
            }
        };

        fetchTeam();
        fetchEvents();
        setLoading(false);
    }, [teamId]);

    const handleDeleteTeam = async () => {
        const { error } = await supabase
            .from('teams')
            .delete()
            .eq('id', teamId);

        if (error) {
            console.error('Error deleting team:', error);
            alert(`Error deleting team: ${error.message}`);
        } else {
            setShowDeleteModal(false);
            navigate(ROUTES.COACH_DASHBOARD);
        }
    };

    if (!teamId) {
        return (
            <div className="p-4 text-center text-red-500">
                Error: No team selected. Please go back to the dashboard.
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-4 text-center text-gray-500">
                Loading team...
            </div>
        );
    }

    if (!team) {
        return (
            <div className="p-4 text-center text-red-500">
                Team not found.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 font-[Poppins]">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => navigate(ROUTES.COACH_DASHBOARD)}
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                    <MdKeyboardArrowLeft size={20} />
                    Back to Dashboard
                </button>
                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="text-red-600 hover:text-red-800 text-sm font-semibold flex items-center gap-1"
                >
                    <MdDelete size={18} />
                    Delete Team
                </button>
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mb-1">{team.name}</h1>
            <p className="text-sm text-gray-500 mb-4">Location: {team.location}</p>

            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Upcoming Events</h2>
                {events.length === 0 ? (
                    <p className="text-sm text-gray-500">No events scheduled yet.</p>
                ) : (
                    <ScheduleList events={events} />
                )}
            </div>

            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteTeam}
                itemName={team.name}
                itemType="team"
            />
        </div>
    );
}