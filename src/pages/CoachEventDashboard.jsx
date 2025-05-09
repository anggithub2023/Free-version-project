// src/pages/CoachEventDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEventsWithRSVPs } from '../services/schedulingService';
import EventCard from '../components/Scheduling/EventCard';
import EventResponseChart from '../components/Scheduling/EventResponseChart';
import StickyCtaBar from '../components/StickyCtaBar';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export default function CoachEventDashboard() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [teamName, setTeamName] = useState('');
    const navigate = useNavigate();

    const {
        profile,
        loading: profileLoading,
        error: profileError,
    } = useCurrentUserProfile();

    useEffect(() => {
        if (profile && profile.is_coach) {
            const fetchRSVPs = async () => {
                try {
                    const all = await getAllEventsWithRSVPs();
                    setEvents(all);
                    if (all.length > 0) {
                        setTeamName(all[0].team_name || '');
                    }
                } catch (err) {
                    console.error('❌ Failed to load events:', err.message);
                    setErrorMsg('Error loading events. Please try again later.');
                } finally {
                    setLoading(false);
                }
            };
            fetchRSVPs();
        }
    }, [profile]);

    if (profileLoading) return <p className="text-center mt-10">Loading profile...</p>;
    if (profileError) return <p className="text-center mt-10 text-red-500">Error loading profile</p>;
    if (!profile?.is_coach) return <p className="text-center mt-10 text-gray-500">Access restricted to coaches only.</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 pb-32 font-sans">
            {teamName && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Team: {teamName}
                </p>
            )}
            <h1 className="text-3xl font-bold text-center mb-1 text-blue-700 dark:text-blue-300">
                RSVP Overview
            </h1>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                View who’s attending your upcoming team events
            </p>

            {loading ? (
                <div className="animate-pulse space-y-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto" />
                </div>
            ) : errorMsg ? (
                <p className="text-center text-red-600 dark:text-red-400 mt-20">{errorMsg}</p>
            ) : events.length > 0 ? (
                events.map((event) => (
                    <div key={event.id} className="mb-8">
                        <EventCard
                            event={event}
                            userRSVP={null}
                            onRSVP={null} // ❌ no need for handleRSVP
                            showRSVPButtons={false} // ✅ prevent RSVP display
                            onClick={() => navigate(`/scheduling/events/${event.id}`)}
                        />
                        <EventResponseChart
                            responses={event.rsvps?.map((rsvp) => ({
                                ...rsvp,
                                label:
                                    rsvp.users?.full_name ||
                                    rsvp.anonymous_name ||
                                    'Anonymous',
                            }))}
                        />
                    </div>
                ))
            ) : (
                <div className="text-center mt-20">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        No upcoming events with RSVPs found.
                    </p>
                    <button
                        onClick={() => (window.location.href = '/scheduling/events/create')}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                        ➕ Create New Event
                    </button>
                </div>
            )}

            <StickyCtaBar
                onHome={() => (window.location.href = '/')}
                onInsights={() => (window.location.href = '/analytics')}
                onFeedback={() => (window.location.href = '/feedback')}
            />
        </div>
    );
}