import React from 'react';
import { statLabels } from '../../config/statLabels';

function StatsHistoryTable({ stats }) {
    if (!stats || stats.length === 0) {
        return <div className="text-center text-gray-500 dark:text-gray-400">No history to display.</div>;
    }

    // Dynamically collect all keys across all entries
    const allStatKeys = Array.from(
        new Set(stats.flatMap(entry => Object.keys(entry.stats)))
    );

    return (
        <div className="overflow-x-auto mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Stat History</h2>
            <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-300">
                <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Sport</th>
                    <th className="py-2 px-3">Position</th>
                    {allStatKeys.map((key) => (
                        <th key={key} className="py-2 px-3">
                            {statLabels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {stats.map((entry, index) => (
                    <tr
                        key={index}
                        className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <td className="py-2 px-3">{new Date(entry.date).toLocaleDateString()}</td>
                        <td className="py-2 px-3 capitalize">{entry.sport}</td>
                        <td className="py-2 px-3 capitalize">{entry.position || 'N/A'}</td>
                        {allStatKeys.map((key) => (
                            <td key={key} className="py-2 px-3 text-center">
                                {entry.stats[key] ?? '-'}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatsHistoryTable;