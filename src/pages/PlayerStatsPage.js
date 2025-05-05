import React, { useState, useEffect } from 'react';
import ReflectionStartFlow from '../components/PlayerStats/ReflectionStartFlow';
import PositionSelectionModal from '../components/PlayerStats/PositionSelectionModal';
import DynamicStatForm from '../components/PlayerStats/DynamicStatForm';
import ConfirmModal from '../components/ConfirmModal';
import {
    MdFileDownload,
    MdDeleteForever,
    MdHome,
    MdInsights
} from 'react-icons/md';

function PlayerStatsPage() {
    const [selectedSport, setSelectedSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [selectedPosition, setSelectedPosition] = useState(() => localStorage.getItem('selectedPosition') || '');
    const [gameStats, setGameStats] = useState([]);
    const [showClearModal, setShowClearModal] = useState(false);

    const sportsWithPositions = ['soccer', 'football', 'baseball', 'iceHockey', 'lacrosse'];

    useEffect(() => {
        const savedStats = JSON.parse(localStorage.getItem('gameStats')) || [];
        setGameStats(savedStats);

        // Load Google Font
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }, []);

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
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 pb-32 font-['Inter']">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-green-700 dark:text-green-300">
                Track Your Performance
            </h1>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                Record detailed stats by sport and position
            </p>

            <DynamicStatForm sport={selectedSport} position={selectedPosition} />

            {showClearModal && (
                <ConfirmModal
                    message="Are you sure you want to clear all player stats?"
                    onConfirm={handleClearStats}
                    onCancel={() => setShowClearModal(false)}
                />
            )}

            {/* Sticky CTA bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-md px-4 py-3 flex justify-around items-center z-50">
                <button
                    onClick={handleDownloadStats}
                    className="flex flex-col items-center justify-center text-xs text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition-transform transform hover:scale-105"
                >
                    <MdFileDownload size={24} />
                    <span className="mt-1">Download</span>
                </button>
                <button
                    onClick={() => setShowClearModal(true)}
                    className="flex flex-col items-center justify-center text-xs text-gray-700 dark:text-gray-200 hover:text-yellow-600 transition-transform transform hover:scale-105"
                >
                    <MdDeleteForever size={24} />
                    <span className="mt-1">Clear</span>
                </button>
                <button
                    onClick={() => window.location.href = '/analytics'}
                    className="flex flex-col items-center justify-center text-xs text-gray-700 dark:text-gray-200 hover:text-purple-600 transition-transform transform hover:scale-105"
                >
                    <MdInsights size={24} />
                    <span className="mt-1">Insights</span>
                </button>
                <button
                    onClick={handleGoHome}
                    className="flex flex-col items-center justify-center text-xs text-gray-700 dark:text-gray-200 hover:text-red-600 transition-transform transform hover:scale-105"
                >
                    <MdHome size={24} />
                    <span className="mt-1">Home</span>
                </button>
            </div>
        </div>
    );
}

export default PlayerStatsPage;