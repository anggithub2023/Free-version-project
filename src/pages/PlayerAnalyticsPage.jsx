import React, { useEffect, useState } from 'react';
import AveragesPanel from '../components/Analytics/AveragesPanel';
import ProgressBarsPanel from '../components/Analytics/ProgressBarsPanel';
import StatsGraphs from '../components/Analytics/StatsGraphs';
import StatsHistoryTable from '../components/Analytics/StatsHistoryTable';
import PanelHeader from '../components/Analytics/PanelHeader';

import { MdBarChart, MdTimeline, MdShowChart, MdHistory } from 'react-icons/md';
import { GiAchievement } from 'react-icons/gi';

function PlayerAnalyticsPage() {
    const [gameStats, setGameStats] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredStats, setFilteredStats] = useState([]);

    // Load stats from localStorage
    useEffect(() => {
        try {
            const savedStats = JSON.parse(localStorage.getItem('gameStats')) || [];

            setGameStats(savedStats);

            // Entry Path A: Use most recent full entry
            if (savedStats.length > 0) {
                const lastEntry = savedStats[savedStats.length - 1];
                setSelectedSport(lastEntry.sport?.toLowerCase());

                if (lastEntry.position) {
                    setSelectedPosition(lastEntry.position.toLowerCase());
                }

                if (lastEntry.category) {
                    setSelectedCategory(lastEntry.category.toLowerCase());
                }

                return;
            }

            // Entry Path B: Use stored user selections (from PositionSelectionModal)
            const storedSport = localStorage.getItem('selectedSport');
            const storedPosition = localStorage.getItem('selectedPosition');

            if (storedSport) {
                setSelectedSport(storedSport.toLowerCase());
            }

            if (storedPosition) {
                setSelectedPosition(storedPosition.toLowerCase());
            }

            // Note: Category might be unknown here unless manually inferred

        } catch (err) {
            console.error("Error reading session data from localStorage:", err);
        }
    }, []);

    // Filter stats by sport + position + category
    useEffect(() => {
        if (selectedSport && selectedPosition && selectedCategory) {
            const normalizedSport = selectedSport.toLowerCase();
            const filtered = gameStats.filter(
                stat =>
                    stat.sport?.toLowerCase() === normalizedSport &&
                    stat.position?.toLowerCase() === selectedPosition &&
                    stat.category?.toLowerCase() === selectedCategory
            );
            setFilteredStats(filtered);
        } else {
            setFilteredStats([]);
        }
    }, [selectedSport, selectedPosition, selectedCategory, gameStats]);

    const availableSports = Array.from(new Set(gameStats.map(stat => stat.sport)));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 p-6 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">

                {/* Page Title */}
                <div className="mb-10 text-center">
                    <div className="flex justify-center items-center gap-3 text-gray-800 dark:text-gray-100">
                        <GiAchievement className="text-4xl text-green-500 dark:text-green-300" />
                        <h1 className="text-3xl sm:text-4xl font-bold">Player Performance Center</h1>
                    </div>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                        Monitor trends, track progress, and unlock your game insights.
                    </p>
                </div>

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
                                <PanelHeader
                                    icon={<MdBarChart />}
                                    title="Averages"
                                    subtitle="(Your per-game performance)"
                                />
                                <AveragesPanel filteredStats={filteredStats} />
                            </div>

                            {/* Progress Bars */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                                <PanelHeader
                                    icon={<MdTimeline />}
                                    title="Progress Bars"
                                    subtitle="(How close you are to your goals)"
                                />
                                <ProgressBarsPanel filteredStats={filteredStats} />
                            </div>

                            {/* Stat Graphs */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                                <PanelHeader
                                    icon={<MdShowChart />}
                                    title="Stat Trends"
                                    subtitle="(Visualize changes over time)"
                                />
                                <StatsGraphs filteredStats={filteredStats} />
                            </div>

                            {/* History Table */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                                <PanelHeader
                                    icon={<MdHistory />}
                                    title="Stat History"
                                    subtitle="(Every stat you’ve logged)"
                                />
                                <StatsHistoryTable filteredStats={filteredStats} />
                            </div>

                        </div>
                    ) : (
                        <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
                            No stats found for <strong>{selectedSport}</strong>{' '}
                            {selectedPosition && `(${selectedPosition})`}
                            {selectedCategory && ` – ${selectedCategory}`}
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