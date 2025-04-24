// StatsTable.jsx
import React from 'react';

function StatsTable({ gameStats, tableRef, onClear }) {
    const sortedStats = [...gameStats].sort((a, b) => new Date(b.date) - new Date(a.date));

    const formatStat = (val, threshold) => {
        if (val == null || isNaN(val)) return '-';
        return (
            <span className={val >= threshold ? 'text-green-500 font-semibold' : ''}>
                {val}
            </span>
        );
    };

    return (
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-700 dark:text-indigo-300 text-center mb-4">Game Stats</h3>
                <button
                    onClick={onClear}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                    Clear All Stats
                </button>
            </div>
            <div ref={tableRef} className="overflow-x-auto">
                <table className="w-full table-fixed text-sm text-left border border-gray-200 dark:border-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <tr>
                        <th className="p-2 font-semibold w-[64px] text-center">Date</th>
                        <th className="p-2 font-semibold w-[80px] text-center">Team</th>
                        <th className="p-2 font-semibold w-[48px] text-center">PTS</th>
                        <th className="p-2 font-semibold w-[48px] text-center">AST</th>
                        <th className="p-2 font-semibold w-[48px] text-center">REB</th>
                        <th className="p-2 font-semibold w-[48px] text-center">STL</th>
                        <th className="p-2 font-semibold w-[48px] text-center">TOV</th>
                        <th className="p-2 font-semibold w-[48px] text-center">FT</th>
                        <th className="p-2 font-semibold w-[48px] text-center">MIN</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedStats.map((gs, index) => (
                        <tr key={index} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="p-2 text-center">
                                {gs.date ? new Date(gs.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: '2-digit' }) : '-'}
                            </td>
                            <td className="truncate max-w-[80px] text-center" title={gs.opponent}>
                                {gs.opponent || '-'}
                            </td>
                            <td className="p-2 text-center">{formatStat(gs.points, 20)}</td>
                            <td className="p-2 text-center">{formatStat(gs.assists, 5)}</td>
                            <td className="p-2 text-center">{formatStat(gs.rebounds, 7)}</td>
                            <td className="p-2 text-center">{formatStat(gs.steals, 2)}</td>
                            <td className="p-2 text-center">{formatStat(gs.turnovers, 5)}</td>
                            <td className="p-2 text-center">{formatStat(gs.freeThrows, 6)}</td>
                            <td className="p-2 text-center">{formatStat(gs.minutes, 25)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StatsTable;