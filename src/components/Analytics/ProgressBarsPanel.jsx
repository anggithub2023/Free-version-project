import React from 'react';

// Static goal values (can be made dynamic later)
const statGoals = {
    points: 50,
    assists: 30,
    rebounds: 20,
    steals: 15,
    saves: 25,
    goals_against: 10
};

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

    return (
        <div className="space-y-6">
            {sortedTotals.map(([key, value], index) => {
                const goal = statGoals[key] || null;
                const goalWidth = goal ? Math.max(goal, value) : value;

                return (
                    <div key={`${key}-${index}`}>
                        <div className="flex justify-between text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            <span>{key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                            <span>
                                {value} {goal ? `/ ${goal}` : ''}
                            </span>
                        </div>

                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 relative overflow-hidden">
                            {/* Goal bar (background for comparison) */}
                            {goal && (
                                <div
                                    className="absolute top-0 left-0 h-5 bg-indigo-300 dark:bg-indigo-600 opacity-50"
                                    style={{ width: `${(goal / goalWidth) * 100}%` }}
                                />
                            )}

                            {/* Actual progress bar */}
                            <div
                                className="relative h-5 bg-green-500 dark:bg-green-400 rounded-full transition-all duration-300"
                                style={{ width: `${(value / goalWidth) * 100}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProgressBarsPanel;