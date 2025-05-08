import React, { useEffect } from 'react';
import StickyCtaBar from './StickyCtaBar';

export default function AppShell({ children }) {
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans">
            <main className="pb-20">{children}</main>
            <StickyCtaBar />
        </div>
    );
}