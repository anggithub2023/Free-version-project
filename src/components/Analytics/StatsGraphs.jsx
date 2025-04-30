import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function StatsGraphs({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats available to graph.
            </div>
        );
    }

    const dates = filteredStats.map(entry => new Date(entry.date).toLocaleDateString());
    const statKeys = Object.keys(filteredStats[0]?.stats || {});

    const datasets = statKeys.map((stat, idx) => ({
        label: stat,
        data: filteredStats.map(entry => Number(entry.stats[stat]) || 0),
        borderColor: `hsl(${idx * 60}, 70%, 50%)`,
        tension: 0.4,
    }));

    const data = {
        labels: dates,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Stat Trends Over Time' },
        },
    };

    return <Line data={data} options={options} />;
}

export default StatsGraphs;