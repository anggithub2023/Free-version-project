import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaLightbulb, FaSyncAlt } from 'react-icons/fa';
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
        <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
            {/* Hero Section */}
            <div className="text-center pt-16 pb-10 px-4">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-indigo-700 dark:text-indigo-300">
                    Processwins.app
                </h1>
                <p className="text-lg sm:text-xl font-medium mt-2">
                    Reflect on your performance<br />Unlock your potential
                </p>
                <button
                    onClick={() => navigate('/reflect')}
                    className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-semibold animate-pulse shadow-lg"
                >
                    Start Reflection
                </button>
            </div>

            {/* Feature Cards */}
            <div className="flex flex-wrap justify-center items-center gap-6 px-4 sm:px-8 py-10">
                <Card icon={<FaChartLine size={40} />} label="Track" navigate={() => navigate('/dashboard')} />
                <Card icon={<FaLightbulb size={40} />} label="Insight" navigate={() => navigate('/dashboard')} />
                <Card icon={<FaSyncAlt size={40} />} label="Consistency" navigate={() => navigate('/dashboard')} />
            </div>

            {/* Footer */}
            <footer className="text-xs text-center text-gray-500 dark:text-gray-400 py-6 px-4">
                © {new Date().getFullYear()} Process Reflection™ — processwins.app. All rights reserved.<br />
                This platform, concept, design, and workflow are the original intellectual property of the creator.
            </footer>
        </div>
    );
}

function Card({ icon, label, navigate }) {
    return (
        <div
            onClick={navigate}
            className="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col items-center justify-center text-center hover:shadow-xl transition duration-300"
        >
            <div className="mb-2 text-indigo-600 dark:text-indigo-400">{icon}</div>
            <h3 className="text-lg font-semibold tracking-tight">{label}</h3>
        </div>
    );
}
