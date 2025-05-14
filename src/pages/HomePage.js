import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAnonymousUser from '../hooks/useAnonymousUser';
import { ensureUserExists } from '../services/syncService';
import brainImage from '../assets/brain_only_colored.jpeg';

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
        <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white px-6 py-10 font-sans relative overflow-hidden">
            {/* Top CTA */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate('/personalize')}
                    className="text-xs sm:text-sm font-medium px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    Personalize your journey
                </button>
            </div>

            {/* Diagram Layout */}
            <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-8">
                {/* Top box */}
                <button
                    onClick={() => navigate('/readiness')}
                    className="text-red-500 border-2 border-black px-6 py-3 rounded-xl bg-white font-semibold shadow-md hover:scale-105 transition"
                >
                    readiness
                </button>

                {/* Arrows + brain image */}
                <div className="relative w-full h-40 flex justify-center items-center">
                    {/* SVG Arrows */}
                    <svg className="absolute left-1/4 top-0" width="100" height="100" viewBox="0 0 100 100">
                        <path d="M90,10 Q10,50 60,90" stroke="black" strokeWidth="2" fill="transparent" markerEnd="url(#arrow)" />
                    </svg>
                    <svg className="absolute right-1/4 top-0" width="100" height="100" viewBox="0 0 100 100">
                        <path d="M10,10 Q90,50 40,90" stroke="black" strokeWidth="2" fill="transparent" markerEnd="url(#arrow)" />
                    </svg>
                    {/* Brain */}
                    <img src={brainImage} alt="Brain" className="w-24 z-10" />
                </div>

                {/* Bottom Buttons */}
                <div className="flex justify-center gap-8">
                    <button
                        onClick={() => navigate('/process')}
                        className="text-red-500 border-2 border-black px-6 py-3 rounded-xl bg-white font-semibold shadow-md hover:scale-105 transition"
                    >
                        Own your process
                    </button>
                    <button
                        onClick={() => navigate('/reflect')}
                        className="text-red-500 border-2 border-black px-6 py-3 rounded-xl bg-white font-semibold shadow-md hover:scale-105 transition"
                    >
                        reflection
                    </button>
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
