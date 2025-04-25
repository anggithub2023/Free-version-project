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

function SportSelectionModal({ onSelect }) {
    const [selectedSport, setSelectedSport] = useState(null);

    const handleStart = () => {
        if (selectedSport) {
            localStorage.setItem('selectedSport', selectedSport); // ✅ Save to localStorage
            onSelect(selectedSport); // ✅ Tell parent ReflectionPage to set sport
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-xl p-8 w-full max-w-md mx-4 text-center space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">
                    Welcome to your personal athlete journey!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Select your sport to start building championship habits today.
                </p>

                <div className="grid grid-cols-4 gap-4 justify-center">
                    {sports.map((sport) => (
                        <button
                            key={sport.id}
                            onClick={() => setSelectedSport(sport.id)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl text-3xl ${
                                selectedSport === sport.id
                                    ? 'bg-indigo-500 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800'
                            } hover:bg-indigo-400 hover:text-white transition-all`}
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
                        selectedSport
                            ? 'bg-green-600 hover:bg-green-500'
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Start Reflection
                </button>
            </div>
        </div>
    );
}

export default SportSelectionModal;