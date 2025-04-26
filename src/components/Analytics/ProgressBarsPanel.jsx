import React from 'react';

function ProgressBarsPanel({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats to display progress.
            </div>
        );
    }

    const totalStats = {};

    // Sum all stats across games
    filteredStats.forEach(entry => {
        for (const [statName, statValue] of Object.entries(entry.stats)) {
            if (!totalStats[statName]) {
                totalStats[statName] = 0;
            }
            totalStats[statName] += Number(statValue);
        }
    });

    // Find highest total for scaling bars
    const maxStatValue = Math.max(...Object.values(totalStats));

    return (
        <div className="space-y-6">
            {Object.entries(totalStats).map(([statName, total], idx) => (
                <div key={idx}>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{statName}</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">{total}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div
                            className="bg-green-500 h-4 rounded-full"
                            style={{ width: `${(total / maxStatValue) * 100}%`, transition: 'width 0.5s ease' }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProgressBarsPanel;
