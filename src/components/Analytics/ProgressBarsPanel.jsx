import React from 'react';

function ProgressBarsPanel({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats available to render progress.
            </div>
        );
    }

    const normalizeKey = key => key.toLowerCase().replace(/\s+/g, '_');

    const totals = {};
    filteredStats.forEach(entry => {
        Object.entries(entry.stats || {}).forEach(([key, value]) => {
            const normalizedKey = normalizeKey(key);
            const numValue = Number(value);
            if (!isNaN(numValue)) {
                totals[normalizedKey] = (totals[normalizedKey] || 0) + numValue;
            }
        });
    });

    const sortedTotals = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const max = Math.max(...sortedTotals.map(([_, v]) => v), 0);

    return (
        <div className="space-y-6">
            {sortedTotals.map(([key, value], index) => {
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