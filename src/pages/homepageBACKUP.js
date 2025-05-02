import React from 'react';
import { FaBrain, FaChartBar, FaVideo } from 'react-icons/fa';
import { GiLevelEndFlag } from 'react-icons/gi';
import {MdHealthAndSafety, MdOutlineEditNote} from 'react-icons/md';
import { GiMuscleUp } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center overflow-x-hidden overflow-y-auto">
            <header className="w-full text-center py-6 bg-white dark:bg-gray-900 bg-opacity-80 shadow-md sticky top-0 z-50">
                <h1 className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-200 tracking-tight">
                    <GiLevelEndFlag className="text-white bg-indigo-500 rounded-full p-1 text-4xl transition-transform duration-200 group-hover:scale-110" /> Elevate: Train, Reflect, Compete
                </h1>
            </header>

            <p className="text-center text-indigo-700 font-medium mt-6 mb-10 max-w-md px-4 tracking-wide opacity-0 animate-fade-up">
                A focused tool for players to reflect, improve, and track their journey on and off the court.
            </p>

            <div className="grid gap-6 w-full max-w-4xl px-4 sm:px-6 grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]">
                <div onClick={() => navigate('/reflect')} className="group cursor-pointer bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-indigo-300 hover:scale-105 transform transition duration-300">
                    <h2 className="text-xl font-semibold text-center text-indigo-700 mb-1">
            <span className="flex items-center justify-center gap-2">
              <MdOutlineEditNote className="text-white bg-indigo-500 rounded-full p-1 text-3xl sm:text-4xl transition-transform duration-200 group-hover:scale-110" /> Reflection
            </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Complete your daily reflection to stay focused on the process and track progress over time.</p>
                </div>

                <div onClick={() => navigate('/readiness')} className="cursor-pointer bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-purple-300 hover:scale-105 transform transition duration-300">
                    <h2 className="flex items-center justify-center gap-2 text-xl font-semibold text-purple-700 mb-1">
                        <FaBrain className="text-white bg-purple-500 rounded-full p-1 text-3xl sm:text-4xl transition-transform duration-200 group-hover:scale-110" /> Readiness
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Check in on your mental and physical readiness before each session — build focus, recover smarter, and show up prepared.
                    </p>
                </div>
                <div onClick={() => navigate('/injury')} className="cursor-pointer bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-rose-300 hover:scale-105 transform transition duration-300">
                    <h2 className="text-xl font-semibold text-center text-rose-600 mb-1">
                <span className="flex items-center justify-center gap-2">
                    <MdHealthAndSafety className="text-white bg-rose-500 rounded-full p-1 text-3xl sm:text-4xl transition-transform duration-200 group-hover:scale-110" /> Injury Prevention
                </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Learn how to prevent injuries with real-life strategies from a Certified Athletic Trainer — warm-ups, recovery tips, and more.</p>
                </div>

                <div onClick={() => navigate('/stats')} className="cursor-pointer bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-green-300 hover:scale-105 transform transition duration-300">
                    <h2 className="text-xl font-semibold text-center text-green-700 mb-1">
            <span className="flex items-center justify-center gap-2">
              <FaChartBar className="text-white bg-green-500 rounded-full p-1 text-3xl sm:text-4xl transition-transform duration-200 group-hover:scale-110" /> Player Stats
            </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Track your game-by-game performance, see averages, and download your progress.</p>
                </div>

                <div onClick={() => navigate('/workouts')} className="cursor-pointer bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-yellow-300 hover:scale-105 transform transition duration-300">
                    <h2 className="text-xl font-semibold text-center text-yellow-600 mb-1">
            <span className="flex items-center justify-center gap-2">
              <GiMuscleUp className="text-white bg-yellow-500 rounded-full p-1 text-3xl sm:text-4xl transition-transform duration-200 group-hover:scale-110" /> Workouts
            </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Browse workouts or training plans that align with your goals.</p>
                </div>

                <div onClick={() => navigate('/videos')} className="cursor-pointer bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-teal-300 hover:scale-105 transform transition duration-300">
                    <h2 className="text-xl font-semibold text-center text-teal-600 mb-1">
                <span className="flex items-center justify-center gap-2">
                <FaVideo className="text-white bg-teal-500 rounded-full p-1 text-3xl sm:text-4xl transition-transform duration-200 group-hover:scale-110" /> Videos
            </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Watch practice footage, breakdowns, or motivational clips.</p>
                </div>
            </div>

            <footer className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400 px-4 pb-6">
                © {new Date().getFullYear()} Process Reflection™ by Alex Ng. All rights reserved.
                This platform, concept, design, and workflow are the original intellectual property of the creator.
                Unauthorized reproduction, distribution, reverse engineering, or imitation without written permission is strictly prohibited.
                Process Reflection™ is a trademark under development. All content is protected under U.S. copyright law.
            </footer>
        </div>
    );
}

export default HomePage;
