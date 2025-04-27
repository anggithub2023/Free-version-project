// src/components/PlayerStats/PositionSelectionModal.jsx

import React, { useState } from 'react';

const positionOptions = {
    soccer: ["Goalie", "Field Player"],
    football: ["Quarterback", "Running Back", "Wide Receiver", "Defensive Player"],
    baseball: ["Pitcher", "Field Player"],
    iceHockey: ["Goalie", "Skater"],
    lacrosse: ["Goalie", "Field Player"]
};

function PositionSelectionModal({ onSelect, sport }) {
    const [selectedPosition, setSelectedPosition] = useState('');

    const handleStart = () => {
        if (selectedPosition) {
            localStorage.setItem('selectedPosition', selectedPosition); // ✅ Save immediately
            onSelect(selectedPosition);
        }
    };

    const positions = positionOptions[sport] || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold">Select Your Position</h2>
                <p className="text-gray-500 dark:text-gray-400">For {sport.charAt(0).toUpperCase() + sport.slice(1)}</p>

                <div className="grid grid-cols-2 gap-4">
                    {positions.map((pos) => (
                        <button
                            key={pos}
                            onClick={() => setSelectedPosition(pos)}
                            className={`flex flex-col items-center p-4 rounded-xl transition-all font-semibold ${
                                selectedPosition === pos
                                    ? 'bg-indigo-500 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800'
                            } hover:bg-indigo-400 hover:text-white`}
                        >
                            {pos}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleStart}
                    disabled={!selectedPosition}
                    className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                        selectedPosition ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default PositionSelectionModal;