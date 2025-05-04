import React, { useState } from 'react';
import { saveGameStat } from '../../services/syncService';
import StatsConfirmationModal from './StatsConfirmationModal';

const groupedStatFields = {
    basketball: [
        { label: 'Scoring', fields: ['Points', 'Free Throws Made', 'Free Throws Attempted', 'Field Goals Made', 'Field Goals Attempted', 'Three-Pointers Made', 'Three-Pointers Attempted'] },
        { label: 'Rebounding', fields: ['Rebounds', 'Offensive Rebounds', 'Defensive Rebounds'] },
        { label: 'Defense', fields: ['Steals', 'Blocks'] },
        { label: 'Ball Control', fields: ['Assists', 'Turnovers', 'Fouls'] },
        { label: 'Other', fields: ['Minutes Played'] }
    ],
    // ...rest of sports config remains unchanged
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
        e.preventDefault();

        const normalizedStats = Object.fromEntries(
            Object.entries(formData).map(([key, val]) => [
                normalizeKey(key),
                normalizeValue(val)
            ])
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
            console.warn('📦 Queued stat for retry');
            const queue = JSON.parse(localStorage.getItem('unsyncedGameStats') || '[]');
            queue.push(statEntry);
            localStorage.setItem('unsyncedGameStats', JSON.stringify(queue));
            alert('⚠️ Offline. Stats saved locally.');
        }

        setFormData({});
    };

    if (!sport) {
        return <div className="text-center mt-10 text-gray-500">No sport selected yet.</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Log Stats for {sport} {position && `- ${position}`}
                </h2>

                {fieldGroups.length > 0 ? (
                    fieldGroups.map(group => (
                        <div key={group.label} className="mb-4 border rounded overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                                className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-semibold"
                            >
                                {group.label}
                            </button>

                            {/* openGroup === group.label && ( */}
                            <div>...</div>
                            {/* ) */}
                                <div className="px-4 py-2 bg-white dark:bg-gray-700 transition-all">
                                    {group.fields.map(field => (
                                        <div key={field} className="flex flex-col mb-2">
                                            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">{field}</label>
                                            <input
                                                type="number"
                                                name={field}
                                                value={formData[field] || ''}
                                                onChange={handleChange}
                                                className="border rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-400
                          bg-white dark:bg-gray-800 dark:border-gray-500 dark:text-white"
                                                placeholder={field}
                                            />
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">
                        No input fields configured for this sport yet.
                    </div>
                )}

                <div className="flex gap-4 mt-6">
                    <button
                        type="submit"
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
                    >
                        Save Stats
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({})}
                        className="flex-1 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg"
                    >
                        Clear
                    </button>
                </div>
            </form>

            <StatsConfirmationModal
                visible={showStatsModal}
                onClose={() => setShowStatsModal(false)}
            />
        </>
    );
}

export default DynamicStatForm;