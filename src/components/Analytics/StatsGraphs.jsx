import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

console.log("✅ StatsGraphs component mounted");

function StatsGraphs({ filteredStats }) {
    console.log("📊 StatsGraphs received filteredStats:", filteredStats);

    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats available to graph.
            </div>
        );
    }

    // Safely build the dataset
    const data = filteredStats.map(entry => {
        const parsedStats = {};
        for (const [key, value] of Object.entries(entry.stats)) {
            const num = parseFloat(value);
            parsedStats[key] = isNaN(num) ? null : num;
        }
        return {
            date: new Date(entry.date).toLocaleDateString(),
            ...parsedStats
        };
    });

    console.log("📈 Final data for chart:", data);

    const statKeys = Object.keys(data[0] || {}).filter(
        key => key !== 'date' && data.some(d => typeof d[key] === 'number')
    );

    console.log("📌 Stat keys to be charted:", statKeys);

    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="date" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                        labelStyle={{ color: '#d1d5db' }}
                    />
                    <Legend />

                    {/* ✅ TEMP: Hardcoded line for testing */}
                    <Line
                        type="monotone"
                        dataKey="Points"
                        stroke="#4ade80"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                    />

                    {/* ✅ Real mapped lines */}
                    {statKeys.map((key, idx) => (
                        <Line
                            key={idx}
                            type="monotone"
                            dataKey={key}
                            stroke="#60a5fa"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StatsGraphs;