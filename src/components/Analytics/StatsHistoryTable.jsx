import React from 'react';

function StatsHistoryTable({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No stat history to display.
            </div>
        );
    }

    const statKeys = filteredStats.length > 0 ? Object.keys(filteredStats[0].stats) : [];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    {statKeys.map((key, idx) => (
                        <th key={idx} className="px-4 py-2 text-left">{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {filteredStats.map((entry, idx) => (
                    <tr key={idx} className="border-b dark:border-gray-600">
                        <td className="px-4 py-2">{new Date(entry.date).toLocaleDateString()}</td>
                        {statKeys.map((key, kdx) => (
                            <td key={kdx} className="px-4 py-2">{entry.stats[key] ?? '-'}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatsHistoryTable;