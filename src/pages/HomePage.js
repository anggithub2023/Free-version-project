import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAnonymousUser from '../hooks/useAnonymousUser';
import { ensureUserExists } from '../services/syncService';

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
        <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white px-6 py-8 font-sans flex flex-col items-center">
            {/* Personalize CTA */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate('/personalize')}
                    className="text-xs sm:text-sm font-medium px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    Personalize your journey
                </button>
            </div>

            {/* Main Content Layout */}
            <div className="flex flex-col items-center w-full max-w-5xl">
                {/* Brain and Arrows */}
                <div className="relative mb-10">
                    {/* Arrows for Desktop Only */}
                    <svg
                        className="hidden sm:block absolute left-[-120px] top-10"
                        width="120" height="100" viewBox="0 0 100 100"
                    >
                        <path d="M90,10 Q10,50 60,90" stroke="black" strokeWidth="2" fill="none" />
                    </svg>
                    <svg
                        className="hidden sm:block absolute right-[-120px] top-10"
                        width="120" height="100" viewBox="0 0 100 100"
                    >
                        <path d="M10,10 Q90,50 40,90" stroke="black" strokeWidth="2" fill="none" />
                    </svg>

                    {/* Brain Image */}
                    <img
                        src="/assets/brain_only_colored.svg"
                        alt="Brain"
                        className="w-24 sm:w-32 mx-auto"
                    />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-x-16 items-center justify-center">
                    <div className="text-center">
                        <h2 className="font-heading text-2xl font-bold mb-2">Own Your Process</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Build intentional habits before you compete.
                        </p>
                        <button
                            onClick={() => navigate('/process')}
                            className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-5 rounded-xl shadow"
                        >
                            Start Process
                        </button>
                    </div>

                    <div className="text-center">
                        <h2 className="font-heading text-2xl font-bold mb-2">Reflect on Performance</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Turn self-awareness into progress.
                        </p>
                        <button
                            onClick={() => navigate('/reflect')}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-5 rounded-xl shadow"
                        >
                            Start Reflection
                        </button>
                    </div>
                </div>
            </div>

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
