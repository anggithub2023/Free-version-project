import React, { useEffect, useState } from 'react';

function PlayerAnalyticsPage() {
    const [gameStats, setGameStats] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [filteredStats, setFilteredStats] = useState([]);

    useEffect(() => {
        const savedStats = JSON.parse(localStorage.getItem('gameStats')) || [];
        setGameStats(savedStats);
    }, []);

    useEffect(() => {
        if (selectedSport) {
            const normalizedSport = selectedSport.toLowerCase();
            const filtered = gameStats.filter(stat => stat.sport.toLowerCase() === normalizedSport);
            setFilteredStats(filtered);
        } else {
            setFilteredStats([]);
        }
    }, [selectedSport, gameStats]);

    const availableSports = Array.from(new Set(gameStats.map(stat => stat.sport)));

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-green-700 dark:text-green-300">
                    🎯 Player Control Center
                </h1>

                {/* Control Panel */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <select
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                        className="w-full sm:w-64 p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:border-green-400"
                    >
                        <option value="">Select Sport</option>
                        {availableSports.map((sport, idx) => (
                            <option key={idx} value={sport}>{sport.charAt(0).toUpperCase() + sport.slice(1)}</option>
                        ))}
                    </select>
                </div>

                {/* Dynamic Display */}
                {selectedSport ? (
                    filteredStats.length > 0 ? (
                        <div className="space-y-10">
                            {/* --- Averages Panel Placeholder --- */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4">📊 Averages</h2>
                                {/* AveragesPanel goes here */}
                            </div>

                            {/* --- Progress Bars Placeholder --- */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4">📈 Progress Bars</h2>
                                {/* ProgressBarsPanel goes here */}
                            </div>

                            {/* --- Graphs Section Placeholder --- */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4">📈 Stat Trends</h2>
                                {/* StatsGraphs goes here */}
                            </div>

                            {/* --- Stats History Placeholder --- */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4">📜 Stat History</h2>
                                {/* StatsHistoryTable goes here */}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
                            No stats found for {selectedSport}. Start logging games!
                        </div>
                    )
                ) : (
                    <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
                        Please select a sport to view analytics.
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlayerAnalyticsPage;
