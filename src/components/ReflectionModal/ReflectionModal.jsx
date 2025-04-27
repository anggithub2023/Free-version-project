// src/components/ReflectionModal/ReflectionModal.jsx
import React from 'react';

function ReflectionModal({ total, offense, defense, culture, bonus, sport, position }) {
    const handleHome = () => {
        localStorage.removeItem('selectedSport');
        localStorage.removeItem('selectedPosition');
        localStorage.removeItem('randomQuestionsReflection');
        localStorage.removeItem('processAnswers');
        window.location.href = '/';
    };

    const handlePlayerStats = () => {
        // ✅ Re-save sport and position to avoid missing data
        if (sport) {
            localStorage.setItem('selectedSport', sport);
        }
        if (position) {
            localStorage.setItem('selectedPosition', position);
        }
        window.location.href = '/playerstats';
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6 text-center">
                <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">🔥 Great Work Reflecting! 🔥</h2>

                <div className="space-y-2">
                    <p className="text-lg font-semibold">Total Reflection Score: <span className="text-indigo-500">{total}%</span></p>
                    <p>Offense: {offense}%</p>
                    <p>Defense: {defense}%</p>
                    <p>Team Culture: {culture}%</p>
                    <p>Bonus Positivity: {bonus}%</p>
                </div>

                <div className="flex flex-col gap-4 pt-4">
                    <button
                        onClick={handlePlayerStats}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow transition"
                    >
                        📊 Go to Player Stats
                    </button>

                    <button
                        onClick={handleHome}
                        className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full shadow transition"
                    >
                        🏠 Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReflectionModal;