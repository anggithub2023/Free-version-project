import React from 'react';

function StatsHistoryTable({ filteredStats }) {
    if (!filteredStats || filteredStats.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                No historical stats to display.
            </div>
        );
    }

    // Dynamically collect all stat keys used across all entries
    const allStatKeys = Array.from(
        new Set(
            filteredStats.flatMap(entry => Object.keys(entry.stats || {}))
        )
    );

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-600">
                <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm text-gray-600 dark:text-gray-300">
                    <th className="p-2">Date</th>
                    <th className="p-2">Sport</th>
                    <th className="p-2">Position</th>
                    {allStatKeys.map(key => (
                        <th key={key} className="p-2">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {filteredStats.map((entry, idx) => (
                    <tr
                        key={idx}
                        className="border-t border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100"
                    >
                        <td className="p-2">{new Date(entry.date).toLocaleDateString()}</td>
                        <td className="p-2">{entry.sport || 'Unknown'}</td>
                        <td className="p-2">{entry.position || 'Unknown'}</td>
                        {allStatKeys.map(statKey => (
                            <td key={statKey} className="p-2">
                                {entry.stats?.[statKey] ?? '--'}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatsHistoryTable;