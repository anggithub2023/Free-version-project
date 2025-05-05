import React, { useState, useEffect } from 'react';
import ReflectionStartFlow from '../components/PlayerStats/ReflectionStartFlow';
import PositionSelectionModal from '../components/PlayerStats/PositionSelectionModal';
import DynamicStatForm from '../components/PlayerStats/DynamicStatForm';
import ConfirmModal from '../components/ConfirmModal';
import StickyCtaBar from '../components/StickyCtaBar';

function PlayerStatsPage() {
    const [selectedSport, setSelectedSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [selectedPosition, setSelectedPosition] = useState(() => localStorage.getItem('selectedPosition') || '');
    const [gameStats, setGameStats] = useState([]);
    const [showClearModal, setShowClearModal] = useState(false);
    const [formActions, setFormActions] = useState({ submit: null, clear: null });

    const sportsWithPositions = ['soccer', 'football', 'baseball', 'iceHockey', 'lacrosse'];

    useEffect(() => {
        const savedStats = JSON.parse(localStorage.getItem('gameStats')) || [];
        setGameStats(savedStats);
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
        ].map(e => e.join(',')).join('\n');

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
        return (
            <ReflectionStartFlow
                onSelect={(sport) => {
                    setSelectedSport(sport);
                    localStorage.setItem('selectedSport', sport);
                }}
                buttonLabel="Start Stats"
            />
        );
    }

    if (sportsWithPositions.includes(selectedSport) && !selectedPosition) {
        return (
            <PositionSelectionModal
                onSelect={(position) => {
                    const normalizedPosition = position.toLowerCase().replace(/\s+/g, '-');
                    setSelectedPosition(normalizedPosition);
                    localStorage.setItem('selectedPosition', normalizedPosition);
                }}
                sport={selectedSport}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 pb-32 font-sans">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-green-700 dark:text-green-300">
                Track Your Performance
            </h1>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                Record detailed stats by sport and position
            </p>

            <DynamicStatForm
                sport={selectedSport}
                position={selectedPosition}
                registerActions={({ handleSubmit, handleClearForm }) =>
                    setFormActions({ submit: handleSubmit, clear: handleClearForm })
                }
            />

            {showClearModal && (
                <ConfirmModal
                    message="Are you sure you want to clear all player stats?"
                    onConfirm={() => {
                        handleClearStats();
                        formActions.clear?.();
                    }}
                    onCancel={() => setShowClearModal(false)}
                />
            )}

            <StickyCtaBar
                onDownload={handleDownloadStats}
                onClear={() => setShowClearModal(true)}
                onSubmit={() => formActions.submit?.()}
                onInsights={() => window.location.href = '/analytics'}
                onHome={handleGoHome}
            />
        </div>
    );
}

export default PlayerStatsPage;