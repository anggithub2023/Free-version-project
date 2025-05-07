// src/components/AppShell.jsx
import React, { useEffect, useState } from 'react';
import StickyCtaBar from './StickyCtaBar';

export default function AppShell({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Load preference from localStorage
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
            <header className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 shadow-sm">
                <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">processwins.app</h1>
                <button
                    onClick={toggleDarkMode}
                    className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>

            <main className="pb-20">{children}</main>

            <StickyCtaBar />
        </div>
    );
}