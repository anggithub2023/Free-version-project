import React, { useState, useEffect } from 'react';
import WorkoutFormModal from '../components/Workout/WorkoutFormModal';
import WorkoutTableSection from '../components/Workout/WorkoutTableSection';
import FitnessSnapshot from '../components/Workout/FitnessSnapshot';

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});

    // Load workouts on mount
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('athleteWorkouts')) || [];
        setWorkouts(saved);
    }, []);

    // Save workouts on change
    useEffect(() => {
        localStorage.setItem('athleteWorkouts', JSON.stringify(workouts));
    }, [workouts]);

    const handleSubmit = (form) => {
        const updated = [...workouts, form];
        setWorkouts(updated);
        setShowModal(false);
    };

    // ✅ NEW ID-based deletion logic
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
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                    <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                        Workout Tracker
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-4 sm:mt-0">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow text-sm sm:text-base"
                        >
                            Add Workout
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded shadow text-sm sm:text-base mt-2 sm:mt-0"
                        >
                            Home
                        </button>
                    </div>
                </div>

                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Fitness Snapshot – Stay on Track, Achieve Your Goals
                </h3>
                <FitnessSnapshot workouts={workouts} />

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
                        onDelete={handleDelete} // ✅ Now passes only ID
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