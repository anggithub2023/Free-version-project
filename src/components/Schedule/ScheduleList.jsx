import React from 'react';

export default function ScheduleList({ events = [] }) {
    if (!Array.isArray(events)) {
        console.warn('⚠️ Expected events to be an array, received:', events);
        return null;
    }

    if (events.length === 0) {
        return <p className="text-sm text-gray-500">No events found.</p>;
    }

    return (
        <ul className="space-y-2">
            {events.map((event) => (
                <li
                    key={event.id}
                    className="border p-3 rounded shadow-sm bg-white hover:bg-gray-50 transition"
                >
                    <div className="font-semibold">{event.name}</div>
                    <div className="text-xs text-gray-500">
                        {new Date(event.event_date).toLocaleDateString()} — {event.location || 'Location TBD'}
                    </div>
                </li>
            ))}
        </ul>
    );
}