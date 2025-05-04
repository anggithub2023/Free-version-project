import React from 'react';

function AveragesPanel({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats to calculate averages.
            </div>
        );
    }

    const totalStats = {};
    const statCounts = {};

    // Sum all stats across games
    filteredStats.forEach(entry => {
        for (const [statName, statValue] of Object.entries(entry.stats)) {
            if (!totalStats[statName]) {
                totalStats[statName] = 0;
                statCounts[statName] = 0;
            }
            totalStats[statName] += Number(statValue);
            statCounts[statName] += 1;
        }
    });

    // Calculate averages
    const averages = Object.keys(totalStats).map(statName => ({
        stat: statName,
        average: (totalStats[statName] / statCounts[statName]).toFixed(1)
    }));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {averages.map(({ stat, average }, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{stat}</h3>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{average}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Avg/Game</p>
                </div>
            ))}
        </div>
    );
}

export default AveragesPanel;