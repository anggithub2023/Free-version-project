import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBrain, FaChartBar, FaVideo } from 'react-icons/fa';
import { GiLevelEndFlag, GiMuscleUp } from 'react-icons/gi';
import { MdHealthAndSafety, MdOutlineEditNote } from 'react-icons/md';

function HomePage() {
    const navigate = useNavigate();
    const [hideHeader, setHideHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setHideHeader(currentY > lastScrollY && currentY > 100);
            setLastScrollY(currentY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const sections = [
        {
            label: 'Reflection',
            icon: <MdOutlineEditNote className="text-white bg-indigo-500 rounded-full p-1 text-4xl" />,
            color: 'text-indigo-700',
            shadow: 'hover:shadow-indigo-300',
            route: '/reflect',
            description:
                'Complete your daily reflection to stay focused on the process and track progress over time.'
        },
        {
            label: 'Readiness',
            icon: <FaBrain className="text-white bg-purple-500 rounded-full p-1 text-4xl" />,
            color: 'text-purple-700',
            shadow: 'hover:shadow-purple-300',
            route: '/readiness',
            description:
                'Check in on your mental and physical readiness before each session — build focus, recover smarter, and show up prepared.'
        },
        {
            label: 'Injury Prevention',
            icon: <MdHealthAndSafety className="text-white bg-rose-500 rounded-full p-1 text-4xl" />,
            color: 'text-rose-600',
            shadow: 'hover:shadow-rose-300',
            route: '/injury',
            description:
                'Learn how to prevent injuries with real-life strategies from a Certified Athletic Trainer — warm-ups, recovery tips, and more.'
        },
        {
            label: 'Player Stats',
            icon: <FaChartBar className="text-white bg-green-500 rounded-full p-1 text-4xl" />,
            color: 'text-green-700',
            shadow: 'hover:shadow-green-300',
            route: '/stats',
            description:
                'Track your game-by-game performance, see averages, and download your progress.'
        },
        {
            label: 'Workouts',
            icon: <GiMuscleUp className="text-white bg-yellow-500 rounded-full p-1 text-4xl" />,
            color: 'text-yellow-600',
            shadow: 'hover:shadow-yellow-300',
            route: '/workouts',
            description: 'Browse workouts or training plans that align with your goals.'
        },
        {
            label: 'Videos',
            icon: <FaVideo className="text-white bg-teal-500 rounded-full p-1 text-4xl" />,
            color: 'text-teal-600',
            shadow: 'hover:shadow-teal-300',
            route: '/videos',
            description: 'Watch practice footage, breakdowns, or motivational clips.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
            <header
                className={`w-full text-center py-6 bg-white dark:bg-gray-900 bg-opacity-80 shadow-sm sticky top-0 z-50 transition-transform duration-300 sm:translate-y-0 ${
                    hideHeader ? '-translate-y-full' : 'translate-y-0'
                }`}
            >
                <h1 className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-200 tracking-tight">
                    <GiLevelEndFlag className="text-white bg-indigo-500 rounded-full p-2 text-5xl" /> Elevate
                </h1>
                <p className="text-indigo-600 dark:text-indigo-300 text-sm sm:text-base font-medium mt-2 px-4 max-w-xl mx-auto">
                    Train. Reflect. Compete. A performance platform for driven players.
                </p>
            </header>

            <main className="px-4 sm:px-6 py-8 max-w-6xl mx-auto">
                <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4 text-center sm:text-left">
                    Explore Tools
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {sections.map((section, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigate(section.route)}
                            className={`group cursor-pointer bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg ${section.shadow} hover:scale-105 transform transition duration-300 text-left`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                {section.icon}
                                <h3 className={`text-xl font-semibold ${section.color}`}>{section.label}</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm transition-all duration-300 ease-in-out group-hover:font-semibold group-hover:text-base">
                                {section.description}
                            </p>
                        </button>
                    ))}
                </div>
            </main>

            <footer className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400 px-4 pb-6">
                © {new Date().getFullYear()} Process Reflection™ by Alex Ng. All rights reserved.<br />
                This platform, concept, design, and workflow are the original intellectual property of the creator.
            </footer>
        </div>
    );
}

export default HomePage;
