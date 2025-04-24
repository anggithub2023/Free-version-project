import React, { useState, useEffect } from 'react';
import WorkoutFormModal from '../components/Workout/WorkoutFormModal';
import WorkoutTableSection from '../components/Workout/WorkoutTableSection';
import FitnessSnapshot from '../components/Workout/FitnessSnapshot';

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('athleteWorkouts')) || [];
        setWorkouts(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem('athleteWorkouts', JSON.stringify(workouts));
    }, [workouts]);

    const handleSubmit = (form) => {
        const updated = [...workouts, form];
        setWorkouts(updated);
        setShowModal(false);
    };

    const handleDelete = (id) => {
        const filtered = workouts.filter(workout => workout.id !== id);
        setWorkouts(filtered);
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
                {/* Header Section */}
                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                            Workout Tracker
                        </h2>
                        {/* Desktop "Add Workout" button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="hidden sm:inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow text-sm sm:text-base"
                        >
                            Add Workout
                        </button>
                    </div>
                    {/* Home button below title */}
                    <div className="mt-2">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-3 py-1 rounded text-sm"
                        >
                            Home
                        </button>
                    </div>
                </div>

                {/* Fitness Snapshot */}
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Fitness Snapshot – Stay on Track, Achieve Your Goals
                </h3>
                <FitnessSnapshot workouts={workouts} />

                {/* Workout Entries */}
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 mt-6">
                    Workout Entries – Review and Reflect
                </h3>
                {Object.keys(groupedWorkouts).map((type) => (
                    <WorkoutTableSection
                        key={type}
                        type={type}
                        workouts={groupedWorkouts[type]}
                        expanded={expandedSections[type]}
                        toggleSection={toggleSection}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {/* FAB - Mobile Only */}
            <button
                onClick={() => setShowModal(true)}
                className="sm:hidden fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 rounded-full shadow-lg text-3xl flex items-center justify-center"
                aria-label="Add Workout"
            >
                +
            </button>

            {/* Modal */}
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