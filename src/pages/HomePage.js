import { useNavigate } from 'react-router-dom';
import useAnonymousUser from '../hooks/useAnonymousUser';
import { ensureUserExists } from '../services/syncService';
import brainImage from '/assets/brain_only_colored.svg';

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
            {/* Header CTA */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate('/personalize')}
                    className="text-xs sm:text-sm font-medium px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    Personalize your journey
                </button>
            </div>

            {/* Brain image */}
            <div className="flex justify-center mb-6 animate-fade-up">
                <img
                    src={brainImage}
                    alt="Brain"
                    className="w-24 sm:w-28 md:w-32"
                />
            </div>

            {/* Dual CTA Boxes */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 items-stretch text-center animate-fade-up">
                <div className="flex-1 max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <h2 className="font-heading text-2xl font-bold mb-2">Own your process.</h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        Build intentional habits before you compete.
                    </p>
                    <button
                        onClick={() => navigate('/process')}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-xl shadow w-full"
                    >
                        Start Process
                    </button>
                </div>

                <div className="flex-1 max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <h2 className="font-heading text-2xl font-bold mb-2">Reflect on your performance.</h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        Turn self-awareness into progress.
                    </p>
                    <button
                        onClick={() => navigate('/reflect')}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl shadow w-full"
                    >
                        Start Reflection
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center text-[10px] text-gray-500 dark:text-gray-400 mt-10">
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