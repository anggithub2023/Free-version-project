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
        <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white px-6 py-10 font-poppins relative overflow-hidden">
            {/* Personalize CTA */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate('/personalize')}
                    className="text-xs sm:text-sm font-medium px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    Personalize your journey
                </button>
            </div>

            {/* Readiness Section */}
            <div className="flex justify-center z-10 relative">
                <button
                    onClick={() => navigate('/readiness')}
                    className="bg-white dark:bg-gray-800 border-2 border-black text-red-500 px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
                >
                    Readiness
                </button>
            </div>

            {/* Brain Image */}
            <div className="flex justify-center my-8 relative z-0">
                <img
                    src="/assets/brain_only_colored.svg"
                    alt="Brain"
                    className="w-32 h-32 object-contain z-10"
                />

                {/* SVG Arrows */}
                <svg className="absolute left-[20%] -top-8 rotate-[15deg]" width="120" height="120">
                    <path
                        d="M100,10 Q10,60 90,110"
                        stroke="black"
                        strokeWidth="2"
                        fill="transparent"
                        markerEnd="url(#arrowhead)"
                    />
                </svg>

                <svg className="absolute right-[20%] -top-8 rotate-[-15deg]" width="120" height="120">
                    <path
                        d="M20,10 Q110,60 30,110"
                        stroke="black"
                        strokeWidth="2"
                        fill="transparent"
                        markerEnd="url(#arrowhead)"
                    />
                </svg>
            </div>

            {/* Lower Buttons */}
            <div className="flex justify-center gap-6 z-10">
                <button
                    onClick={() => navigate('/process')}
                    className="bg-white dark:bg-gray-800 border-2 border-black text-blue-600 px-5 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
                >
                    Own Your Process
                </button>

                <button
                    onClick={() => navigate('/reflect')}
                    className="bg-white dark:bg-gray-800 border-2 border-black text-indigo-600 px-5 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
                >
                    Reflect on Performance
                </button>
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