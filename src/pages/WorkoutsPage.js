import React, { useState, useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('athleteWorkouts')) || [];
        setWorkouts(saved);
    }, []);

    const countCategory = (category) => {
        return workouts.filter(entry => entry.activityType === category).length;
    };

    const totalCount = workouts.length || 1;
    const cardioCount = countCategory('Run') + countCategory('Sports');
    const strengthCount = countCategory('Weight Lifting') + countCategory('Conditioning');
    const recoveryCount = countCategory('Recovery');

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">Own Your Grind: Track Every Rep, Every Step</h1>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Fitness Snapshot</h2>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <div className="flex h-6 text-xs font-medium text-white">
                            <div className="bg-blue-500 text-center" style={{ width: `${(cardioCount / totalCount) * 100}%` }}>Cardio</div>
                            <div className="bg-green-500 text-center" style={{ width: `${(strengthCount / totalCount) * 100}%` }}>Strength</div>
                            <div className="bg-yellow-500 text-center" style={{ width: `${(recoveryCount / totalCount) * 100}%` }}>Recovery</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FaDumbbell className="text-indigo-600 dark:text-indigo-300" /> Workout Tracker
                    </h2>
                </div>

            </div>
        </div>
    );
};

export default WorkoutPage;
