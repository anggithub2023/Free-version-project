import React from 'react';
import {
    MdFileDownload,
    MdDeleteForever,
    MdHome,
    MdInsights,
    MdSave,
    MdFeedback,
    MdLeaderboard
} from 'react-icons/md';

export default function StickyCtaBar({
                                         onSubmit,
                                         onDownload,
                                         onClear,
                                         onInsights,
                                         onStats,
                                         onHome,
                                         onFeedback
                                     }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-md px-4 py-3 flex justify-around items-center z-50">
            {onSubmit && (
                <button
                    onClick={onSubmit}
                    className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-green-600"
                    aria-label="Save Stats"
                >
                    <MdSave size={24} />
                    <span>Save</span>
                </button>
            )}

            {onDownload && (
                <button
                    onClick={onDownload}
                    className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-indigo-600"
                    aria-label="Download CSV"
                >
                    <MdFileDownload size={24} />
                    <span>Download</span>
                </button>
            )}

            {onClear && (
                <button
                    onClick={onClear}
                    className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-yellow-600"
                    aria-label="Clear Stats"
                >
                    <MdDeleteForever size={24} />
                    <span>Clear</span>
                </button>
            )}

            {onInsights && (
                <button
                    onClick={onInsights}
                    className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-purple-600"
                    aria-label="View Analytics"
                >
                    <MdInsights size={24} />
                    <span>Analytics</span>
                </button>
            )}

            {onStats && (
                <button
                    onClick={onStats}
                    className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-blue-600"
                    aria-label="Back to Stats"
                >
                    <MdLeaderboard size={24} />
                    <span>Stats</span>
                </button>
            )}

            {onHome && (
                <button
                    onClick={onHome}
                    className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-red-600"
                    aria-label="Go Home"
                >
                    <MdHome size={24} />
                    <span>Home</span>
                </button>
            )}

            {onFeedback && (
                <button
                    onClick={onFeedback}
                    className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-pink-600"
                    aria-label="Submit Feedback"
                >
                    <MdFeedback size={24} />
                    <span>Feedback</span>
                </button>
            )}
        </div>
    );
}