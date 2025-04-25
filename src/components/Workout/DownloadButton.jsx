import React from 'react';

const DownloadButton = ({ workouts }) => {
    const downloadCSV = () => {
        if (!workouts.length) return;

        const header = Object.keys(workouts[0]);
        const csvRows = [
            header.join(','),
            ...workouts.map(w => header.map(field => `"${w[field] || ''}"`).join(','))
        ];

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'my_workouts.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={downloadCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow text-sm font-semibold"
        >
            📥 Download CSV
        </button>
    );
};

export default DownloadButton;