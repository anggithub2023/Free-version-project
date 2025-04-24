import React from 'react';

function StatForm({ newStat, setNewStat, handleAddStat }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-700 dark:text-indigo-300 text-center mb-4">
                Game & Practice Stats Entry
            </h3>

            <div className="space-y-3">
                <input type="date" className="w-full border px-4 py-2 rounded-xl bg-white dark:bg-gray-900" placeholder="Date of Game" value={newStat.date} onChange={e => setNewStat({ ...newStat, date: e.target.value })} />
                <input className="w-full border px-4 py-2 rounded-xl bg-white dark:bg-gray-900" placeholder="Name the squad you just torched 🔥" value={newStat.opponent} onChange={e => setNewStat({ ...newStat, opponent: e.target.value })} />
                <input type="number" className="w-full border px-4 py-2 rounded-xl bg-white dark:bg-gray-900" placeholder="Points" value={newStat.points} onChange={e => setNewStat({ ...newStat, points: e.target.value })} />
                <input type="number" className="w-full border px-4 py-2 rounded-xl bg-white dark:bg-gray-900" placeholder="Assists" value={newStat.assists} onChange={e => setNewStat({ ...newStat, assists: e.target.value })} />
                <input type="number" className="w-full border px-4 py-2 rounded-xl bg-white dark:bg-gray-900" placeholder="Rebounds" value={newStat.rebounds} onChange={e => setNewStat({ ...newStat, rebounds: e.target.value })} />
                <input type="number" className="w-full border px-4 py-2 rounded-xl bg-white dark:bg-gray-900" placeholder="Steals" value={newStat.steals} onChange={e => setNewStat({ ...newStat, steals: e.target.value })} />
                <input type="number" className="w-full border px-4 py-2 rounded-xl bg-white dark:bg-gray-900" placeholder="Turnovers" value={newStat.turnovers} onChange={e => setNewStat({ ...newStat, turnovers: e.target.value })} />
                <input type="number" className="w-full border px-4 py-2 rounded-xl bg-white dark:bg-gray-900" placeholder="Free Throws" value={newStat.freeThrows} onChange={e => setNewStat({ ...newStat, freeThrows: e.target.value })} />
                <input type="number" className="w-full border px-4 py-2 rounded-xl bg-white dark:bg-gray-900" placeholder="Minutes Played" value={newStat.minutes} onChange={e => setNewStat({ ...newStat, minutes: e.target.value })} />
            </div>

            <div className="mt-6">
                <button
                    onClick={handleAddStat}
                    disabled={!newStat.date}
                    className={`w-full px-4 py-2 rounded-xl transition duration-200 ${newStat.date ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white' : 'bg-gray-400 text-white cursor-not-allowed'}`}
                >
                    + Add Another Game
                </button>
            </div>
        </div>
    );
}

export default StatForm;
