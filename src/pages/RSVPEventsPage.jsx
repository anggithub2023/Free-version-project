import React, { useEffect, useState } from 'react';
import { getUpcomingEvents, submitRSVP } from '../components/Scheduling/eventService';
import EventCard from '../components/Scheduling/EventCard';
import StickyCtaBar from '../components/StickyCtaBar';

export default function RSVPEventsPage() {
    const [events, setEvents] = useState([]);
    const [rsvpStatus, setRsvpStatus] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            const fetched = await getUpcomingEvents();
            setEvents(fetched);
        };
        fetchEvents();
    }, []);

    const handleRSVP = async (eventId, status) => {
        await submitRSVP(eventId, status);
        setRsvpStatus((prev) => ({ ...prev, [eventId]: status }));
    };

    return (
        <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
            <h1 className="text-2xl font-bold text-center mb-6">Upcoming Events</h1>
            <div className="space-y-4">
                {events.length === 0 ? (
                    <p className="text-center text-gray-500">No upcoming events.</p>
                ) : (
                    events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            userRSVP={rsvpStatus[event.id]}
                            onRSVP={handleRSVP}
                        />
                    ))
                )}
            </div>

            <StickyCtaBar onHome={() => (window.location.href = '/')} />
        </div>
    );
}
