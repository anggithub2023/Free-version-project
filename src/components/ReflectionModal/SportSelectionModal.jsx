// src/components/ReflectionModal/SportSelectionModal.jsx

import React, { useState } from 'react';

const sports = [
    { id: 'basketball', emoji: '🏀', name: 'Basketball' },
    { id: 'soccer', emoji: '⚽', name: 'Soccer' },
    { id: 'football', emoji: '🏈', name: 'Football' },
    { id: 'baseball', emoji: '⚾', name: 'Baseball' },
    { id: 'iceHockey', emoji: '🏒', name: 'Ice Hockey' },
    { id: 'trackCrossCountry', emoji: '🏃‍♂️', name: 'Track/XC' },
    { id: 'lacrosse', emoji: '🥍', name: 'Lacrosse' },
    { id: 'golf', emoji: '🏌️', name: 'Golf' },
];

function SportSelectionModal({ onSelect, buttonLabel = "Start" }) {
    const [selectedSport, setSelectedSport] = useState('');

    const handleStart = () => {
        if (selectedSport) {
            onSelect(selectedSport);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold">What's Your Game?</h2>
                <p className="text-gray-500 dark:text-gray-400">Pick your sport and start your journey.</p>

                <div className="grid grid-cols-4 gap-4">
                    {sports.map((sport) => (
                        <button
                            key={sport.id}
                            onClick={() => setSelectedSport(sport.id)}
                            className={`flex flex-col items-center p-3 rounded-xl text-3xl transition-all ${
                                selectedSport === sport.id
                                    ? 'bg-indigo-500 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800'
                            } hover:bg-indigo-400 hover:text-white`}
                        >
                            <span>{sport.emoji}</span>
                            <span className="text-xs mt-1">{sport.name}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleStart}
                    disabled={!selectedSport}
                    className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                        selectedSport ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
}

export default SportSelectionModal;
