import { useNavigate } from 'react-router-dom';

export default function StatsConfirmationModal({ visible, onClose }) {
    const navigate = useNavigate();

    if (!visible) return null;

    const handleNavigation = (destination) => {
        localStorage.removeItem('selectedSport');
        localStorage.removeItem('selectedPosition');
        onClose?.();
        navigate(destination);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md text-center shadow-lg animate-fade-up">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    Stats Submitted Successfully
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    Your performance data has been saved.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={() => handleNavigation('/')}
                        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-lg transition"
                    >
                        Back to Home
                    </button>

                    <button
                        onClick={() => handleNavigation('/analytics')}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition"
                    >
                        View My Analytics
                    </button>
                </div>
            </div>
        </div>
    );
}