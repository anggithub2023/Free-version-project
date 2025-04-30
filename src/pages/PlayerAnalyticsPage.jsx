import React, { useEffect, useState } from 'react';
import { MdDashboard, MdBarChart, MdTimeline, MdHistory } from 'react-icons/md';
import AveragesPanel from '../components/Analytics/AveragesPanel';
import ProgressBarsPanel from '../components/Analytics/ProgressBarsPanel';
import StatsGraphs from '../components/Analytics/StatsGraphs';
import StatsHistoryTable from '../components/Analytics/StatsHistoryTable';

function PlayerAnalyticsPage() {
    const [gameStats, setGameStats] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [filteredStats, setFilteredStats] = useState([]);

    useEffect(() => {
        try {
            const savedStats = JSON.parse(localStorage.getItem('gameStats')) || [];
            setGameStats(savedStats);
        } catch (err) {
            console.error("Error parsing localStorage gameStats:", err);
        }
    }, []);

    useEffect(() => {
        if (selectedSport) {
            const normalizedSport = selectedSport.toLowerCase();
            const filtered = gameStats.filter(
                stat => stat.sport?.toLowerCase() === normalizedSport
            );
            setFilteredStats(filtered);
        } else {
            setFilteredStats([]);
        }
    }, [selectedSport, gameStats]);

    const availableSports = Array.from(new Set(gameStats.map(stat => stat.sport)));

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-green-700 dark:text-green-300 flex items-center justify-center gap-2">
                    <MdDashboard size={32} className="text-green-500" />
                    Player Control Center
                </h1>

                {/* Sport Selector */}
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

                {/* Analytics Panels */}
                {selectedSport ? (
                    filteredStats.length > 0 ? (
                        <div className="space-y-10">
                            {/* Averages */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                    <MdBarChart className="text-green-500" size={24} />
                                    Averages
                                </h2>
                                <AveragesPanel filteredStats={filteredStats} />
                            </div>

                            {/* Progress Bars */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                    <MdTimeline className="text-blue-500" size={24} />
                                    Progress Bars
                                </h2>
                                <ProgressBarsPanel filteredStats={filteredStats} />
                            </div>

                            {/* Stat Graphs */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                    <MdTimeline className="text-purple-500" size={24} />
                                    Stat Trends
                                </h2>
                                <StatsGraphs filteredStats={filteredStats} />
                            </div>

                            {/* History Table */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                    <MdHistory className="text-yellow-500" size={24} />
                                    Stat History
                                </h2>
                                <StatsHistoryTable filteredStats={filteredStats} />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
                            No stats found for <strong>{selectedSport}</strong>. Start logging games!
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