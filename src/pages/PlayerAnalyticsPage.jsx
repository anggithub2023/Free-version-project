import React, { useEffect, useState } from 'react';
import AveragesPanel from '../components/Analytics/AveragesPanel';
import ProgressBarsPanel from '../components/Analytics/ProgressBarsPanel';
import StatsGraphs from '../components/Analytics/StatsGraphs';
import StatsHistoryTable from '../components/Analytics/StatsHistoryTable';
import { MdBarChart, MdTimeline, MdShowChart, MdHistory } from 'react-icons/md';
import { GiAchievement } from 'react-icons/gi';

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 p-6 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
                    <GiAchievement className="text-4xl text-green-500 dark:text-green-300" />
                    Player Performance Center
                </h1>

                {/* Sport Selector */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <select
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                        className="w-full sm:w-64 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
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
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                                    <MdBarChart /> Averages <span className="text-sm text-gray-400">(Your per-game performance)</span>
                                </h2>
                                <AveragesPanel filteredStats={filteredStats} />
                            </div>

                            {/* Progress Bars */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                                    <MdTimeline /> Progress Bars <span className="text-sm text-gray-400">(How close you are to your goals)</span>
                                </h2>
                                <ProgressBarsPanel filteredStats={filteredStats} />
                            </div>

                            {/* Stat Graphs */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                                    <MdShowChart /> Stat Trends <span className="text-sm text-gray-400">(Visualize changes over time)</span>
                                </h2>
                                <StatsGraphs filteredStats={filteredStats} />
                            </div>

                            {/* History Table */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                                    <MdHistory /> Stat History <span className="text-sm text-gray-400">(Every stat you’ve logged)</span>
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