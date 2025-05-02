import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black transition-colors">
            <header className="text-center pt-16 px-6">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Welcome to Process Reflection
                </h1>
                <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
                    A focused space to build self-awareness, track your journey, and elevate performance.
                </p>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="mt-8 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md animate-pulse hover:scale-105 transition"
                >
                    Start Reflection
                </button>
            </header>

            {/* Feature Cards */}
            <section className="mt-12 flex flex-row gap-4 justify-center px-4 flex-wrap">
                {['Track Progress', 'Daily Check-in', 'Game Analytics'].map((title, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate('/dashboard')}
                        className="w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition"
                    >
                        <img
                            src={`/card-img-${idx + 1}.jpg`}
                            alt={title}
                            className="rounded-xl mb-4 object-cover w-full h-36"
                        />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Click to view your reflection dashboard and review performance.
                        </p>
                    </div>
                ))}
            </section>

            <footer className="text-center text-xs text-gray-500 dark:text-gray-400 mt-16 mb-6 px-4">
                © 2025 Process Reflection™ — processwins.app. All rights reserved.
            </footer>
        </div>
    );
}

export default HomePage;