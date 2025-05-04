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
    MdMenu,
} from 'react-icons/md';
import { GiAchievement } from 'react-icons/gi';
import { fetchGameStats } from '../services/syncService';

const normalize = (val) =>
    val?.toLowerCase().replace(/\s+/g, '_').trim() || '';

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
                setGameStats(stats?.length ? stats : JSON.parse(localStorage.getItem('gameStats') || '[]'));
            } catch (err) {
                console.error('Supabase fetch failed:', err.message);
                stats = JSON.parse(localStorage.getItem('gameStats') || '[]');
                setGameStats(stats);
            }

            if (stats.length > 0) {
                const latest = stats[0];
                setSelectedSport(normalize(latest.sport));
                setSelectedPosition(normalize(latest.position));
            } else {
                const storedSport = normalize(localStorage.getItem('selectedSport'));
                const storedPosition = normalize(localStorage.getItem('selectedPosition'));
                if (storedSport) setSelectedSport(storedSport);
                if (storedPosition) setSelectedPosition(storedPosition);
            }
        };

        loadStats();
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (selectedSport && selectedPosition && userId) {
            const filtered = gameStats.filter(
                (stat) =>
                    stat.user_id === userId &&
                    normalize(stat.sport) === selectedSport &&
                    normalize(stat.position) === selectedPosition
            );
            setFilteredStats(filtered);
        } else {
            setFilteredStats([]);
        }
    }, [selectedSport, selectedPosition, gameStats]);

    const availableSports = Array.from(new Set(gameStats.map((stat) => normalize(stat.sport))));
    const availablePositions = Array.from(
        new Set(
            gameStats
                .filter((stat) => normalize(stat.sport) === selectedSport)
                .map((stat) => normalize(stat.position))
        )
    );

    const formatDisplay = (val) =>
        val?.replace(/_/g, ' ')?.replace(/\b\w/g, (l) => l.toUpperCase());

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
                    statValue,
                ])
            ),
        ]
            .map((e) => e.join(','))
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

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                    <select
                        value={selectedSport}
                        onChange={(e) => {
                            const sport = e.target.value;
                            setSelectedSport(sport);
                            const firstAvailablePosition = gameStats.find(
                                (stat) => normalize(stat.sport) === sport
                            )?.position;
                            setSelectedPosition(normalize(firstAvailablePosition || ''));
                        }}
                        className="w-full sm:w-64 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    >
                        <option value="">Select Sport</option>
                        {availableSports.map((sport, idx) => (
                            <option key={idx} value={sport}>
                                {formatDisplay(sport)}
                            </option>
                        ))}
                    </select>

                    {availablePositions.length > 1 && (
                        <select
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value)}
                            className="w-full sm:w-64 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        >
                            {availablePositions.map((position, idx) => (
                                <option key={idx} value={position}>
                                    {formatDisplay(position)}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

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
                            No stats found for <strong>{formatDisplay(selectedSport)}</strong>
                            {selectedPosition && ` (${formatDisplay(selectedPosition)})`}
                        </div>
                    )
                ) : (
                    <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
                        Please select a sport to view analytics.
                    </div>
                )}
            </div>

            {/* FAB with visible button labels */}
            <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-3 z-50">
                {showFAB && (
                    <>
                        <div className="flex items-center space-x-2">
                            <span className="bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 px-3 py-1 rounded shadow">
                                Download CSV
                            </span>
                            <button
                                onClick={handleDownloadStats}
                                className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg"
                                title="Download CSV"
                            >
                                <MdFileDownload size={24} />
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 px-3 py-1 rounded shadow">
                                Back to Home
                            </span>
                            <button
                                onClick={handleGoHome}
                                className="bg-gray-600 hover:bg-gray-500 text-white p-3 rounded-full shadow-lg"
                                title="Back to Home"
                            >
                                <MdHome size={24} />
                            </button>
                        </div>
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