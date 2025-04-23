import React from 'react';

function DownloadButton({ gameStats, history, calculateAverage }) {
    const handleDownload = () => {
        const csvContent = [
            ['Date', 'PTS', 'AST', 'REB', 'STL', 'TOV', 'FT', 'MIN'],
            ...gameStats.map(gs => [
                new Date(gs.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: '2-digit' }),
                gs.points, gs.assists, gs.rebounds, gs.steals, gs.turnovers, gs.freeThrows, gs.minutes
            ]),
            [],
            ['Averages', calculateAverage('points'), calculateAverage('assists'), calculateAverage('rebounds'), calculateAverage('steals'), calculateAverage('turnovers'), calculateAverage('freeThrows'), calculateAverage('minutes')],
            [],
            ['Reflection Scores'],
            ...history.map(entry => [new Date(entry.timestamp).toLocaleDateString(), `${entry.total}%`])
        ].map(row => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "player_stats.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleDownload}
            className="w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500"
        >
            Download Player Stats (CSV)
        </button>
    );
}

export default DownloadButton;
