// src/components/AppShell.jsx
import React from 'react';
import StickyCtaBar from './StickyCtaBar'; // Optional

export default function AppShell({ children }) {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans">
            {/* Add nav or global elements here */}
            <main>{children}</main>
            <StickyCtaBar />
        </div>
    );
}