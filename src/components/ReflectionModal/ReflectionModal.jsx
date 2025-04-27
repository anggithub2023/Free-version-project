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
        if (sport) localStorage.setItem('selectedSport', sport);
        if (position) localStorage.setItem('selectedPosition', position);
        window.location.href = '/playerstats';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">🔥 Great Work Reflecting! 🔥</h2>

                <div className="space-y-2 text-lg">
                    <p>Total: <span className="text-indigo-500">{total}%</span></p>
                    <p>Offense: {offense}%</p>
                    <p>Defense: {defense}%</p>
                    <p>Culture: {culture}%</p>
                    <p>Bonus Positivity: {bonus}%</p>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                    <button
                        onClick={handlePlayerStats}
                        className="bg-green-600 hover:bg-green-500 py-3 rounded-full text-white font-bold"
                    >
                        📊 Go to Player Stats
                    </button>

                    <button
                        onClick={handleHome}
                        className="bg-gray-600 hover:bg-gray-500 py-3 rounded-full text-white font-bold"
                    >
                        🏠 Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReflectionModal;