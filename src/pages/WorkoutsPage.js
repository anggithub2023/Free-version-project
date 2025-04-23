import React, { useState, useEffect } from 'react';

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
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Fitness Snapshot</h2>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <div className="flex h-6 text-xs font-medium text-white">
                            <div
                                className="bg-blue-500 text-center"
                                style={{ width: `${(cardioCount / totalCount) * 100}%` }}
                            >
                                Cardio
                            </div>
                            <div
                                className="bg-green-500 text-center"
                                style={{ width: `${(strengthCount / totalCount) * 100}%` }}
                            >
                                Strength
                            </div>
                            <div
                                className="bg-yellow-500 text-center"
                                style={{ width: `${(recoveryCount / totalCount) * 100}%` }}
                            >
                                Recovery
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Workout Tracker</h1>
                </div>

                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-indigo-100 dark:bg-gray-700 text-indigo-800 dark:text-white">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Activity Type</th>
                            <th className="p-3">Sport</th>
                            <th className="p-3">Subtype</th>
                            <th className="p-3">Duration</th>
                            <th className="p-3">Notes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {workouts.map((entry, idx) => (
                            <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="p-3 whitespace-nowrap">{entry.date}</td>
                                <td className="p-3 whitespace-nowrap">{entry.activityType}</td>
                                <td className="p-3 whitespace-nowrap">{entry.sport}</td>
                                <td className="p-3 whitespace-nowrap">{entry.subtype}</td>
                                <td className="p-3 whitespace-nowrap">{entry.duration}</td>
                                <td className="p-3 whitespace-pre-wrap">{entry.notes}</td>
                            </tr>
                        ))}
                        {workouts.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-3 text-center text-gray-500 dark:text-gray-400">
                                    No workouts logged yet.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkoutPage;
