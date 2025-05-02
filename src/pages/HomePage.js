import { useNavigate } from 'react-router-dom';

export default function HomepageLayout() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
            <div className="max-w-5xl mx-auto px-4 py-16">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
                        Welcome to Process Reflection
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Enhance performance and growth through focused self-reflection.
                    </p>
                    <button
                        onClick={() => navigate('/reflection')}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-semibold py-3 px-8 rounded-xl shadow-md transition"
                    >
                        Start Your Reflection
                    </button>
                </div>

                <div className="mt-20 grid gap-12 md:grid-cols-3 text-center">
                    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
                        <h3 className="text-xl font-semibold mb-2">Track</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Log detailed reflections and performance stats after every session.
                        </p>
                    </div>
                    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
                        <h3 className="text-xl font-semibold mb-2">Analyze</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            View analytics and trends to identify strengths and growth areas.
                        </p>
                    </div>
                    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
                        <h3 className="text-xl font-semibold mb-2">Improve</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Use data-driven insights to adjust training and mindset.
                        </p>
                    </div>
                </div>

                <footer className="mt-24 text-center text-sm text-gray-500 dark:text-gray-400">
                    © 2025 <span className="font-medium">processwins.app</span>. All rights reserved.<br />
                    This platform, concept, design, and workflow are the original intellectual property of the creator.
                </footer>
            </div>
        </div>
    );
}
