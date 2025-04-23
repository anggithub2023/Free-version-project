import React, { useState, useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [form] = useState({
        activityType: '',
        sport: '',
        subtype: '',
        date: '',
        duration: '',
        notes: '',
        miles: '',
        muscleGroup: '',
        runType: '',
        conditioningType: '',
        recoveryType: ''
    });
    const [expandedSections, setExpandedSections] = useState({});

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('athleteWorkouts')) || [];
        setWorkouts(saved);
    }, []);

    const countCategory = (category) => {
        return workouts.filter(entry => entry.activityType === category).length;
    };

    const toggleSection = (type) => {
        setExpandedSections(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const totalCount = workouts.length || 1;
    const cardioCount = countCategory('Run') + countCategory('Sports');
    const strengthCount = countCategory('Weight Lifting') + countCategory('Conditioning');
    const recoveryCount = countCategory('Recovery');

    const groupedWorkouts = workouts.reduce((acc, workout) => {
        const key = workout.activityType;
        if (!acc[key]) acc[key] = [];
        acc[key].push(workout);
        return acc;
    }, {});

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

                {Object.keys(groupedWorkouts).map(type => (
                    <div key={type} className="mb-4 border rounded-lg overflow-hidden">
                        <div
                            onClick={() => toggleSection(type)}
                            className="cursor-pointer bg-indigo-100 dark:bg-gray-800 px-4 py-2 flex items-center justify-between text-lg font-semibold"
                        >
                            <span>{type} Activities</span>
                            {expandedSections[type] ? <FaChevronDown /> : <FaChevronRight />}
                        </div>
                        {expandedSections[type] && (
                            <table className="w-full text-sm text-left border-t">
                                <thead className="bg-indigo-200 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Sport</th>
                                    <th className="px-4 py-2">Subtype</th>
                                    <th className="px-4 py-2">Duration</th>
                                    <th className="px-4 py-2">Notes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {groupedWorkouts[type].map((workout, idx) => (
                                    <tr key={idx} className="border-t border-gray-300 dark:border-gray-600">
                                        <td className="px-4 py-2">{workout.date}</td>
                                        <td className="px-4 py-2">{workout.sport}</td>
                                        <td className="px-4 py-2">{workout.subtype}</td>
                                        <td className="px-4 py-2">{workout.duration} min</td>
                                        <td className="px-4 py-2">{workout.notes}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutPage;
