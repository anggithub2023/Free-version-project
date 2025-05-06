import React, { useEffect, useState } from 'react';
import { getAllEventsWithRSVPs } from './eventService';
import EventCard from './EventCard';
import EventResponseChart from './EventResponseChart';
import StickyCtaBar from '../StickyCtaBar';

export default function CoachEventDashboard() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchRSVPs = async () => {
            const all = await getAllEventsWithRSVPs();
            setEvents(all);
        };
        fetchRSVPs();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 pb-32 font-sans">
            <h1 className="text-3xl font-bold text-center mb-4 text-blue-700 dark:text-blue-300">
                RSVP Overview
            </h1>

            {events.length > 0 ? (
                events.map((event) => (
                    <div key={event.id} className="mb-8">
                        <EventCard event={event} showDetails={false} />
                        <EventResponseChart responses={event.rsvps} />
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-20">
                    No upcoming events with RSVPs found.
                </p>
            )}

            <StickyCtaBar
                onHome={() => (window.location.href = '/')}
                onInsights={() => (window.location.href = '/analytics')}
                onFeedback={() => (window.location.href = '/feedback')}
            />
        </div>
    );
}
