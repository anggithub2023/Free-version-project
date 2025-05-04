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
    soccer: {
        goalie: [
            { label: 'Goalkeeping', fields: ['Saves', 'Goals Against', 'Clean Sheets', 'Save Percentage'] }
        ],
        default: [
            { label: 'Offense', fields: ['Goals', 'Assists', 'Shots on Target'] },
            { label: 'Defense', fields: ['Tackles Won', 'Fouls Committed'] }
        ]
    },
    football: {
        quarterback: [
            { label: 'Passing', fields: ['Passing Yards', 'Passing TDs', 'Completions', 'Interceptions Thrown', 'Completion Percentage'] }
        ],
        'running-back': [
            { label: 'Rushing', fields: ['Rushing Yards', 'Rushing TDs', 'Fumbles Lost'] }
        ],
        'wide-receiver': [
            { label: 'Receiving', fields: ['Receiving Yards', 'Receiving TDs', 'Receptions'] }
        ],
        'defensive-player': [
            { label: 'Defense', fields: ['Tackles', 'Sacks', 'Interceptions Caught'] }
        ]
    },
    baseball: {
        pitcher: [
            { label: 'Pitching', fields: ['Innings Pitched', 'Strikeouts', 'Walks Allowed', 'Earned Runs', 'ERA', 'Hits Allowed', 'Home Runs Allowed', 'Wins', 'Losses', 'Saves'] }
        ],
        default: [
            { label: 'Batting', fields: ['At Bats', 'Hits', 'Runs', 'RBIs', 'Home Runs', 'Doubles', 'Triples', 'Stolen Bases', 'Strikeouts', 'Walks'] },
            { label: 'Defense', fields: ['Errors'] }
        ]
    },
    icehockey: {
        goalie: [
            { label: 'Goalkeeping', fields: ['Saves', 'Goals Against', 'Save Percentage'] }
        ],
        default: [
            { label: 'Performance', fields: ['Goals', 'Assists', 'Shots on Goal', 'Plus/Minus Rating'] }
        ]
    },
    lacrosse: {
        goalie: [
            { label: 'Goalkeeping', fields: ['Saves', 'Goals Against'] }
        ],
        default: [
            { label: 'Field Play', fields: ['Goals', 'Assists', 'Ground Balls', 'Faceoffs Won'] }
        ]
    },
    trackcrosscountry: [
        { label: 'Event Performance', fields: ['Event Name', 'Time', 'Placement'] }
    ],
    golf: [
        { label: 'Round Stats', fields: ['Round Score', 'Pars', 'Birdies', 'Bogeys', 'Fairways Hit', 'Greens in Regulation'] }
    ]
};

function DynamicStatForm({ sport, position }) {
    const [formData, setFormData] = useState({});
    const [showStatsModal, setShowStatsModal] = useState(false);

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
                        <div key={group.label} className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">{group.label}</h3>
                            {group.fields.map(field => (
                                <div key={field} className="flex flex-col mb-2">
                                    <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">{field}</label>
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
                            ))}
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
