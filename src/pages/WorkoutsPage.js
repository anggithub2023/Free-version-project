import React, { useState, useEffect } from 'react';
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

        const timer = setTimeout(() => setShowTitle(false), 2000);
        return () => clearTimeout(timer);
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
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Workout Tracker</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow text-sm sm:text-base"
                            >
                                Add Workout
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded shadow text-sm sm:text-base"
                            >
                                Home
                            </button>
                        </div>
                    </div>
                )}

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
