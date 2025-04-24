import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DownloadButton from '../components/DownloadButton';
import StatForm from '../components/StatForm';
import StatsTable from '../components/StatsTable';
import AveragesPanel from '../components/AveragesPanel';

function StatsPage() {
    const [gameStats, setGameStats] = useState([]);
    const [newStat, setNewStat] = useState({
        date: '', opponent: '', points: '', assists: '', rebounds: '', steals: '',
        turnovers: '', minutes: '', freeThrows: ''
    });
    const tableRef = useRef(null);
    const navigate = useNavigate();

    const defaultStat = {
        date: '', opponent: '', points: '', assists: '', rebounds: '', steals: '',
        turnovers: '', minutes: '', freeThrows: ''
    };

    // Load playerStats and draft
    useEffect(() => {
        try {
            const storedStats = JSON.parse(localStorage.getItem("playerStats")) || [];
            setGameStats(storedStats);

            const draft = JSON.parse(localStorage.getItem("newStatDraft"));
            if (draft) setNewStat(draft);
        } catch (err) {
            console.error("Failed to load player stats:", err);
        }
    }, []);

    // Save stat draft as user types
    useEffect(() => {
        localStorage.setItem("newStatDraft", JSON.stringify(newStat));
    }, [newStat]);

    // Scroll to table if new stat added
    useEffect(() => {
        if (tableRef.current && gameStats.length > 0) {
            tableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [gameStats.length]);

    const handleAddStat = () => {
        if (!window.confirm("Are you sure you want to clear this form and add the stat?")) return;

        const updatedStats = [...gameStats, newStat];
        setGameStats(updatedStats);
        setNewStat(defaultStat);
        localStorage.removeItem("newStatDraft");
        localStorage.setItem("playerStats", JSON.stringify(updatedStats));
    };

    const calculateAverage = (key) => {
        const values = gameStats.map(gs => parseFloat(gs[key])).filter(n => !isNaN(n));
        if (!values.length) return 0;
        const total = values.reduce((sum, val) => sum + val, 0);
        return +(total / values.length).toFixed(1);
    };

    // History used only for AveragesPanel reflection scores
    const history = JSON.parse(localStorage.getItem("processHistory")) || [];

    return (
        <div className="max-w-xl mx-auto text-left p-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-200 mb-6 tracking-tight text-center">
                Track greatness. Start logging your stats.
            </h2>

            <StatForm newStat={newStat} setNewStat={setNewStat} handleAddStat={handleAddStat} />

            {gameStats.length > 0 && (
                <div className="mt-6">
                    <StatsTable gameStats={gameStats} tableRef={tableRef} />
                </div>
            )}

            <AveragesPanel gameStats={gameStats} history={history} calculateAverage={calculateAverage} />

            <div className="mt-6 flex justify-between gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="w-1/2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
                >
                    Back Home
                </button>
                <div className="w-1/2">
                    <DownloadButton
                        gameStats={gameStats}
                        history={history}
                        calculateAverage={calculateAverage}
                    />
                </div>
            </div>
        </div>
    );
}

export default StatsPage;