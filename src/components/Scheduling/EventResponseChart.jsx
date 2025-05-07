// src/components/Scheduling/EventResponseChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EventResponseChart({ rsvps = [] }) {
    const counts = { yes: 0, no: 0, maybe: 0 };

    rsvps.forEach((r) => {
        const resp = r.response?.toLowerCase();
        if (counts[resp] !== undefined) counts[resp]++;
    });

    const data = {
        labels: ['Yes', 'No', 'Maybe'],
        datasets: [
            {
                data: [counts.yes, counts.no, counts.maybe],
                backgroundColor: ['#22c55e', '#ef4444', '#facc15'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#374151',
                },
            },
        },
    };

    // ✅ Sorted list
    const sortedRsvps = [...rsvps].sort((a, b) => {
        const nameA = a.users?.full_name || a.anonymous_name || '';
        const nameB = b.users?.full_name || b.anonymous_name || '';
        return nameA.localeCompare(nameB);
    });

    return (
        <div className="w-full max-w-xs mx-auto space-y-6">
            <div>
                <h3 className="text-center text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">
                    RSVP Summary
                </h3>
                <Pie data={data} options={options} />
            </div>

            <div>
                <h4 className="text-center text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    Participants
                </h4>
                <ul className="text-sm text-center space-y-1">
                    {sortedRsvps.map((r, i) => {
                        const name = r.users?.full_name || r.anonymous_name || '🙈 Anonymous';
                        const response = r.response?.charAt(0).toUpperCase() + r.response?.slice(1);
                        return (
                            <li key={i} className="text-gray-700 dark:text-gray-300">
                                {name} — {response}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}