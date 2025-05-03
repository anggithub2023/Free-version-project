import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaLightbulb, FaRegCalendarCheck } from 'react-icons/fa';
import useAnonymousUser from '../hooks/useAnonymousUser';

function HomePage() {
    const navigate = useNavigate();
    useAnonymousUser();

    const cards = [
        {
            title: 'Track',
            icon: <FaChartBar className="text-white text-3xl" />,
            color: 'bg-indigo-600',
            route: '/dashboard',
        },
        {
            title: 'Insights',
            icon: <FaLightbulb className="text-white text-3xl" />,
            color: 'bg-purple-600',
            route: '/dashboard',
        },
        {
            title: 'Consistency',
            icon: <FaRegCalendarCheck className="text-white text-3xl" />,
            color: 'bg-emerald-600',
            route: '/dashboard',
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-8">
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">processwins.app</p>

                <div className="text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                        Reflect on<br />Your<br />Performance
                    </h1>
                    <p className="text-base mt-2 text-gray-600 dark:text-gray-300">
                        A focused environment for clarity, reflection, and growth.
                    </p>
                </div>

                <div className="w-full flex justify-start">
                    <button
                        onClick={() => navigate('/reflect')}
                        className="animate-pulse bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-indigo-700 transition"
                    >
                        Start Reflection
                    </button>
                </div>

                <div className="flex flex-wrap justify-start gap-4 mt-6">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            onClick={() => navigate(card.route)}
                            className={`cursor-pointer w-36 h-36 rounded-2xl flex flex-col justify-center items-center ${card.color} hover:brightness-110 transition shadow-lg`}
                        >
                            {card.icon}
                            <span className="mt-2 text-lg font-semibold text-white">{card.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;