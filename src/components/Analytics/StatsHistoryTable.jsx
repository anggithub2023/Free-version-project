// src/components/Analytics/StatsHistoryTable.jsx
import React from 'react';

function StatsHistoryTable({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No historical stats to display.
            </div>
        );
    }

    const tableRows = filteredStats.flatMap(entry => {
        const date = new Date(entry.date).toLocaleDateString();
        const sport = entry.sport || 'Unknown';
        const position = entry.position || 'Unknown';
        const stats = entry.stats || {};

        return Object.entries(stats).map(([key, value]) => ({
            date,
            sport,
            position,
            stat: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            value
        }));
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-600">
                <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm text-gray-600 dark:text-gray-300">
                    <th className="p-2">Date</th>
                    <th className="p-2">Sport</th>
                    <th className="p-2">Position</th>
                    <th className="p-2">Stat</th>
                    <th className="p-2">Value</th>
                </tr>
                </thead>
                <tbody>
                {tableRows.map((row, idx) => (
                    <tr key={idx} className="border-t border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100">
                        <td className="p-2">{row.date}</td>
                        <td className="p-2">{row.sport}</td>
                        <td className="p-2">{row.position}</td>
                        <td className="p-2">{row.stat}</td>
                        <td className="p-2">{row.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatsHistoryTable;