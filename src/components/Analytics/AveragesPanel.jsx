import React from 'react';
import { statLabels } from '../../config/statLabels'; // Adjust path as needed

function AveragesPanel({ stats }) {
    if (!stats || stats.length === 0) {
        return <div className="text-center text-gray-500 dark:text-gray-400">No stats available.</div>;
    }

    const totals = {};
    const counts = {};

    stats.forEach(entry => {
        const statSet = entry.stats;
        for (const [key, value] of Object.entries(statSet)) {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
                totals[key] = (totals[key] || 0) + numericValue;
                counts[key] = (counts[key] || 0) + 1;
            }
        }
    });

    const averages = Object.entries(totals).map(([key, total]) => {
        const avg = total / counts[key];
        return { key, avg: Number(avg.toFixed(2)) };
    });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Stat Averages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {averages.map(({ key, avg }) => (
                    <div
                        key={key}
                        className="bg-indigo-50 dark:bg-gray-700 p-4 rounded shadow text-center"
                    >
                        <div className="text-lg font-semibold text-gray-700 dark:text-white">
                            {statLabels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </div>
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">{avg}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AveragesPanel;