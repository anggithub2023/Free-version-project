import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdTrackChanges, MdInsights, MdRepeat } from 'react-icons/md';

export default function HomePage() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <MdTrackChanges className="text-indigo-600 text-3xl" />,
            title: 'Track',
            subtitle: 'Log what matters most',
        },
        {
            icon: <MdInsights className="text-indigo-600 text-3xl" />,
            title: 'Gain Insight',
            subtitle: 'Spot patterns and behaviors',
        },
        {
            icon: <MdRepeat className="text-indigo-600 text-3xl" />,
            title: 'Stay Consistent',
            subtitle: 'Build better habits over time',
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-start px-4 py-10">
            <header className="text-center mt-6">
                <h1 className="text-3xl font-bold text-black dark:text-white leading-snug">
                    Reflect on<br />your performance.
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-base">
                    Turn self-awareness into progress.
                </p>
            </header>

            <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-md">
                {features.map((feature, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow">
                        {feature.icon}
                        <h3 className="text-sm font-semibold text-black dark:text-white mt-2">{feature.title}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{feature.subtitle}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate('/reflect')}
                className="mt-10 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full text-lg shadow-lg animate-pulse"
            >
                Start Reflection
            </button>
        </div>
    );
}
