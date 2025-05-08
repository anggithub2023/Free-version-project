import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GetStartedPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 p-6 text-gray-800 dark:text-white">
            <h1 className="text-3xl font-bold text-center mb-6">Ready To Get Started?</h1>

            <div className="max-w-md mx-auto space-y-4">
                <button
                    onClick={() => navigate('/create-team')}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition"
                >
                    Create New Team
                </button>
                <button
                    onClick={() => navigate('/join-team')}
                    className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-lg font-semibold transition"
                >
                    Join Existing Team
                </button>
            </div>
        </div>
    );
}