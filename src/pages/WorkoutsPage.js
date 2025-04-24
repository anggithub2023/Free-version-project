import React, { useState, useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import WorkoutFormModal from '../components/WorkoutFormModal';
import WorkoutTableSection from '../components/WorkoutTableSection';
import {
    activityTypes,
    sportOptions,
    sportSubtypes,
    runTypes,
    recoveryOptions,
    conditioningOptions,
    muscleGroups
} from '../data/inputFields';

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [expandedSections, setExpandedSections] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('athleteWorkouts')) || [];
        setWorkouts(saved);
    }, []);

    const groupedWorkouts = workouts.reduce((acc, workout) => {
        const key = workout.activityType;
        if (!acc[key]) acc[key] = [];
        acc[key].push(workout);
        return acc;
    }, {});

    const toggleSection = (type) => {
        setExpandedSections(prev => ({ ...prev, [type]: !prev[type] }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">
                        Own Your Grind: Track Every Rep, Every Step
                    </h1>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FaDumbbell className="text-indigo-600 dark:text-indigo-300" /> Workout Tracker
                    </h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow"
                    >
                        + Add Workout
                    </button>
                </div>

                {Object.keys(groupedWorkouts).map(type => (
                    <WorkoutTableSection
                        key={type}
                        type={type}
                        entries={groupedWorkouts[type]}
                        isExpanded={expandedSections[type]}
                        onToggle={() => toggleSection(type)}
                    />
                ))}

                {showModal && (
                    <WorkoutFormModal
                        onClose={() => setShowModal(false)}
                        onSubmit={(form) => {
                            const updated = [...workouts, form];
                            setWorkouts(updated);
                            localStorage.setItem('athleteWorkouts', JSON.stringify(updated));
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default WorkoutPage;
