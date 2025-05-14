import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAnonymousUser from '../hooks/useAnonymousUser';
import { ensureUserExists } from '../services/syncService';
<img src="/assets/brain_only_colored.svg" alt="Brain" className="w-24 mx-auto" />

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
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black text-black dark:text-white px-6 py-8 font-sans">
            {/* Header */}
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => navigate('/personalize')}
                    className="text-xs sm:text-sm font-medium px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    Personalize your journey
                </button>
            </div>

            {/* Brain & Buttons Section */}
            <main className="flex-grow flex flex-col items-center justify-center gap-8">
                <img
                    src="/assets/brain_only_colored.svg"
                    alt="Brain Diagram"
                    className="w-24 sm:w-32 mb-2 animate-fade-in"
                />

                <div className="flex flex-col sm:flex-row gap-6">
                    <button
                        onClick={() => navigate('/process')}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-xl shadow w-56 text-center"
                    >
                        Own Your Process
                    </button>

                    <button
                        onClick={() => navigate('/reflect')}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow w-56 text-center"
                    >
                        Reflect on Performance
                    </button>
                </div>

                <div className="flex justify-center gap-6 text-sm text-gray-500 mt-6">
                    <button onClick={() => navigate('/dashboard')} className="hover:text-blue-500">
                        Skip for now →
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center text-[10px] text-gray-500 dark:text-gray-400 mt-8">
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