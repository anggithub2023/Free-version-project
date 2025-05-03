import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEditNote, MdLeaderboard, MdAccessTime } from 'react-icons/md';
import useAnonymousUser from '../hooks/useAnonymousUser';

const cards = [
    {
        icon: <MdOutlineEditNote className="text-indigo-500 text-3xl" />,
        title: 'Reflect Now',
        description: 'Capture your thoughts and track progress daily.',
        route: '/reflect',
    },
    {
        icon: <MdLeaderboard className="text-purple-500 text-3xl" />,
        title: 'Analytics',
        description: 'View trends and insights over time.',
        route: '/analytics',
    },
    {
        icon: <MdAccessTime className="text-teal-500 text-3xl" />,
        title: 'History',
        description: 'Look back on all your reflections.',
        route: '/dashboard',
    },
];

export default function HomePage() {
    const navigate = useNavigate();
    useAnonymousUser();

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-300 uppercase tracking-wide mb-4">
                    processwins.app
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-left leading-tight text-gray-900 dark:text-white">
                    Reflect on<br />Your<br />Performance
                </h1>

                <p className="mt-4 text-md sm:text-lg font-medium text-left text-gray-600 dark:text-gray-300">
                    A process-based approach to performance and development.
                </p>

                <div className="mt-10 flex flex-nowrap gap-4 overflow-x-auto sm:overflow-visible sm:flex-row">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(card.route)}
                            className="cursor-pointer min-w-[250px] sm:min-w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col items-start gap-3"
                        >
                            {card.icon}
                            <h3 className="text-lg font-semibold">{card.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <button
                        onClick={() => navigate('/reflect')}
                        className="px-6 py-3 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-full animate-pulse shadow-md"
                    >
                        Start Reflection
                    </button>
                </div>
            </div>
        </div>
    );
}
