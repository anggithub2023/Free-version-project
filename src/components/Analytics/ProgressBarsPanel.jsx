import React from 'react';
import { statLabels } from '../../config/statLabels';

function ProgressBarsPanel({ stats }) {
    if (!stats || stats.length === 0) {
        return <div className="text-center text-gray-500 dark:text-gray-400">No data for progress tracking.</div>;
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

    const normalized = Object.entries(totals).map(([key, total]) => {
        const avg = total / counts[key];
        const percentage = Math.min((avg / 100) * 100, 100); // max 100%
        return { key, avg, percentage };
    });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Progress Overview</h2>

            <div className="space-y-4">
                {normalized.map(({ key, avg, percentage }) => (
                    <div key={key}>
                        <div className="flex justify-between mb-1">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {statLabels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                Avg: {avg.toFixed(1)}
              </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                            <div
                                className="bg-indigo-500 h-4 rounded-full"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProgressBarsPanel;