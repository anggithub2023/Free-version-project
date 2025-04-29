import React, { useState, useEffect } from 'react';
import ReflectionStartFlow from '../components/PlayerStats/ReflectionStartFlow';
import PositionSelectionModal from '../components/PlayerStats/PositionSelectionModal';
import DynamicStatForm from '../components/PlayerStats/DynamicStatForm';
import ConfirmModal from '../components/ConfirmModal';
import { MdDownload, MdDelete, MdHome, MdMenu, MdInsights } from 'react-icons/md';

function PlayerStatsPage() {
    const [selectedSport, setSelectedSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [selectedPosition, setSelectedPosition] = useState(() => localStorage.getItem('selectedPosition') || '');
    const [gameStats, setGameStats] = useState([]);
    const [showClearModal, setShowClearModal] = useState(false);
    const [showFAB, setShowFAB] = useState(false);

    const sportsWithPositions = ['soccer', 'football', 'baseball', 'iceHockey', 'lacrosse'];

    useEffect(() => {
        const savedStats = JSON.parse(localStorage.getItem('gameStats')) || [];
        setGameStats(savedStats);
    }, []);

    const handleSaveStat = (statEntry) => {
        const updatedStats = [...gameStats, statEntry];
        setGameStats(updatedStats);
        localStorage.setItem('gameStats', JSON.stringify(updatedStats));
    };

    const handleClearStats = () => {
        setGameStats([]);
        localStorage.removeItem('gameStats');
        setShowClearModal(false);
    };

    const handleDownloadStats = () => {
        const csvContent = [
            ['Date', 'Sport', 'Position', 'Stat', 'Value'],
            ...gameStats.flatMap(({ date, sport, position, stats }) =>
                Object.entries(stats).map(([statName, statValue]) => [
                    new Date(date).toLocaleDateString(),
                    sport,
                    position,
                    statName,
                    statValue
                ])
            )
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'player_stats.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleGoHome = () => {
        localStorage.removeItem('selectedSport');
        localStorage.removeItem('selectedPosition');
        localStorage.removeItem('gameStats');
        window.location.href = '/';
    };

    if (!selectedSport) {
        return <ReflectionStartFlow onSelect={(sport) => {
            setSelectedSport(sport);
            localStorage.setItem('selectedSport', sport);
        }} buttonLabel="Start Stats" />;
    }

    if (sportsWithPositions.includes(selectedSport) && !selectedPosition) {
        return <PositionSelectionModal onSelect={(position) => {
            const normalizedPosition = position.toLowerCase().replace(/\s+/g, '-');
            setSelectedPosition(normalizedPosition);
            localStorage.setItem('selectedPosition', normalizedPosition);
        }} sport={selectedSport} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 pb-24">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-green-700 dark:text-green-300">
                📈 Player Stats - {selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)}
            </h1>

            <DynamicStatForm
                sport={selectedSport}
                position={selectedPosition}
                onSaveStat={handleSaveStat}
            />

            {/* Floating FAB group */}
            <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-3 z-50">
                {showFAB && (
                    <>
                        <button
                            onClick={() => window.location.href = '/analytics'}
                            className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-full shadow-lg"
                            title="📊 View Analytics"
                        >
                            <MdInsights size={24} />
                        </button>
                        <button
                            onClick={handleDownloadStats}
                            className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg"
                            title="📅 Download CSV"
                        >
                            <MdDownload size={24} />
                        </button>
                        <button
                            onClick={() => setShowClearModal(true)}
                            className="bg-yellow-600 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg"
                            title="❌ Clear Stats"
                        >
                            <MdDelete size={24} />
                        </button>
                        <button
                            onClick={handleGoHome}
                            className="bg-gray-600 hover:bg-gray-500 text-white p-3 rounded-full shadow-lg"
                            title="🏠 Back to Home"
                        >
                            <MdHome size={24} />
                        </button>
                    </>
                )}
                <button
                    onClick={() => setShowFAB(!showFAB)}
                    className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-xl"
                    title="☰ Menu"
                >
                    <MdMenu size={28} />
                </button>
            </div>

            {showClearModal && (
                <ConfirmModal
                    message="Are you sure you want to clear all player stats?"
                    onConfirm={handleClearStats}
                    onCancel={() => setShowClearModal(false)}
                />
            )}
        </div>
    );
}

export default PlayerStatsPage;