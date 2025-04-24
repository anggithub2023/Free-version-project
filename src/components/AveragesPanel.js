import React from 'react';
import { FaArrowUp, FaArrowDown, FaDotCircle } from 'react-icons/fa';

function AveragesPanel({ gameStats, history, calculateAverage }) {
    const lastGame = gameStats[gameStats.length - 1] || {};

    const getTrendIcon = (statKey) => {
        const avg = calculateAverage(statKey);
        const last = lastGame[statKey] ?? avg;
        if (avg > last) return <FaArrowUp title="Above last game" className="inline text-green-500 ml-1" />;
        if (avg < last) return <FaArrowDown title="Below last game" className="inline text-red-500 ml-1" />;
        return <FaDotCircle title="Same as last game" className="inline text-orange-400 ml-1" />;
    };

    const formatStat = (key) => {
        const avg = calculateAverage(key);
        const last = lastGame[key] ?? avg;
        const trendClass = avg > last
            ? 'text-green-500'
            : avg < last
                ? 'text-red-500'
                : 'text-gray-700 dark:text-gray-100';

        return (
            <span className={trendClass}>
                {avg.toFixed(1)}{getTrendIcon(key)}
            </span>
        );
    };

    const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Averages Section */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Averages</h3>
                <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-100">
                    <li>Points: {formatStat('points')}</li>
                    <li>Assists: {formatStat('assists')}</li>
                    <li>Rebounds: {formatStat('rebounds')}</li>
                    <li>Steals: {formatStat('steals')}</li>
                    <li>Turnovers: {formatStat('turnovers')}</li>
                    <li>Free Throws: {formatStat('freeThrows')}</li>
                    <li>Minutes: {formatStat('minutes')}</li>
                </ul>
            </div>

            {/* Reflection Score History */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-700 dark:text-indigo-300 text-center mb-4">Reflection Score History</h3>
                <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-100">
                    {sortedHistory.map((entry, idx) => {
                        const score = entry.total;
                        const badgeColor =
                            score >= 85 ? "bg-green-500 text-white" :
                                score >= 70 ? "bg-yellow-400 text-black" :
                                    "bg-red-500 text-white";

                        return (
                            <li key={idx} className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-2">
                                <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
                                <span className={`text-sm px-2 py-1 rounded ${badgeColor}`}>
                                    {score}%
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default AveragesPanel;