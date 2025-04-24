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
        try {
            const saved = JSON.parse(localStorage.getItem('athleteWorkouts')) || [];
            setWorkouts(saved);
        } catch (error) {
            console.error("Failed to load workouts from localStorage:", error);
            setWorkouts([]);
        }
    }, []);

    const handleSubmit = (form) => {
        const updated = [...workouts, form];
        setWorkouts(updated);
        localStorage.setItem('athleteWorkouts', JSON.stringify(updated));
        setShowModal(false);
    };

    const toggleSection = (type) => {
        setExpandedSections(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const groupedWorkouts = React.useMemo(() => {
        return workouts.reduce((acc, workout) => {
            const key = workout.activityType;
            if (!acc[key]) acc[key] = [];
            acc[key].push(workout);
            return acc;
        }, {});
    }, [workouts]);

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
                    <div className="space-x-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow"
                        >
                            + Add Workout
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded shadow"
                        >
                            Home
                        </button>
                    </div>
                </div>

                <FitnessSnapshot workouts={workouts} />

                {Object.keys(groupedWorkouts).map(type => (
                    <WorkoutTableSection
                        key={type}
                        type={type}
                        workouts={groupedWorkouts[type]}
                        isExpanded={expandedSections[type]}
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
