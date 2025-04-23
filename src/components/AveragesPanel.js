import React from 'react';
import { FaArrowUp, FaArrowDown, FaDotCircle } from 'react-icons/fa';

function AveragesPanel({ gameStats, history, calculateAverage }) {
    const lastGame = gameStats[gameStats.length - 1] || {};

    const getTrendIcon = (statKey) => {
        const avg = calculateAverage(statKey);
        const last = lastGame[statKey] ?? avg;
        if (avg > last) return <FaArrowUp className="inline text-green-500 ml-1" />;
        if (avg < last) return <FaArrowDown className="inline text-red-500 ml-1" />;
        return <FaDotCircle className="inline text-orange-400 ml-1" />;
    };

    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Averages</h3>
                <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-100">
                    <li>Points: {calculateAverage('points')}{getTrendIcon('points')}</li>
                    <li>Assists: {calculateAverage('assists')}{getTrendIcon('assists')}</li>
                    <li>Rebounds: {calculateAverage('rebounds')}{getTrendIcon('rebounds')}</li>
                    <li>Steals: {calculateAverage('steals')}{getTrendIcon('steals')}</li>
                    <li>Turnovers: {calculateAverage('turnovers')}{getTrendIcon('turnovers')}</li>
                    <li>Free Throws: {calculateAverage('freeThrows')}{getTrendIcon('freeThrows')}</li>
                    <li>Minutes: {calculateAverage('minutes')}{getTrendIcon('minutes')}</li>
                </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Reflection Score History</h3>
                <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-100">
                    {history.map((entry, idx) => {
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
