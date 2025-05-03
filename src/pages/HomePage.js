import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEditNote, MdLeaderboard, MdAutoGraph } from 'react-icons/md';
import useAnonymousUser from '../hooks/useAnonymousUser';

export default function HomePage() {
    const navigate = useNavigate();
    useAnonymousUser();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-4 py-6">
            <div className="max-w-6xl mx-auto">
                {/* App Name */}
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-6">
                    processwins.app
                </div>

                {/* Hero Section */}
                <div className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-snug text-left">
                        Reflect on<br />Your<br />Performance
                    </h1>
                    <p className="mt-4 max-w-lg text-left text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        Build awareness. Improve consistency. Stay process focused.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Card 1 */}
                    <div
                        onClick={() => navigate('/dashboard')}
                        className="cursor-pointer bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
                    >
                        <MdOutlineEditNote className="text-indigo-600 dark:text-indigo-400 text-4xl mb-2" />
                        <h3 className="text-lg font-bold">Start Reflection</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Begin your daily check-in</p>
                    </div>

                    {/* Card 2 */}
                    <div
                        onClick={() => navigate('/dashboard')}
                        className="cursor-pointer bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
                    >
                        <MdLeaderboard className="text-green-600 dark:text-green-400 text-4xl mb-2" />
                        <h3 className="text-lg font-bold">Track Progress</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Monitor stats and growth</p>
                    </div>

                    {/* Card 3 */}
                    <div
                        onClick={() => navigate('/dashboard')}
                        className="cursor-pointer bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
                    >
                        <MdAutoGraph className="text-rose-600 dark:text-rose-400 text-4xl mb-2" />
                        <h3 className="text-lg font-bold">Stay Consistent</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Visualize your journey</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
