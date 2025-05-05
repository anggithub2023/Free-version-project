// ✅ QA Mode: Collapsible groups + mobile numeric keypad

import React, { useState, useEffect } from 'react';
import { saveGameStat } from '../../services/syncService';
import StatsConfirmationModal from './StatsConfirmationModal';
import ClearConfirmModal from './ClearConfirmModal';
import StickyCtaBar from '../StickyCtaBar';

// (Grouped stat fields: same structure, unchanged)
const groupedStatFields = { /* ... same as before ... */ };

function DynamicStatForm({ sport, position }) {
    const [formData, setFormData] = useState({});
    const [showStatsModal, setShowStatsModal] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState({});

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

    const handleSubmit = async () => {
        const hasData = Object.values(formData).some(val => val !== '');
        if (!hasData) {
            alert('Please enter at least one stat before saving.');
            return;
        }

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

    const handleClearForm = () => {
        setFormData({});
    };

    const toggleGroup = (label) => {
        setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const handleGoHome = () => {
        localStorage.removeItem('selectedSport');
        localStorage.removeItem('selectedPosition');
        window.location.href = '/';
    };

    useEffect(() => {
        const font = document.createElement('link');
        font.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
        font.rel = 'stylesheet';
        document.head.appendChild(font);
    }, []);

    if (!sport) return <div className="text-center mt-10 text-gray-500">No sport selected yet.</div>;

    return (
        <>
            <form className="space-y-4 max-w-xl mx-auto font-['Inter']">
                {(sport || position) && (
                    <p className="text-center text-sm text-gray-500 mb-4">
                        {[sport, position].filter(Boolean).map(str =>
                            str.replace(/\b\w/g, char => char.toUpperCase())
                        ).join(' – ')}
                    </p>
                )}

                {fieldGroups.length > 0 ? (
                    fieldGroups.map(group => (
                        <div key={group.label} className="mb-4 border rounded">
                            <button
                                type="button"
                                onClick={() => toggleGroup(group.label)}
                                className="w-full text-left p-3 bg-gray-100 dark:bg-gray-700 font-semibold text-gray-700 dark:text-white"
                            >
                                {group.label}
                            </button>

                            {expandedGroups[group.label] && (
                                <div className="p-4 bg-white dark:bg-gray-800">
                                    {group.fields.map(field => (
                                        <div key={field} className="flex flex-col mb-2">
                                            <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">{field}</label>
                                            <input
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                name={field}
                                                value={formData[field] || ''}
                                                onChange={handleChange}
                                                className="border rounded-md p-2 focus:outline-none focus:ring bg-white dark:bg-gray-700 dark:text-white"
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

            <StickyCtaBar
                onDownload={() => {
                    const csvContent = [
                        ['Date', 'Sport', 'Position', 'Stat', 'Value'],
                        ...Object.entries(formData).map(([statName, statValue]) => [
                            new Date().toLocaleDateString(),
                            normalizedSport,
                            normalizedPosition,
                            statName,
                            statValue
                        ])
                    ].map(e => e.join(',')).join('\n');

                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'player_stats.csv');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}
                onClear={() => setShowClearModal(true)}
                onSubmit={handleSubmit}
                onHome={handleGoHome}
                onInsights={() => window.location.href = '/analytics'}
            />

            {showClearModal && (
                <ClearConfirmModal
                    message="Are you sure you want to clear this form?"
                    onConfirm={() => {
                        handleClearForm();
                        setShowClearModal(false);
                    }}
                    onCancel={() => setShowClearModal(false)}
                />
            )}

            <StatsConfirmationModal
                visible={showStatsModal}
                onClose={() => setShowStatsModal(false)}
            />
        </>
    );
}

export default DynamicStatForm;
