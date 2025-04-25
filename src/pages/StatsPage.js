import React, { useState, useEffect } from 'react';
import StatForm from '../components/StatForm';
import StatsTable from '../components/StatsTable';
import DownloadButton from '../components/DownloadButton';
import ConfirmModal from '../components/ConfirmModal';

function StatsPage() {
    const [gameStats, setGameStats] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const savedStats = JSON.parse(localStorage.getItem('gameStats')) || [];
        setGameStats(savedStats);
    }, []);

    const handleAddStat = (newStat) => {
        const updatedStats = [...gameStats, newStat];
        setGameStats(updatedStats);
        localStorage.setItem('gameStats', JSON.stringify(updatedStats));
    };

    const handleClearStats = () => {
        setGameStats([]);
        localStorage.removeItem('gameStats');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">📈 Game Stats Tracker</h1>

            <div className="mb-8">
                <StatForm onAddStat={handleAddStat} />
            </div>

            <div className="mb-8">
                <StatsTable stats={gameStats} />
            </div>

            <div className="flex justify-center space-x-4">
                <DownloadButton stats={gameStats} />
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full shadow"
                >
                    Clear Stats
                </button>
            </div>

            {showModal && (
                <ConfirmModal
                    message="Are you sure you want to clear all game stats?"
                    onConfirm={handleClearStats}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default StatsPage;