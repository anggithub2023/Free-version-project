// src/pages/TeamSubDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import { BsCalendarEvent, BsPeople, BsPersonBadge, BsTrash } from 'react-icons/bs';
import ConfirmDeleteModal from '../components/common/ConfirmDeleteModal';

export default function TeamSubDashboard() {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeam = async () => {
            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .eq('id', teamId)
                .single();

            if (error) {
                console.error('Error fetching team:', error);
            } else {
                setTeam(data);
            }
            setLoading(false);
        };

        fetchTeam();
    }, [teamId]);

    const handleDelete = async () => {
        const { error } = await supabase
            .from('teams')
            .delete()
            .eq('id', teamId);

        if (!error) {
            navigate('/coach-dashboard');
        } else {
            console.error('Error deleting team:', error);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading team...</div>;
    if (!team) return <div className="p-6 text-center">Team not found</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4 font-[Poppins]">
            <div className="flex items-center justify-center gap-2 text-sm font-medium mb-6">
                <BsPersonBadge className="text-black dark:text-white" />
                <span>processwins.app</span>
            </div>

            <h2 className="text-2xl font-semibold text-center mb-4">{team.name}</h2>
            <p className="text-center text-gray-500 mb-8">Location: {team.location}</p>

            <div className="space-y-4">
                <button
                    onClick={() => navigate(`/team/${teamId}/events/create`)}
                    className="w-full flex items-center gap-3 px-4 py-3 border rounded shadow-sm hover:bg-gray-50"
                >
                    <BsCalendarEvent className="text-lg" />
                    <span className="text-sm font-medium">Create Event</span>
                </button>

                <button
                    onClick={() => navigate(`/team/${teamId}/events/admin`)}
                    className="w-full flex items-center gap-3 px-4 py-3 border rounded shadow-sm hover:bg-gray-50"
                >
                    <BsCalendarEvent className="text-lg" />
                    <span className="text-sm font-medium">Manage Events</span>
                </button>

                <button
                    onClick={() => navigate(`/team/${teamId}/players`)}
                    className="w-full flex items-center gap-3 px-4 py-3 border rounded shadow-sm hover:bg-gray-50"
                >
                    <BsPeople className="text-lg" />
                    <span className="text-sm font-medium">Manage Players</span>
                </button>

                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 border border-red-500 text-red-600 rounded shadow-sm hover:bg-red-50"
                >
                    <BsTrash className="text-lg" />
                    <span className="text-sm font-medium">Delete Team</span>
                </button>
            </div>

            <div className="text-center mt-8">
                <button
                    onClick={() => navigate('/coach-dashboard')}
                    className="text-[15px] text-blue-600 hover:underline"
                >
                    ← Back to Dashboard
                </button>
            </div>

            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Team?"
                message="This will remove the team and all related data. Are you sure?"
            />
        </div>
    );
}