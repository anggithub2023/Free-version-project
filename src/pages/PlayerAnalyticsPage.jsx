import React, { useEffect, useState } from 'react';
import AveragesPanel from '../components/Analytics/AveragesPanel';
import ProgressBarsPanel from '../components/Analytics/ProgressBarsPanel';
import StatsGraphs from '../components/Analytics/StatsGraphs';

function PlayerAnalyticsPage() {
    const [gameStats, setGameStats] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');

    useEffect(() => {
        try {
            const savedStats = JSON.parse(localStorage.getItem('gameStats')) || [];
            setGameStats(savedStats);
        } catch (err) {
            console.error("Error parsing localStorage gameStats:", err);
        }
    }, []);

    const filteredStats = selectedSport
        ? gameStats.filter(stat => stat.sport?.toLowerCase() === selectedSport.toLowerCase())
        : [];

    const availableSports = Array.from(new Set(gameStats.map(stat => stat.sport)));

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-green-700 dark:text-green-300">
                    🎯 Player Control Center
                </h1>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <select
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                        className="w-full sm:w-64 p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:border-green-400"
                    >
                        <option value="">Select Sport</option>
                        {availableSports.map((sport, idx) => (
                            <option key={idx} value={sport}>
                                {sport.charAt(0).toUpperCase() + sport.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedSport && filteredStats.length > 0 ? (
                    <div className="space-y-10">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">📊 Averages</h2>
                            <AveragesPanel filteredStats={filteredStats} />
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">📈 Progress Bars</h2>
                            <ProgressBarsPanel filteredStats={filteredStats} />
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">📈 Stat Trends</h2>
                            <StatsGraphs filteredStats={filteredStats} />
                        </div>
                    </div>
                ) : selectedSport ? (
                    <div className="text-center mt-12 text-yellow-600 dark:text-yellow-400">
                        No stats found for <strong>{selectedSport}</strong>.
                    </div>
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
