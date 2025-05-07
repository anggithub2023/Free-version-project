import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StickyCtaBar from './StickyCtaBar';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export default function AppShell({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const { profile } = useCurrentUserProfile(); // ✅ Load profile

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newMode);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans">
            <header className="flex flex-wrap justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 shadow-sm">
                <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">processwins.app</h1>

                <div className="flex items-center gap-4">
                    {profile && (
                        <div className="text-sm text-right">
                            <div className="font-semibold">{profile.full_name}</div>
                            <div className="text-xs text-indigo-500">{profile.is_coach ? 'Coach' : 'Player'}</div>
                        </div>
                    )}

                    {profile?.is_coach && (
                        <Link
                            to="/scheduling/coach"
                            className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                        >
                            Scheduling
                        </Link>
                    )}

                    <button
                        onClick={toggleDarkMode}
                        className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                    >
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </header>

            <main className="pb-20">{children}</main>

            <StickyCtaBar />
        </div>
    );
}