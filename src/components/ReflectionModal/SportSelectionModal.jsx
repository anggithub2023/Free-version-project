import React, { useState } from 'react';

const sports = [
    { id: 'basketball', emoji: '🏀', name: 'Basketball' },
    { id: 'soccer', emoji: '⚽', name: 'Soccer' },
    { id: 'football', emoji: '🏈', name: 'Football' },
];

function SportSelectionModal({ onSelect }) {
    const [selectedSport, setSelectedSport] = useState(null);

    const handleStart = () => {
        if (selectedSport) {
            console.log('Selected Sport:', selectedSport);
            localStorage.setItem('selectedSport', selectedSport);
            onSelect(selectedSport); // ✅
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg text-center">
                <h2 className="text-xl font-bold mb-4">Select Your Sport</h2>

                <div className="flex flex-col space-y-2">
                    {sports.map((sport) => (
                        <button
                            key={sport.id}
                            onClick={() => setSelectedSport(sport.id)}
                            className={`px-4 py-2 rounded ${
                                selectedSport === sport.id ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                            }`}
                        >
                            {sport.emoji} {sport.name}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleStart}
                    disabled={!selectedSport}
                    className={`mt-6 w-full py-2 rounded ${
                        selectedSport
                            ? 'bg-green-500 text-white hover:bg-green-400'
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