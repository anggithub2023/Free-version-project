// src/pages/RSVPEventsPage.jsx
import React, { useEffect, useState } from 'react';
import { getUpcomingEvents, submitRSVP } from '../services/schedulingService';
import EventCard from '../components/Scheduling/EventCard';
import StickyCtaBar from '../components/StickyCtaBar';

export default function RSVPEventsPage() {
    const [events, setEvents] = useState([]);
    const [rsvpStatus, setRsvpStatus] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetched = await getUpcomingEvents();
                setEvents(fetched);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleRSVP = async (eventId, status) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User ID not found.');
            return;
        }

        try {
            await submitRSVP({ eventId, userId, status });
            setRsvpStatus((prev) => ({ ...prev, [eventId]: status }));
        } catch (err) {
            alert('Failed to submit RSVP.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white font-['Inter']">
            <h1 className="text-3xl font-bold text-center mb-6">Upcoming Events</h1>

            <div className="space-y-4">
                {events.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">No upcoming events.</p>
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

            <StickyCtaBar
                onHome={() => (window.location.href = '/')}
                onFeedback={() =>
                    window.open(
                        'https://docs.google.com/forms/d/e/1FAIpQLSeopJAyVo6uA4CEKw0bVEbgTEDHwQr2S8Xev17D1KkUZcFDIQ/viewform',
                        '_blank'
                    )
                }
            />
        </div>
    );
}