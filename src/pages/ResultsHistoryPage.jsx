import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResultsHistoryPage() {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('processHistory')) || [];
        setHistory(storedHistory.reverse()); // newest first
    }, []);

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear all reflection history?')) {
            localStorage.removeItem('processHistory');
            setHistory([]);
        }
    };

    const exportToCSV = () => {
        if (!history.length) return;

        const csvContent = [
            ['Date', 'Total', 'Offense', 'Defense', 'Team Identity', 'Focus', 'Preparation', 'Execution'].join(',')
        ].concat(
            history.map(entry => [
                new Date(entry.timestamp || Date.now()).toLocaleDateString(),
                `${entry.total ?? ''}%`,
                `${entry.offense ?? ''}%`,
                `${entry.defense ?? ''}%`,
                `${entry.teamIdentity ?? ''}%`,
                `${entry.focus ?? ''}%`,
                `${entry.preparation ?? ''}%`,
                `${entry.execution ?? ''}%`
            ].join(','))
        ).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'reflection_history.csv';
        link.click();
    };

    if (!history.length) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold mb-4">No Reflection History Found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Reflection History 📈</h1>

            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Total</th>
                        <th className="border px-4 py-2">Offense</th>
                        <th className="border px-4 py-2">Defense</th>
                        <th className="border px-4 py-2">Team Identity</th>
                        <th className="border px-4 py-2">Focus</th>
                        <th className="border px-4 py-2">Preparation</th>
                        <th className="border px-4 py-2">Execution</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((entry, index) => (
                        <tr key={index} className="text-center hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="border px-4 py-2">{new Date(entry.timestamp || Date.now()).toLocaleDateString()}</td>
                            <td className="border px-4 py-2">{entry.total ?? '--'}%</td>
                            <td className="border px-4 py-2">{entry.offense ?? '--'}%</td>
                            <td className="border px-4 py-2">{entry.defense ?? '--'}%</td>
                            <td className="border px-4 py-2">{entry.teamIdentity ?? '--'}%</td>
                            <td className="border px-4 py-2">{entry.focus ?? '--'}%</td>
                            <td className="border px-4 py-2">{entry.preparation ?? '--'}%</td>
                            <td className="border px-4 py-2">{entry.execution ?? '--'}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => navigate('/')}
                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded"
                >
                    Back Home
                </button>
                <button
                    onClick={exportToCSV}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded"
                >
                    Export CSV
                </button>
                <button
                    onClick={clearHistory}
                    className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded"
                >
                    Clear History
                </button>
            </div>
        </div>
    );
}

export default ResultsHistoryPage;