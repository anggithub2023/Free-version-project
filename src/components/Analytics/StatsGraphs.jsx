import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function StatsGraphs({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats available to graph.
            </div>
        );
    }

    // Use the most recent game's stats
    const latestStats = filteredStats[filteredStats.length - 1].stats;
    const labels = Object.keys(latestStats);
    const values = Object.values(latestStats).map(val => Number(val));

    const data = {
        labels,
        datasets: [
            {
                label: 'Stat Distribution',
                data: values,
                backgroundColor: [
                    '#4ade80', '#60a5fa', '#f472b6', '#facc15',
                    '#38bdf8', '#f87171', '#c084fc', '#fb923c',
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">📊 Stat Distribution (Latest Game)</h2>
            <Pie data={data} />
        </div>
    );
}

export default StatsGraphs;