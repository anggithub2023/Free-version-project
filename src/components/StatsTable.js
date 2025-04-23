import React from 'react';

function StatsTable({ gameStats, tableRef }) {
    return (
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300 text-center mb-4">Game Stats</h3>
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
                    {gameStats.map((gs, index) => (
                        <tr key={index} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="p-2 text-center">{gs.date ? new Date(gs.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: '2-digit' }) : ''}</td>
                            <td className="truncate max-w-[80px] text-center" title={gs.opponent}>{gs.opponent}</td>
                            <td className="p-2 text-center">{gs.points}</td>
                            <td className="p-2 text-center">{gs.assists}</td>
                            <td className="p-2 text-center">{gs.rebounds}</td>
                            <td className="p-2 text-center">{gs.steals}</td>
                            <td className="p-2 text-center">{gs.turnovers}</td>
                            <td className="p-2 text-center">{gs.freeThrows}</td>
                            <td className="p-2 text-center">{gs.minutes}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StatsTable;
