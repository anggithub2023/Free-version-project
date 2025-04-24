import React, { useState, useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import WorkoutFormModal from '../components/Workout/WorkoutFormModal';
import WorkoutTableSection from '../components/Workout/WorkoutTableSection';
import FitnessSnapshot from '../components/Workout/FitnessSnapshot';

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});
    const [showTitle, setShowTitle] = useState(true);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('athleteWorkouts')) || [];
        setWorkouts(saved);
        const timeout = setTimeout(() => setShowTitle(false), 2000);
        return () => clearTimeout(timeout);
    }, []);

    const handleSubmit = (form) => {
        const updated = [...workouts, form];
        setWorkouts(updated);
        localStorage.setItem('athleteWorkouts', JSON.stringify(updated));
        setShowModal(false);
    };

    const toggleSection = (type) => {
        setExpandedSections((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const groupedWorkouts = workouts.reduce((acc, workout) => {
        const key = workout.activityType || 'Other';
        if (!acc[key]) acc[key] = [];
        acc[key].push(workout);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                {showTitle && (
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">
                            Own Your Grind: Track Every Rep, Every Step
                        </h1>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                    <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2">
                        <FaDumbbell className="text-indigo-600 dark:text-indigo-300 text-2xl sm:mr-2" />
                        <h2 className="text-2xl font-bold">Workout Tracker</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mt-4 sm:mt-0 items-end sm:items-center">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded shadow text-sm"
                        >
                            Add Workout
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-3 py-1.5 rounded shadow text-sm"
                        >
                            Home
                        </button>
                    </div>
                </div>

                <FitnessSnapshot workouts={workouts} />

                {Object.keys(groupedWorkouts).map((type) => (
                    <WorkoutTableSection
                        key={type}
                        type={type}
                        workouts={groupedWorkouts[type]}
                        expanded={expandedSections[type]}
                        toggleSection={toggleSection}
                    />
                ))}
            </div>

            {showModal && (
                <WorkoutFormModal
                    onClose={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default WorkoutPage;

// FOOTER NOTES: WORKOUTPAGE.JSX HANDLES PAGE STRUCTURE, STATE MGMT, MODAL & TABLES. DEPENDENCIES: WorkoutFormModal, WorkoutTableSection, FitnessSnapshot