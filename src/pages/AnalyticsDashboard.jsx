import React, { useEffect, useState } from 'react';
import AveragesPanel from '../components/Analytics/AveragesPanel';
import ProgressBarsPanel from '../components/Analytics/ProgressBarsPanel';
import StatsGraphs from '../components/Analytics/StatsGraphs';
import StatsHistoryTable from '../components/Analytics/StatsHistoryTable';
import PanelHeader from '../components/Analytics/PanelHeader';

import {
    MdBarChart,
    MdTimeline,
    MdShowChart,
    MdHistory,
    MdHome,
    MdFileDownload,
    MdMenu
} from 'react-icons/md';
import { GiAchievement } from 'react-icons/gi';

import { fetchGameStats } from '../services/syncService';

function AnalyticsDashboard() {
    const [gameStats, setGameStats] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [filteredStats, setFilteredStats] = useState([]);
    const [showFAB, setShowFAB] = useState(false);

    useEffect(() => {
        const loadStats = async () => {
            let stats = [];
            try {
                stats = await fetchGameStats();
                if (stats?.length > 0) {
                    setGameStats(stats);
                } else {
                    const fallbackStats = JSON.parse(localStorage.getItem('gameStats') || '[]');
                    setGameStats(fallbackStats);
                }
            } catch (err) {
                console.error('Supabase fetch failed:', err.message);
                const localStats = JSON.parse(localStorage.getItem('gameStats') || '[]');
                stats = localStats;
                setGameStats(localStats);
            }

            if (stats.length > 0) {
                const latest = stats[stats.length - 1];
                setSelectedSport(latest.sport?.toLowerCase() || '');
                setSelectedPosition(latest.position?.toLowerCase() || '');
            } else {
                const storedSport = localStorage.getItem('selectedSport');
                const storedPosition = localStorage.getItem('selectedPosition');
                if (storedSport) setSelectedSport(storedSport.toLowerCase());
                if (storedPosition) setSelectedPosition(storedPosition.toLowerCase());
            }
        };

        loadStats();
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (selectedSport && selectedPosition && userId) {
            const filtered = gameStats.filter(
                stat =>
                    stat.user_id === userId &&
                    stat.sport?.toLowerCase() === selectedSport &&
                    stat.position?.toLowerCase() === selectedPosition
            );
            setFilteredStats(filtered);
        } else {
            setFilteredStats([]);
        }
    }, [selectedSport, selectedPosition, gameStats]);

    const availableSports = Array.from(new Set(gameStats.map(stat => stat.sport?.toLowerCase())));
    const availablePositions = Array.from(
        new Set(
            gameStats
                .filter(stat => stat.sport?.toLowerCase() === selectedSport)
                .map(stat => stat.position?.toLowerCase())
        )
    );

    const handleGoHome = () => {
        localStorage.removeItem('selectedSport');
        localStorage.removeItem('selectedPosition');
        window.location.href = '/';
    };

    const handleDownloadStats = () => {
        const csvContent = [
            ['Date', 'Sport', 'Position', 'Stat', 'Value'],
            ...filteredStats.flatMap(({ date, sport, position, stats }) =>
                Object.entries(stats).map(([statName, statValue]) => [
                    new Date(date).toLocaleDateString(),
                    sport,
                    position,
                    statName,
                    statValue
                ])
            )
        ]
            .map(e => e.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'player_stats.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 p-6 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
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
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                    <select
                        value={selectedSport}
                        onChange={e => {
                            const sport = e.target.value;
                            setSelectedSport(sport);
                            const firstAvailablePosition = gameStats.find(
                                stat => stat.sport?.toLowerCase() === sport
                            )?.position?.toLowerCase();
                            setSelectedPosition(firstAvailablePosition || '');
                        }}
                        className="w-full sm:w-64 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    >
                        <option value="">Select Sport</option>
                        {availableSports.map((sport, idx) => (
                            <option key={idx} value={sport}>
                                {sport.charAt(0).toUpperCase() + sport.slice(1)}
                            </option>
                        ))}
                    </select>

                    {/* Position Selector (conditionally shown) */}
                    {availablePositions.length > 1 && (
                        <select
                            value={selectedPosition}
                            onChange={e => setSelectedPosition(e.target.value)}
                            className="w-full sm:w-64 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        >
                            {availablePositions.map((position, idx) => (
                                <option key={idx} value={position}>
                                    {position.charAt(0).toUpperCase() + position.slice(1)}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Analytics Panels */}
                {selectedSport ? (
                    filteredStats.length > 0 ? (
                        <div className="space-y-10">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                                <PanelHeader icon={<MdBarChart />} title="Averages" subtitle="(Your per-game performance)" />
                                <AveragesPanel filteredStats={filteredStats} />
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                                <PanelHeader icon={<MdTimeline />} title="Progress Bars" subtitle="(How close you are to your goals)" />
                                <ProgressBarsPanel filteredStats={filteredStats} />
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                                <PanelHeader icon={<MdShowChart />} title="Stat Trends" subtitle="(Visualize changes over time)" />
                                <StatsGraphs filteredStats={filteredStats} />
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                                <PanelHeader icon={<MdHistory />} title="Stat History" subtitle="(Every stat you’ve logged)" />
                                <StatsHistoryTable filteredStats={filteredStats} />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
                            No stats found for <strong>{selectedSport}</strong>
                            {selectedPosition && ` (${selectedPosition})`}
                        </div>
                    )
                ) : (
                    <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
                        Please select a sport to view analytics.
                    </div>
                )}
            </div>

            {/* Floating Action Button (FAB) */}
            <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-3 z-50">
                {showFAB && (
                    <>
                        <button
                            onClick={handleDownloadStats}
                            className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg"
                            title="Download CSV"
                        >
                            <MdFileDownload size={24} />
                        </button>
                        <button
                            onClick={handleGoHome}
                            className="bg-gray-600 hover:bg-gray-500 text-white p-3 rounded-full shadow-lg"
                            title="Back to Home"
                        >
                            <MdHome size={24} />
                        </button>
                    </>
                )}
                <button
                    onClick={() => setShowFAB(!showFAB)}
                    className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-xl"
                    title="Menu"
                >
                    <MdMenu size={28} />
                </button>
            </div>
        </div>
    );
}

export default AnalyticsDashboard;