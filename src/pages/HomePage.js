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
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black text-black dark:text-white px-6 py-8 font-sans relative">
            {/* Top CTA */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={() => navigate('/personalize')}
                    className="text-xs sm:text-sm font-medium px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    Personalize your journey
                </button>
            </div>

            {/* Main diagram section */}
            <div className="relative flex flex-col items-center gap-10">
                {/* Readiness button */}
                <button
                    onClick={() => navigate('/readiness')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow w-56 text-center"
                >
                    Readiness
                </button>

                {/* Brain image and arrows */}
                <div className="relative w-full flex justify-center items-center py-8">
                    {/* SVG Arrows */}
                    <svg className="absolute left-1/4 -top-4" width="160" height="120" viewBox="0 0 100 100">
                        <path d="M90,10 Q10,50 60,90" stroke="black" strokeWidth="3" fill="transparent" markerEnd="url(#arrow)" />
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto-start-reverse">
                                <path d="M0,0 L0,10 L10,5 Z" fill="black" />
                            </marker>
                        </defs>
                    </svg>

                    <svg className="absolute right-1/4 -top-4" width="160" height="120" viewBox="0 0 100 100">
                        <path d="M10,10 Q90,50 40,90" stroke="black" strokeWidth="3" fill="transparent" markerEnd="url(#arrow2)" />
                        <defs>
                            <marker id="arrow2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto-start-reverse">
                                <path d="M0,0 L0,10 L10,5 Z" fill="black" />
                            </marker>
                        </defs>
                    </svg>

                    {/* Brain image */}
                    <img
                        src="/assets/brain_only_colored.svg"
                        alt="Brain Diagram"
                        className="w-24 sm:w-32 z-10"
                    />
                </div>

                {/* Button Row */}
                <div className="flex flex-col sm:flex-row gap-16">
                    {/* Own Process */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/process')}
                            className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-xl shadow w-56"
                        >
                            Start Process
                        </button>
                        <h2 className="text-xl sm:text-2xl font-extrabold mt-4">Own your process.</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Build intentional habits before you compete.
                        </p>
                    </div>

                    {/* Reflect */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/reflect')}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow w-56"
                        >
                            Start Reflection
                        </button>
                        <h2 className="text-xl sm:text-2xl font-extrabold mt-4">Reflect on your performance.</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Turn self-awareness into progress.
                        </p>
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
