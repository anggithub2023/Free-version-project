import React, { useState } from 'react';
import { saveGameStat } from '../../services/syncService';
import StatsConfirmationModal from './StatsConfirmationModal';
import { saveAs } from 'file-saver';
import '@fontsource/roboto';

const groupedStatFields = {
    basketball: [
        { label: 'Scoring', fields: ['Points', 'Free Throws Made', 'Free Throws Attempted', 'Field Goals Made', 'Field Goals Attempted', 'Three-Pointers Made', 'Three-Pointers Attempted'] },
        { label: 'Rebounding', fields: ['Rebounds', 'Offensive Rebounds', 'Defensive Rebounds'] },
        { label: 'Defense', fields: ['Steals', 'Blocks'] },
        { label: 'Ball Control', fields: ['Assists', 'Turnovers', 'Fouls'] },
        { label: 'Other', fields: ['Minutes Played'] }
    ],
    // Extend other sports here if needed...
};

function DynamicStatForm({ sport, position }) {
    const [formData, setFormData] = useState({});
    const [showStatsModal, setShowStatsModal] = useState(false);
    const [openGroup, setOpenGroup] = useState(null);

    const normalizeKey = key => key.trim().toLowerCase().replace(/\s+/g, '_');
    const normalizeValue = val => (isNaN(val) ? val : Number(val));
    const normalizeSport = sportId => sportId?.toLowerCase().replace(/[^a-z]/g, '');
    const normalizedSport = normalizeSport(sport);
    const normalizedPosition = position?.toLowerCase() || 'default';

    const resolveFieldGroups = () => {
        const group = groupedStatFields[normalizedSport];
        if (!group) return [];
        if (Array.isArray(group)) return group;
        return group[normalizedPosition] || group.default || [];
    };

    const fieldGroups = resolveFieldGroups();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        if (e) e.preventDefault();
        const normalizedStats = Object.fromEntries(
            Object.entries(formData).map(([key, val]) => [normalizeKey(key), normalizeValue(val)])
        );

        const statEntry = {
            sport: normalizedSport,
            position: normalizedPosition,
            stats: normalizedStats,
            date: new Date().toISOString()
        };

        const localStats = JSON.parse(localStorage.getItem('gameStats') || '[]');
        localStats.push(statEntry);
        localStorage.setItem('gameStats', JSON.stringify(localStats));
        localStorage.setItem('selectedSport', normalizedSport);
        localStorage.setItem('selectedPosition', normalizedPosition);

        try {
            await saveGameStat(statEntry);
            setShowStatsModal(true);
        } catch (error) {
            const queue = JSON.parse(localStorage.getItem('unsyncedGameStats') || '[]');
            queue.push(statEntry);
            localStorage.setItem('unsyncedGameStats', JSON.stringify(queue));
            alert('⚠️ Offline. Stats saved locally.');
        }

        setFormData({});
    };

    const handleDownload = () => {
        const stats = JSON.parse(localStorage.getItem('gameStats') || '[]');
        if (!stats.length) return;
        const headers = ['Sport', 'Position', 'Date', ...Object.keys(stats[0]?.stats || {})];
        const rows = stats.map(stat => [
            stat.sport,
            stat.position,
            new Date(stat.date).toLocaleDateString(),
            ...headers.slice(3).map(h => stat.stats?.[h.toLowerCase().replace(/\s+/g, '_')] ?? '')
        ]);
        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        saveAs(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'game_stats.csv');
    };

    const handleHome = () => {
        localStorage.removeItem('selectedSport');
        localStorage.removeItem('selectedPosition');
        window.location.href = '/';
    };

    if (!sport) {
        return <div className="text-center mt-10 text-gray-500">No sport selected yet.</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto pb-32 font-['Roboto']">
                <h2 className="text-2xl font-bold text-center mb-1">Log Stats for {sport}</h2>
                {position && <p className="text-center text-sm text-gray-500 mb-4">Position: {position}</p>}

                {fieldGroups.length > 0 ? (
                    fieldGroups.map(group => (
                        <div key={group.label} className="mb-4 border rounded overflow-hidden">
                            <button
                                type="button"
                                className="w-full bg-gray-100 dark:bg-gray-800 text-left px-4 py-2 font-semibold text-gray-700 dark:text-white"
                                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                            >
                                {group.label}
                            </button>
                            {openGroup === group.label && (
                                <div className="p-4 bg-white dark:bg-gray-700">
                                    {group.fields.map(field => (
                                        <div key={field} className="flex flex-col mb-3">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{field}</label>
                                            <input
                                                type="number"
                                                name={field}
                                                value={formData[field] || ''}
                                                onChange={handleChange}
                                                className="mt-1 border rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-400
                          bg-white dark:bg-gray-800 dark:border-gray-500 dark:text-white"
                                                placeholder={field}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No input fields configured for this sport yet.</div>
                )}
            </form>

            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md px-4 py-3 flex justify-between items-center z-50 border-t dark:border-gray-700">
                <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-semibold">Save</button>
                <button onClick={() => setFormData({})} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded font-semibold">Clear</button>
                <button onClick={handleDownload} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-semibold">Download CSV</button>
                <button onClick={handleHome} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-semibold">Home</button>
            </div>

            <StatsConfirmationModal visible={showStatsModal} onClose={() => setShowStatsModal(false)} />
        </>
    );
}

export default DynamicStatForm;
