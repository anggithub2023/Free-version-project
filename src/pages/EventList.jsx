import React from 'react';
import EventCard from '../components/Scheduling/EventCard';

export default function EventList({ events }) {
    if (!events || events.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                No upcoming events yet.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}