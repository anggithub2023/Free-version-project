import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdEditNote, MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaChartBar, FaBrain } from 'react-icons/fa';
import useAnonymousUser from '../hooks/useAnonymousUser';
import { ensureUserExists } from '../services/syncService';

function HomePage() {
    const navigate = useNavigate();
    const userId = useAnonymousUser();
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Apply saved theme or detect system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const appliedTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(appliedTheme);
        document.documentElement.classList.toggle('dark', appliedTheme === 'dark');
    }, []);

    useEffect(() => {
        if (userId) {
            ensureUserExists(userId).catch((err) => {
                console.error('Failed to ensure user exists:', err.message);
            });
        }
    }, [userId]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const cards = [
        {
            icon: <MdEditNote size={28} />, title: 'Reflect', description: 'Start your mental prep',
        },
        {
            icon: <FaBrain size={28} />, title: 'Mindset', description: 'Log your readiness',
        },
        {
            icon: <FaChartBar size={28} />, title: 'Track', description: 'Monitor your performance',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
            {/* Dark Mode Toggle */}
            <button
                onClick={toggleTheme}
                className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-110 transition"
                title="Toggle Theme"
            >
                {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
            </button>

            {/* Hero */}
            <section className="text-center py-16 px-4">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Unlock Your Process</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                    This is your reflection hub. Track your mindset, performance, and goals.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-xl shadow-lg animate-pulse hover:bg-indigo-500"
                >
                    Start Reflection
                </button>
            </section>

            {/* Cards */}
            <section className="px-4 pb-12 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {cards.map((card, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigate('/dashboard')}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
                        >
                            <div className="mb-3 text-indigo-600 dark:text-indigo-400">{card.icon}</div>
                            <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{card.description}</p>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HomePage;