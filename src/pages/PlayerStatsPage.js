import React, { useState, useEffect } from 'react';
import ReflectionStartFlow from '../components/PlayerStats/ReflectionStartFlow';
import PositionSelectionModal from '../components/PlayerStats/PositionSelectionModal';
import DynamicStatForm from '../components/PlayerStats/DynamicStatForm';

function PlayerStatsPage() {
    const [selectedSport, setSelectedSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [selectedPosition, setSelectedPosition] = useState(() => localStorage.getItem('selectedPosition') || '');
    const [gameStats, setGameStats] = useState([]);

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

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={handleDownloadStats}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg"
                >
                    📅 Download CSV
                </button>

                <button
                    onClick={() => {
                        localStorage.removeItem('selectedSport');
                        localStorage.removeItem('selectedPosition');
                        localStorage.removeItem('gameStats');
                        window.location.href = '/';
                    }}
                    className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg"
                >
                    🏠 Back to Home
                </button>
            </div>
        </div>
    );
}

export default PlayerStatsPage;