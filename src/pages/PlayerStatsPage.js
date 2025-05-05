import React, { useState } from 'react';
import ReflectionStartFlow from '../components/PlayerStats/ReflectionStartFlow';
import PositionSelectionModal from '../components/PlayerStats/PositionSelectionModal';
import DynamicStatForm from '../components/PlayerStats/DynamicStatForm';
import ClearConfirmModal from '../components/PlayerStats/ClearConfirmModal';

function PlayerStatsPage() {
    const [selectedSport, setSelectedSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [selectedPosition, setSelectedPosition] = useState(() => localStorage.getItem('selectedPosition') || '');

    const sportsWithPositions = ['soccer', 'football', 'baseball', 'iceHockey', 'lacrosse'];

    const handleClearStats = () => {
        setGameStats([]);
        localStorage.removeItem('gameStats');
        setShowClearModal(false);
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
                onRequestClear={() => setShowClearModal(true)}
            />

            {showClearModal && (
                <ClearConfirmModal
                    message="Are you sure you want to clear all player stats?"
                    onConfirm={handleClearStats}
                    onCancel={() => setShowClearModal(false)}
                />
            )}
        </div>
    );
}

export default PlayerStatsPage;