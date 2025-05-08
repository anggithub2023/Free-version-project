import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AppShell() {
    const [showDebug, setShowDebug] = useState(false);

    useEffect(() => {
        const toggleDebug = (e) => {
            if (e.key === '`' || e.key === '~') {
                setShowDebug(prev => !prev);
            }
        };
        window.addEventListener('keydown', toggleDebug);
        return () => window.removeEventListener('keydown', toggleDebug);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white font-sans">
            <Navbar />
            <main className="flex-1 px-4 md:px-8 py-4">
                <Outlet />
            </main>
            <Footer />

            {import.meta.env.MODE === 'development' && showDebug && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '1rem',
                        right: '1rem',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        color: '#fff',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        maxWidth: '400px',
                        fontSize: '0.85rem',
                        zIndex: 9999,
                        overflowY: 'auto',
                        maxHeight: '50vh',
                    }}
                >
                    <h2 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🛠 Debug Panel</h2>
                    <button
                        onClick={async () => {
                            const { data: { user }, error } = await window.supabase.auth.getUser();
                            console.log("👤 Supabase User:", user);
                        }}
                        style={{
                            background: '#2563eb',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            color: '#fff',
                            borderRadius: '0.25rem',
                            marginBottom: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        Log Supabase User
                    </button>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
{`📌 team_id: ${localStorage.getItem('team_id') || 'null'}
🗂️ user_profile: ${localStorage.getItem('user_profile') || 'null'}
`}
                    </pre>
                </div>
            )}
        </div>
    );
}