// src/components/AppShell.jsx
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import DebugPanel from './DebugPanel';

export default function AppShell({ children }) {
    const [showDebug, setShowDebug] = useState(false);

    useEffect(() => {
        // Check URL param
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('debug') === 'true') {
            setShowDebug(true);
        }

        // Keyboard shortcut: Shift + ~
        const handleKeyDown = (e) => {
            if (e.shiftKey && e.key === '~') {
                setShowDebug(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="relative min-h-screen font-sans bg-white dark:bg-gray-900">
            <main className="min-h-screen">{children || <Outlet />}</main>
            {showDebug && (
                <div className="fixed bottom-0 left-0 right-0 z-50">
                    <DebugPanel />
                </div>
            )}
        </div>
    );
}