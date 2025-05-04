import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList
} from 'recharts';

function StatsGraphs({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats available to show trends.
            </div>
        );
    }

    const normalizeKey = key => key.toLowerCase().replace(/\s+/g, '_');

    const statKeysSet = new Set();
    filteredStats.forEach(entry => {
        Object.keys(entry.stats || {}).forEach(key => statKeysSet.add(normalizeKey(key)));
    });
    const statKeys = Array.from(statKeysSet);

    const graphData = filteredStats.map(entry => {
        const row = { date: new Date(entry.date).toLocaleDateString() };
        Object.entries(entry.stats || {}).forEach(([key, value]) => {
            row[normalizeKey(key)] = Number(value);
        });
        return row;
    });

    return (
        <div className="space-y-10">
            {statKeys.map((key, index) => (
                <div key={`${key}-${index}`}>
                    <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={graphData} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey={key} fill="#4F46E5">
                                <LabelList dataKey={key} position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
}

export default StatsGraphs;