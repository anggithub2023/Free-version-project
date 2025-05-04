import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

function StatsGraphs({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stats available to show trends.
            </div>
        );
    }

    const statKeys = Object.keys(filteredStats[0]?.stats || {});
    const graphData = filteredStats.map(entry => ({
        ...entry.stats,
        date: new Date(entry.date).toLocaleDateString()
    }));

    return (
        <div className="space-y-12">
            {statKeys.map((key, index) => (
                <div key={`${key}-${index}`}>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={graphData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey={key} stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
}

export default StatsGraphs;