import React, { useEffect, useState } from 'react';
import { getAllEventsWithRSVPs } from '../services/schedulingService';
import EventCard from '../components/Scheduling/EventCard';
import EventResponseChart from '../components/Scheduling/EventResponseChart';
import StickyCtaBar from '../components/StickyCtaBar';

export default function CoachEventDashboard() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchRSVPs = async () => {
            try {
                const all = await getAllEventsWithRSVPs();
                setEvents(all);
            } catch (err) {
                console.error("❌ Failed to load events:", err.message);
                setErrorMsg('Error loading events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchRSVPs();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 pb-32 font-sans">
            <h1 className="text-3xl font-bold text-center mb-4 text-blue-700 dark:text-blue-300">
                RSVP Overview
            </h1>

            {loading ? (
                <p className="text-center text-gray-600 dark:text-gray-400 mt-20 animate-pulse">Loading events...</p>
            ) : errorMsg ? (
                <p className="text-center text-red-600 dark:text-red-400 mt-20">{errorMsg}</p>
            ) : events.length > 0 ? (
                events.map((event) => (
                    <div key={event.id} className="mb-8">
                        <EventCard event={event} showDetails={false} />
                        <EventResponseChart responses={event.rsvps} />
                    </div>
                ))
            ) : (
                <div className="text-center mt-20">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        No upcoming events with RSVPs found.
                    </p>
                    <button
                        onClick={() => (window.location.href = '/create-event')}
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