import React from 'react';

function AveragesPanel({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No data available to calculate averages.
            </div>
        );
    }

    const statTotals = {};
    filteredStats.forEach(entry => {
        const stats = entry.stats || {};
        Object.entries(stats).forEach(([key, value]) => {
            const normalizedKey = key.toLowerCase().replace(/\s+/g, '_');
            const numValue = Number(value);
            if (!isNaN(numValue)) {
                if (!statTotals[normalizedKey]) {
                    statTotals[normalizedKey] = { total: 0, count: 0 };
                }
                statTotals[normalizedKey].total += numValue;
                statTotals[normalizedKey].count += 1;
            }
        });
    });

    const averages = Object.entries(statTotals).map(([key, { total, count }]) => ({
        stat: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        average: (total / count).toFixed(2)
    }));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {averages.map(({ stat, average }, index) => (
                <div key={`${stat}-${index}`} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{stat}</h4>
                    <p className="text-2xl text-indigo-600 dark:text-indigo-300 font-bold">{average}</p>
                </div>
            ))}
        </div>
    );
}

export default AveragesPanel;