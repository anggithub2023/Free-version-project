import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EventResponseChart({ rsvpCounts = {} }) {
    const { yes = 0, no = 0, maybe = 0 } = rsvpCounts;

    const data = {
        labels: ['Yes', 'No', 'Maybe'],
        datasets: [
            {
                data: [yes, no, maybe],
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

    return (
        <div className="w-full max-w-xs mx-auto">
            <h3 className="text-center text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">
                RSVP Summary
            </h3>
            <Pie data={data} options={options} />
        </div>
    );
}
