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
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black text-black dark:text-white px-6 py-10 font-sans">
            {/* CTA */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate('/personalize')}
                    className="text-xs sm:text-sm font-medium px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    Personalize your journey
                </button>
            </div>

            {/* Readiness section */}
            <div className="text-center mb-10">
                <button
                    onClick={() => navigate('/readiness')}
                    className="text-red-500 text-lg sm:text-xl font-semibold border-2 border-black px-6 py-2 rounded-xl bg-white dark:bg-gray-900 shadow-md hover:scale-105 transition"
                >
                    readiness
                </button>
            </div>

            {/* Center image and arrows */}
            <div className="relative flex justify-center items-center mb-10 h-48">
                <img
                    src="/assets/brain_only_colored.svg"
                    alt="Brain"
                    className="w-24 sm:w-28 z-10"
                />

                {/* SVG arrows */}
                <svg className="absolute left-0 top-1/2 transform -translate-y-1/2" width="100" height="100">
                    <path d="M90,10 Q10,50 60,90" stroke="black" strokeWidth="2" fill="transparent" />
                </svg>
                <svg className="absolute right-0 top-1/2 transform -translate-y-1/2" width="100" height="100">
                    <path d="M10,10 Q90,50 40,90" stroke="black" strokeWidth="2" fill="transparent" />
                </svg>
            </div>

            {/* Bottom row buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
                <button
                    onClick={() => navigate('/process')}
                    className="text-red-500 text-sm sm:text-base font-semibold border-2 border-black px-6 py-3 rounded-xl bg-white dark:bg-gray-900 shadow-md hover:scale-105 transition"
                >
                    Own your process
                </button>
                <button
                    onClick={() => navigate('/reflect')}
                    className="text-red-500 text-sm sm:text-base font-semibold border-2 border-black px-6 py-3 rounded-xl bg-white dark:bg-gray-900 shadow-md hover:scale-105 transition"
                >
                    reflection
                </button>
            </div>

            {/* Footer */}
            <footer className="text-center text-[10px] text-gray-500 dark:text-gray-400 mt-auto">
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