import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { MdBarChart } from 'react-icons/md';

function StatsGraphs({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats available to graph.
            </div>
        );
    }

    // Build chart data
    const data = filteredStats.map((entry, index) => {
        const base = { game: `Game ${index + 1}` };
        for (const [key, value] of Object.entries(entry.stats)) {
            base[key] = Number(value);
        }
        return base;
    });

    const statKeys = Object.keys(data[0]).filter(k => k !== "game");

    return (
        <div className="h-[400px] bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-2 mb-3 text-green-700 dark:text-green-300">
                <MdBarChart size={24} />
                <h3 className="text-xl font-semibold">Stat Comparison</h3>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="game" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {statKeys.map((key, idx) => (
                        <Bar
                            key={idx}
                            dataKey={key}
                            fill={`hsl(${(idx * 60) % 360}, 70%, 50%)`}
                            radius={[4, 4, 0, 0]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StatsGraphs;