import React from 'react';
import { MdEvent, MdAccessTime, MdLocationOn } from 'react-icons/md';

export default function EventCard({ event, onClick, showStatus }) {
    const { title, date, time, location, status } = event;

    const formatDate = (d) => new Date(d).toLocaleDateString();

    return (
        <div
            onClick={onClick}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4 cursor-pointer hover:shadow-md transition"
        >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <MdEvent /> {title}
            </h3>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div className="flex items-center gap-2">
                    <MdAccessTime /> {formatDate(date)} at {time}
                </div>
                <div className="flex items-center gap-2">
                    <MdLocationOn /> {location}
                </div>
            </div>
            {showStatus && status && (
                <div className="mt-2 text-xs text-right text-blue-600 dark:text-blue-400 font-medium">
                    Status: {status}
                </div>
            )}
        </div>
    );
}
