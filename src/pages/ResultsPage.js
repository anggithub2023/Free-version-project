import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ResultsPage() {
    const [latestScore, setLatestScore] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const passedScore = location.state?.total;

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('processHistory')) || [];
        const last = history.length ? history[history.length - 1] : null;

        if (passedScore !== undefined) {
            const newEntry = {
                timestamp: Date.now(),
                total: passedScore,
                offense: 0,
                defense: 0,
                teamIdentity: 0
            };

            // Save to localStorage
            localStorage.setItem('processHistory', JSON.stringify([...history, newEntry]));
            setLatestScore(newEntry);
        } else if (last) {
            setLatestScore(last);
        }

        setLoading(false);
    }, [passedScore]);

    const exportToCSV = () => {
        const history = JSON.parse(localStorage.getItem('processHistory')) || [];
        const csvContent = [
            ['Date', 'Total', 'Offense', 'Defense', 'Team Identity'].join(',')
        ].concat(
            history.map(entry => [
                new Date(entry.timestamp || Date.now()).toLocaleDateString(),
                `${entry.total}%`,
                `${entry.offense}%`,
                `${entry.defense}%`,
                `${entry.teamIdentity}%`
            ].join(','))
        ).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'reflection_scores.csv';
        link.click();
    };

    if (loading) {
        return <div className="text-center p-4 text-gray-600">Loading latest results...</div>;
    }

    if (!latestScore) {
        return <div className="text-center p-4 text-gray-600">No results available.</div>;
    }

    return (
        <div className="max-w-xl mx-auto text-center p-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Great Job Reflecting</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4">Champions do the little things.</p>
            <strong className="text-lg">Total Score: {latestScore.total}%</strong>

            <div className="mt-4 text-left">
                <div><strong>Offense:</strong> {latestScore.offense}%</div>
                <div><strong>Defense:</strong> {latestScore.defense}%</div>
                <div><strong>Team Identity & Culture:</strong> {latestScore.teamIdentity}%</div>
            </div>

            <div className="mt-6 text-base font-semibold">
                {latestScore.total >= 90
                    ? '🔥 Elite Focus!'
                    : latestScore.total >= 75
                        ? '💪 Locked in — just a few details!'
                        : '⏳ Great opportunity to grow.'}
            </div>

            <div className="mt-6 flex justify-between gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500"
                >
                    Back to Home
                </button>
                <button
                    onClick={exportToCSV}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-500"
                >
                    Export CSV
                </button>
            </div>
        </div>
    );
}

export default ResultsPage;