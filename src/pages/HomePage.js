import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
            <section className="flex flex-col items-center justify-center px-6 py-20 sm:py-32">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">
                    Reflect. Improve. Win.
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 max-w-md mb-8">
                    Built for athletes who want to grow through consistent self-reflection.
                </p>
                <Link
                    to="/reflection"
                    className="inline-block px-8 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition shadow-lg"
                >
                    Start Reflection
                </Link>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl mx-auto px-6 pb-24">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Why Reflection?</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Discover trends, track mindset shifts, and make intentional adjustments to your game. Reflection is your edge.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Visual Feedback</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        See your performance visualized over time to identify what’s working and what needs attention.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Privacy First</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Your reflections are securely stored and never shared. You control your data.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Mobile-Friendly</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Designed for quick check-ins whether you're in the locker room, on the bus, or at home.
                    </p>
                </div>
            </section>

            <footer className="text-center text-sm text-gray-500 dark:text-gray-600 pb-6">
                © 2025 processwins.app. All rights reserved. This platform, concept, design, and workflow are the original intellectual property of the creator.
            </footer>
        </main>
    );
}
