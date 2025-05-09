import React from 'react';
import { MdEvent, MdAccessTime, MdLocationOn } from 'react-icons/md';

export default function EventCard({
                                      event,
                                      userRSVP,
                                      onRSVP,
                                      onClick,
                                      showRSVPButtons = true,
                                  }) {
    const { id, title, event_date, location } = event;

    const formattedDate = new Date(event_date);
    const dateStr = formattedDate.toLocaleDateString();
    const timeStr = formattedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const statuses = ['yes', 'no', 'maybe'];

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4 transition cursor-pointer hover:shadow-md"
            onClick={onClick}
        >
            {/* Header */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <MdEvent /> {title}
            </h3>

            {/* Event Metadata */}
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div className="flex items-center gap-2">
                    <MdAccessTime /> {dateStr} at {timeStr}
                </div>
                <div className="flex items-center gap-2">
                    <MdLocationOn /> {location || 'TBD'}
                </div>
            </div>

            {/* RSVP Buttons */}
            {showRSVPButtons && (
                <div className="mt-4 flex gap-2 justify-end">
                    {statuses.map((status) => {
                        const isSelected = userRSVP === status;
                        const baseStyle =
                            'px-3 py-1 rounded-full text-xs font-medium border transition';
                        const activeStyle = 'bg-green-600 text-white border-green-600';
                        const defaultStyle =
                            'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600';

                        return (
                            <button
                                key={status}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRSVP?.(id, status);
                                }}
                                className={`${baseStyle} ${
                                    isSelected ? activeStyle : defaultStyle
                                }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}