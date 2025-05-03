import React, { useState } from 'react';
import { saveGameStat } from '../../services/syncService';
import StatsConfirmationModal from './StatsConfirmationModal';

function DynamicStatForm({ sport, position }) {
    const [formData, setFormData] = useState({});
    const [showStatsModal, setShowStatsModal] = useState(false);

    const normalizeSport = sportId =>
        sportId?.toLowerCase().replace(/[^a-z]/g, '');
    const pos = position?.toLowerCase();
    const normalized = normalizeSport(sport);

    const normalizeKey = key =>
        key.trim().toLowerCase().replace(/\s+/g, '_');

    const sportFields = (() => {
        switch (normalized) {
            case 'basketball':
                return ['Points', 'Assists', 'Rebounds', 'Steals', 'Blocks', 'Turnovers', 'Minutes Played'];
            case 'soccer':
                return pos === 'goalie'
                    ? ['Saves', 'Goals Against', 'Clean Sheets', 'Save Percentage']
                    : ['Goals', 'Assists', 'Shots on Target', 'Tackles Won', 'Fouls Committed'];
            case 'football':
                switch (pos) {
                    case 'quarterback':
                        return ['Passing Yards', 'Passing TDs', 'Completions', 'Interceptions Thrown', 'Completion Percentage'];
                    case 'running-back':
                        return ['Rushing Yards', 'Rushing TDs', 'Fumbles Lost'];
                    case 'wide-receiver':
                        return ['Receiving Yards', 'Receiving TDs', 'Receptions'];
                    case 'defensive-player':
                        return ['Tackles', 'Sacks', 'Interceptions Caught'];
                    default:
                        return [];
                }
            case 'baseball':
                return pos === 'pitcher'
                    ? ['Strikeouts', 'ERA', 'Walks Allowed', 'Innings Pitched']
                    : ['Hits', 'Runs', 'RBIs', 'Home Runs', 'Errors'];
            case 'icehockey':
                return pos === 'goalie'
                    ? ['Saves', 'Goals Against', 'Save Percentage']
                    : ['Goals', 'Assists', 'Shots on Goal', 'Plus/Minus Rating'];
            case 'lacrosse':
                return pos === 'goalie'
                    ? ['Saves', 'Goals Against']
                    : ['Goals', 'Assists', 'Ground Balls', 'Faceoffs Won'];
            case 'trackcrosscountry':
                return ['Event Name', 'Time', 'Placement'];
            case 'golf':
                return ['Round Score', 'Pars', 'Birdies', 'Bogeys', 'Fairways Hit', 'Greens in Regulation'];
            default:
                return [];
        }
    })();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const normalizedStats = Object.fromEntries(
            Object.entries(formData).map(([key, val]) => [
                normalizeKey(key),
                isNaN(val) ? val : Number(val)
            ])
        );

        const statEntry = {
            sport,
            position: position || 'General Player',
            stats: normalizedStats,
            date: new Date().toISOString()
        };

        // Save to localStorage
        const localStats = JSON.parse(localStorage.getItem('gameStats') || '[]');
        localStats.push(statEntry);
        localStorage.setItem('gameStats', JSON.stringify(localStats));
        localStorage.setItem('selectedSport', sport);
        localStorage.setItem('selectedPosition', position);

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
                    Log Stats for {sport.charAt(0).toUpperCase() + sport.slice(1)}{' '}
                    {position && `- ${position}`}
                </h2>

                {sportFields.length > 0 ? (
                    sportFields.map(field => (
                        <div key={field} className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                                {field}
                            </label>
                            <input
                                type="number"
                                name={field}
                                value={formData[field] || ''}
                                onChange={handleChange}
                                className="border rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-400
                  bg-white dark:bg-gray-700 dark:border-gray-400 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder={field}
                            />
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