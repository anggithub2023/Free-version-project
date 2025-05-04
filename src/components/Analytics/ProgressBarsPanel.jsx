import React from 'react';

function ProgressBarsPanel({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats available to render progress.
            </div>
        );
    }

    // Aggregate totals for each stat
    const totals = {};
    filteredStats.forEach(entry => {
        Object.entries(entry.stats || {}).forEach(([key, value]) => {
            const normalizedKey = key.toLowerCase();
            totals[normalizedKey] = (totals[normalizedKey] || 0) + Number(value || 0);
        });
    });

    const max = Math.max(...Object.values(totals));

    return (
        <div className="space-y-6">
            {Object.entries(totals).map(([key, value], index) => {
                const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

                return (
                    <div key={`${key}-${index}`}>
                        <div className="flex justify-between text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            <span>{key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                            <span>{value}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                            <div
                                className="bg-green-500 h-4 rounded-full transition-all duration-300 ease-in-out"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProgressBarsPanel;