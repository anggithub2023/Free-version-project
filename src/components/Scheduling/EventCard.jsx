// src/components/Scheduling/EventCard.jsx
import React from 'react';
import { MdEvent, MdAccessTime, MdLocationOn } from 'react-icons/md';

export default function EventCard({ event, userRSVP, onRSVP }) {
    const { id, title, event_date, location } = event;

    const dateObj = new Date(event_date);
    const dateStr = dateObj.toLocaleDateString();
    const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const statuses = ['yes', 'no', 'maybe'];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4 transition">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <MdEvent /> {title}
            </h3>

            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div className="flex items-center gap-2">
                    <MdAccessTime /> {dateStr} at {timeStr}
                </div>
                <div className="flex items-center gap-2">
                    <MdLocationOn /> {location || 'TBD'}
                </div>
            </div>

            {/* RSVP Buttons */}
            <div className="mt-4 flex gap-2 justify-end">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => onRSVP(id, status)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                            userRSVP === status
                                ? 'bg-green-600 text-white border-green-600'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}