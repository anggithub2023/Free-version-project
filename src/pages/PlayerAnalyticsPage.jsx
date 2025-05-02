import { useEffect, useState } from 'react';
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

export default function PlayerAnalyticsPage() {
    const [gameStats, setGameStats] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [filteredStats, setFilteredStats] = useState([]);
    const [showFAB, setShowFAB] = useState(false);

    useEffect(() => {
        const loadStats = async () => {
            let stats;
            try {
                stats = await fetchGameStats();
            } catch {
                stats = JSON.parse(localStorage.getItem('gameStats') || '[]');
            }

            setGameStats(stats);
            const latest = stats[stats.length - 1];
            const sport = latest?.sport || localStorage.getItem('selectedSport');
            const position = latest?.position || localStorage.getItem('selectedPosition');

            if (sport) setSelectedSport(sport.toLowerCase().trim());
            if (position) setSelectedPosition(position.toLowerCase().trim());
        };

        loadStats();
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const filtered = gameStats.filter(
            stat =>
                stat.user_id === userId &&
                stat.sport?.toLowerCase().trim() === selectedSport &&
                stat.position?.toLowerCase().trim() === selectedPosition
        );
        setFilteredStats(filtered);
    }, [gameStats, selectedSport, selectedPosition]);

    const availableSports = Array.from(new Set(
        gameStats.map(stat => stat.sport?.toLowerCase().trim()).filter(Boolean)
    ));

    const handleGoHome = () => {
        localStorage.removeItem('selectedSport');
        localStorage.removeItem('selectedPosition');
        window.location.href = '/';
    };

    const handleDownloadStats = () => {
        const csvContent = [
            ['Date', 'Sport', 'Position', 'Stat', 'Value'],
            ...filteredStats.flatMap(({ date, sport, position, stats }) =>
                Object.entries(stats).map(([stat, val]) => [
                    new Date(date).toLocaleDateString(),
                    sport,
                    position,
                    stat,
                    val
                ])
            )
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', 'player_stats.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <div className="flex justify-center items-center gap-3">
                        <GiAchievement className="text-4xl text-green-500" />
                        <h1 className="text-3xl sm:text-4xl font-bold">Player Performance Center</h1>
                    </div>
                    <p className="mt-2 text-gray-500 text-sm sm:text-base">
                        Monitor trends, track progress, and unlock your game insights.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <select
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value.toLowerCase().trim())}
                        className="w-full sm:w-64 p-3 rounded-lg border"
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
                        <div className="p-6 rounded-2xl shadow-lg bg-white">
                            <PanelHeader icon={<MdBarChart />} title="Averages" subtitle="Per-game performance" />
                            <AveragesPanel filteredStats={filteredStats} />
                        </div>
                        <div className="p-6 rounded-2xl shadow-lg bg-white">
                            <PanelHeader icon={<MdTimeline />} title="Progress Bars" subtitle="Goal proximity" />
                            <ProgressBarsPanel filteredStats={filteredStats} />
                        </div>
                        <div className="p-6 rounded-2xl shadow-lg bg-white">
                            <PanelHeader icon={<MdShowChart />} title="Stat Trends" subtitle="Changes over time" />
                            <StatsGraphs filteredStats={filteredStats} />
                        </div>
                        <div className="p-6 rounded-2xl shadow-lg bg-white">
                            <PanelHeader icon={<MdHistory />} title="Stat History" subtitle="Full stat log" />
                            <StatsHistoryTable filteredStats={filteredStats} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-12 text-gray-500">
                        {selectedSport ? 'No stats found.' : 'Please select a sport to view analytics.'}
                    </div>
                )}
            </div>

            <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-3 z-50">
                {showFAB && (
                    <>
                        <button
                            onClick={handleDownloadStats}
                            className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
                        >
                            <MdFileDownload size={24} />
                        </button>
                        <button
                            onClick={handleGoHome}
                            className="bg-gray-600 text-white p-3 rounded-full shadow-lg"
                        >
                            <MdHome size={24} />
                        </button>
                    </>
                )}
                <button
                    onClick={() => setShowFAB(!showFAB)}
                    className="bg-green-600 text-white p-4 rounded-full shadow-xl"
                >
                    <MdMenu size={28} />
                </button>
            </div>
        </div>
    );
}