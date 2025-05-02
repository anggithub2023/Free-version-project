// src/pages/HomePage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAnonymousUser from '../hooks/useAnonymousUser';
import { ensureUserExists } from '../services/syncService';

export default function HomePage() {
    const navigate = useNavigate();
    const userId = useAnonymousUser();

    useEffect(() => {
        if (userId) {
            ensureUserExists(userId).catch((err) => {
                console.error('Failed to ensure user exists:', err.message);
            });
        }
    }, [userId]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-10">
            <div className="text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 dark:text-indigo-300">Reflect Better</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                    Ground yourself before every session. Stay consistent. Let your process tell the story.
                </p>
                <button
                    onClick={() => navigate('/reflect')}
                    className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300"
                >
                    Begin Reflection
                </button>
            </div>

            <div className="mt-10 text-center">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm text-indigo-500 hover:underline"
                >
                    Go to Full Dashboard
                </button>
            </div>

            <footer className="absolute bottom-4 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Process Reflection™ — processwins.app
            </footer>
        </div>
    );
}
