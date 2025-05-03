import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { statLabels } from '../../config/statLabels';

function StatsGraphs({ stats }) {
    if (!stats || stats.length === 0) {
        return <div className="text-center text-gray-500 dark:text-gray-400">No stats to visualize.</div>;
    }

    // Get all stat keys present in any entry
    const allStatKeys = Array.from(
        new Set(stats.flatMap(entry => Object.keys(entry.stats)))
    );

    // Build chart data: merge date + stats into a flat object
    const chartData = stats.map(entry => ({
        date: new Date(entry.date).toLocaleDateString(),
        ...entry.stats
    }));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Stat Trends</h2>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    {allStatKeys.map((key, i) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            strokeWidth={2}
                            stroke={`hsl(${(i * 60) % 360}, 70%, 50%)`}
                            name={statLabels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StatsGraphs;