import React from 'react';

// Define target goals for common stats
const statGoals = {
    Points: 20,
    Assists: 10,
    Rebounds: 15,
    Steals: 5,
    Blocks: 5,
    Turnovers: 5,
    Saves: 10,
    'Goals Against': 3,
    'Clean Sheets': 1,
    'Save Percentage': 100,
    'Shots on Target': 10,
    'Tackles Won': 10,
    'Fouls Committed': 5,
    'Passing Yards': 300,
    'Rushing Yards': 150,
    'Receiving Yards': 100,
    'Completion Percentage': 100,
    'Strikeouts': 10,
    'Hits': 5,
    'RBIs': 5,
    'Home Runs': 3,
    'Goals': 3,
    'Time': 60,
    'Placement': 1,
    'Round Score': 70,
};

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

    return (
        <div className="space-y-6">
            {Object.entries(totalStats).map(([statName, total], idx) => {
                const goal = statGoals[statName] || 10; // Default fallback goal
                const percentage = Math.min((total / goal) * 100, 100); // Cap at 100%

                return (
                    <div key={idx}>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{statName}</span>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                {total} / {goal}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                            <div
                                className="bg-green-500 h-4 rounded-full"
                                style={{ width: `${percentage}%`, transition: 'width 0.5s ease' }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProgressBarsPanel;