// RSVPEventsPage.jsx (full update)
import React, { useEffect, useState } from 'react';
import { getUpcomingEvents, submitRSVP } from '../services/schedulingService';
import EventCard from '../components/Scheduling/EventCard';
import StickyCtaBar from '../components/StickyCtaBar';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export default function RSVPEventsPage() {
    const [events, setEvents] = useState([]);
    const [rsvpStatus, setRsvpStatus] = useState({});
    const [anonName, setAnonName] = useState(localStorage.getItem('anonName') || '');
    const { profile } = useCurrentUserProfile();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetched = await getUpcomingEvents();
                setEvents(fetched);
            } catch (error) {
                console.error('Error fetching events:', error);
                alert('❌ Failed to load events. Try again later.');
            }
        };
        fetchEvents();
    }, []);

    const handleRSVP = async (eventId, status) => {
        try {
            const userId = localStorage.getItem('userId');
            let anonymousId = localStorage.getItem('anonId');

            if (!userId) {
                if (!anonymousId) {
                    anonymousId = crypto.randomUUID();
                    localStorage.setItem('anonId', anonymousId);
                }

                if (!anonName.trim()) {
                    const name = prompt("Please enter your name or nickname:");
                    if (!name) return alert("RSVP requires a name.");
                    localStorage.setItem('anonName', name);
                    setAnonName(name);
                }
            }

            await submitRSVP({
                eventId,
                userId: userId || null,
                anonymousId: anonymousId || null,
                anonymousName: anonName || '',
                status,
            });

            setRsvpStatus((prev) => ({ ...prev, [eventId]: status }));
        } catch (err) {
            console.error('❌ Failed to submit RSVP:', err.message);
            alert('Error submitting RSVP. Please try again.');
        }
    };

    return (
        <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white font-['Inter']">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-800 dark:text-blue-200">
                Upcoming Events
            </h1>

            {profile?.is_coach && (
                <div className="text-right mb-4">
                    <a
                        href="/scheduling/events/create"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                    >
                        + Create Event
                    </a>
                </div>
            )}

            <div className="space-y-4">
                {events.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No upcoming events.
                        {profile?.is_coach && (
                            <a href="/scheduling/events/create" className="text-blue-600 dark:text-blue-300 underline"> Create one?</a>
                        )}
                    </p>
                ) : (
                    events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            userRSVP={rsvpStatus[event.id]}
                            onRSVP={profile?.is_coach ? undefined : handleRSVP}
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