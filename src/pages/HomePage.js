import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAnonymousUser from '../hooks/useAnonymousUser';
import { ensureUserExists } from '../services/syncService';
import brainImage from '../assets/brain_only_colored.svg';

export default function HomePage() {
    const navigate = useNavigate();
    const userId = useAnonymousUser();

    useEffect(() => {
        if (userId) {
            ensureUserExists(userId).catch(err =>
                console.error('Failed to sync user:', err.message)
            );
        }
    }, [userId]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black text-black dark:text-white px-6 py-10 font-sans">
            {/* Header */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate('/personalize')}
                    className="text-xs sm:text-sm font-medium px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    Personalize your journey
                </button>
            </div>

            {/* Main Section with updated layout */}
            <main className="flex-grow flex flex-col items-center">
                {/* Top CTA */}
                <button
                    onClick={() => navigate('/readiness')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl shadow mb-6"
                >
                    Start Reflection
                </button>

                {/* Brain Image */}
                <img src={brainImage} alt="Brain" className="w-24 sm:w-28 mb-6" />

                {/* Process and Reflection Buttons Side by Side */}
                <div className="flex flex-col sm:flex-row gap-10">
                    {/* Start Process */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/process')}
                            className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-6 rounded-xl shadow mb-2"
                        >
                            Start Process
                        </button>
                        <h2 className="font-heading text-xl sm:text-2xl font-extrabold mb-1">Own your process.</h2>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-xs mx-auto">
                            Build intentional habits before you compete.
                        </p>
                    </div>

                    {/* Start Reflection */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/reflect')}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl shadow mb-2"
                        >
                            Start Reflection
                        </button>
                        <h2 className="font-heading text-xl sm:text-2xl font-extrabold mb-1">Reflect on your performance.</h2>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-xs mx-auto">
                            Turn self-awareness into progress.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center text-[10px] text-gray-500 dark:text-gray-400 mt-12">
                <p>© {new Date().getFullYear()} processwins.app</p>
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeopJAyVo6uA4CEKw0bVEbgTEDHwQr2S8Xev17D1KkUZcFDIQ/viewform?usp=dialog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-xs hover:text-pink-600 transition block mt-1"
                >
                    Feedback
                </a>
            </footer>
        </div>
    );
}
