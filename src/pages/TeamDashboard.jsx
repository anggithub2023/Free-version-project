import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdDelete, MdKeyboardArrowLeft } from 'react-icons/md';
import supabase from '../lib/supabaseClient';
import ConfirmDeleteModal from '../components/common/ConfirmDeleteModal';

export default function TeamDashboard() {
    const { teamId: paramTeamId } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [events, setEvents] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const teamId = paramTeamId || localStorage.getItem('teamId');

    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);

            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            const userId = sessionData?.session?.user?.id;

            if (sessionError || !userId || !teamId) {
                setLoading(false);
                return;
            }

            // Fetch all teams for listing
            const { data: teamList } = await supabase
                .from('teams')
                .select('id, name, location')
                .eq('created_by', userId);
            setTeams(teamList || []);

            // Fetch current team
            const { data: selectedTeam, error: teamError } = await supabase
                .from('teams')
                .select('*')
                .eq('id', teamId)
                .single();

            if (teamError) {
                setTeam(null);
            } else {
                setTeam(selectedTeam);
            }

            // Fetch events
            const { data: teamEvents } = await supabase
                .from('events')
                .select('*')
                .eq('team_id', teamId)
                .order('event_date', { ascending: true });

            setEvents(teamEvents || []);
            setLoading(false);
        };

        loadAll();
    }, [teamId]);

    const handleDeleteTeam = async () => {
        const { error } = await supabase.from('teams').delete().eq('id', teamId);
        if (error) {
            alert('Failed to delete team');
        } else {
            setShowDeleteModal(false);
            navigate('/coach-dashboard');
        }
    };

    if (!teamId) {
        return <div className="p-4 text-center text-red-500">Error: No team selected. Please go back to the dashboard.</div>;
    }

    if (loading) {
        return <div className="p-4 text-center text-gray-500">Loading team...</div>;
    }

    if (!team) {
        return <div className="p-4 text-center text-red-500">Team not found. Please create one.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 font-[Poppins]">
            <div className="flex items-center justify-center gap-2 text-sm font-medium mb-6">
                <BsCheckCircleFill className="text-black dark:text-white" />
                <span>processwins.app</span>
            </div>

            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => navigate('/coach-dashboard')}
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

            <h2 className="text-lg font-semibold text-gray-700 mb-3">Upcoming Events</h2>
            {events.length === 0 ? (
                <p className="text-sm text-gray-500">No events scheduled yet.</p>
            ) : (
                <div className="space-y-3">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => navigate(`/event/${event.id}/edit`)}
                            className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition cursor-pointer"
                        >
                            <div className="text-sm font-semibold text-gray-700">
                                {new Date(event.event_date).toLocaleDateString(undefined, {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                })} — vs. {event.opponent || 'TBD'}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-10 text-center">
                <button
                    onClick={() => navigate('/create-team')}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + Create New Team
                </button>
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