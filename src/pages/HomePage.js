import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAnonymousUser from '../hooks/useAnonymousUser';
import { ensureUserExists } from '../services/syncService';

export default function HomePage() {
    const navigate = useNavigate();
    const userId = useAnonymousUser();
    const [showIntroModal, setShowIntroModal] = useState(false);

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

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-start gap-10 mt-10 sm:mt-16">
                {/* Brain Image */}
                <img
                    src="/assets/brain_only_colored.svg"
                    alt="Brain Diagram"
                    className="w-24 sm:w-32 animate-fade-in"
                />

                {/* Process & Reflect Buttons */}
                <div className="flex flex-col sm:flex-row gap-8">
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

                {/* Links Below */}
                <div className="flex justify-center gap-6 text-sm text-gray-500">
                    <button onClick={() => setShowIntroModal(true)} className="hover:text-blue-500">
                        What is this?
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="hover:text-blue-500">
                        Skip for now →
                    </button>
                </div>
            </main>

            {/* Modal */}
            {showIntroModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg max-w-md w-full shadow-xl text-center">
                        <h3 className="text-xl font-bold mb-4">Welcome</h3>
                        <p className="text-sm leading-relaxed">
                            This isn’t just another sports app.<br />
                            It’s a tool to help you grow.<br />
                            Before you compete, own your habits.<br />
                            After you compete, reflect with purpose.<br />
                            Every time you show up with intention,<br />
                            you move closer to the athlete you’re becoming.
                        </p>
                        <button
                            onClick={() => setShowIntroModal(false)}
                            className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}