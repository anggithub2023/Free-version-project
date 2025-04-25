import React, { useState, useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';
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
        <div className="min-h-screen bg-gray-100 p-6 text-gray-900">
            <div className="max-w-4xl mx-auto">
                {/* Title + Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    {/* Icon + Title */}
                    <div className="flex justify-center sm:justify-start items-center gap-2 w-full">
                        <FaDumbbell className="text-blue-600 text-3xl sm:text-3xl" />
                        <h2 className="text-3xl sm:text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                            Workout Tracker
                        </h2>
                    </div>

                    {/* Buttons (Desktop Only) */}
                    <div className="hidden sm:flex gap-3">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700 text-sm"
                        >
                            ← Back
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 text-sm"
                        >
                            + Add Workout
                        </button>
                    </div>
                </div>

                {/* Fitness Snapshot */}
                <FitnessSnapshot workouts={workouts} />

                {/* Workout Entries */}
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

            {/* FAB: Add Workout (Mobile Only) */}
            <button
                onClick={() => setShowModal(true)}
                className="sm:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white text-3xl flex items-center justify-center shadow-lg hover:bg-blue-700"
                aria-label="Add Workout"
            >
                +
            </button>

            {/* FAB: Back/Home (Mobile Only) */}
            <button
                onClick={() => window.location.href = '/'}
                className="sm:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gray-600 text-white text-2xl flex items-center justify-center shadow-lg hover:bg-gray-700"
                aria-label="Back"
            >
                ←
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