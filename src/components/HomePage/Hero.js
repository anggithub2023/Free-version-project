import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate();

    return (
        <>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-2 text-left">
                Reflect on<br />Your<br />Performance
            </h1>
            <p className="text-lg sm:text-xl text-left text-gray-600 dark:text-gray-300 mb-8">
                A modern way to track, improve, and stay consistent with your goals.
            </p>
            <div className="mb-10">
                <button
                    onClick={() => navigate('/reflect')}
                    className="animate-pulse bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
                >
                    Start Reflection
                </button>
            </div>
        </>
    );
}