import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAnonymousUser from '../hooks/useAnonymousUser';

function HomePage() {
    const navigate = useNavigate();
    const userId = useAnonymousUser();

    useEffect(() => {
        if (userId) {
            console.log('✅ User ID initialized:', userId);
        }
    }, [userId]);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans">
            {/* Header */}
            <div className="w-full py-4 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                processwins.app
            </div>

            {/* Hero Section */}
            <div className="flex flex-col items-start px-6 sm:px-12 pt-4 pb-8 sm:pb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                    <span>Reflect on</span><br />
                    <span>Your</span><br />
                    <span>Performance</span>
                </h1>

                <button
                    onClick={() => navigate('/reflect')}
                    className="mt-6 px-8 py-4 text-lg font-bold text-white bg-indigo-600 dark:bg-indigo-500 rounded-xl shadow-md animate-pulse hover:scale-105 transition-transform"
                >
                    Start Reflection
                </button>
            </div>

            {/* Cards */}
            <div className="w-full px-4 sm:px-12 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        {
                            title: 'Track',
                            description: 'Stay consistent with your daily reflections.',
                            icon: '📈'
                        },
                        {
                            title: 'Insight',
                            description: 'Discover how mindset affects performance.',
                            icon: '💡'
                        },
                        {
                            title: 'Consistency',
                            description: 'Build the habit that separates elite players.',
                            icon: '🎯'
                        },
                    ].map((card, idx) => (
                        <div
                            key={idx}
                            onClick={() => navigate('/dashboard')}
                            className="cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
                        >
                            <div className="text-3xl mb-2">{card.icon}</div>
                            <h3 className="text-xl font-semibold mb-1">{card.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
