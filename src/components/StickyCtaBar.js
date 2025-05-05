import React from 'react';
import {
    MdFileDownload,
    MdDeleteForever,
    MdHome,
    MdInsights
} from 'react-icons/md';

export default function StickyCtaBar({ onDownload, onClear, onInsights, onHome }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-md px-4 py-3 flex justify-around items-center z-50">
            <button
                onClick={onDownload}
                className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-indigo-600"
                aria-label="Download CSV"
            >
                <MdFileDownload size={24} />
                <span>Download</span>
            </button>

            <button
                onClick={onClear}
                className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-yellow-600"
                aria-label="Clear Stats"
            >
                <MdDeleteForever size={24} />
                <span>Clear</span>
            </button>

            <button
                onClick={onInsights}
                className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-purple-600"
                aria-label="View Analytics"
            >
                <MdInsights size={24} />
                <span>Analytics</span>
            </button>

            <button
                onClick={onHome}
                className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-red-600"
                aria-label="Go Home"
            >
                <MdHome size={24} />
                <span>Home</span>
            </button>
        </div>
    );
}