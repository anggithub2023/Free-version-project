import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaChartLine } from 'react-icons/fa';
import { MdInsights, MdKeyboardArrowDown } from 'react-icons/md';
import { BsCheckAll } from 'react-icons/bs';
import useAnonymousUser from '../hooks/useAnonymousUser';
import { ensureUserExists } from '../services/syncService';

export default function HomePage() {
    const navigate = useNavigate();
    const userId = useAnonymousUser();

    useEffect(() => {
        if (userId) {
            ensureUserExists(userId).catch((err) =>
                console.error('User sync failed:', err)
            );
        }
    }, [userId]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center text-center px-4 py-10">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-white">
                <FaCheckCircle className="text-black dark:text-white" />
                <span className="text-lg font-semibold">processwins.app</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold text-black dark:text-white leading-tight">
                Reflect on<br />your<br />performance.
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
                Turn self-awareness into progress.
            </p>

            {/* Start Button */}
            <button
                onClick={() => navigate('/reflect')}
                className="mt-8 px-8 py-4 text-lg font-semibold rounded-xl bg-black text-white dark:bg-white dark:text-black animate-pulse hover:scale-105 transition shadow-lg"
            >
                Start Reflection
            </button>

            {/* Down Arrow */}
            <MdKeyboardArrowDown className="mt-10 text-3xl text-gray-700 dark:text-gray-300 animate-bounce" />

            {/* Feature Cards */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <div
                    onClick={() => navigate('/dashboard')}
                    className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md cursor-pointer hover:scale-105 transition w-48"
                >
                    <FaChartLine className="mx-auto text-3xl text-black dark:text-white" />
                    <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white">Track Progress</p>
                </div>
                <div
                    onClick={() => navigate('/dashboard')}
                    className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md cursor-pointer hover:scale-105 transition w-48"
                >
                    <MdInsights className="mx-auto text-3xl text-black dark:text-white" />
                    <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white">Get Insights</p>
                </div>
                <div
                    onClick={() => navigate('/dashboard')}
                    className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md cursor-pointer hover:scale-105 transition w-48"
                >
                    <BsCheckAll className="mx-auto text-3xl text-black dark:text-white" />
                    <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white">Build Consistency</p>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400">
                © 2025 processwins.app
            </footer>
        </div>
    );
}
