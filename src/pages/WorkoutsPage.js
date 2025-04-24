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
        <div style={{ minHeight: '100vh', padding: '24px', background: '#f9fafb', color: '#111' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4338ca' }}>
                    Workout Tracker
                </h2>

                <h3 style={{ marginTop: '24px', fontWeight: '600', color: '#4b5563' }}>
                    Fitness Snapshot – Stay on Track, Achieve Your Goals
                </h3>
                <FitnessSnapshot workouts={workouts} />

                <h3 style={{ marginTop: '32px', fontWeight: '600', color: '#4b5563' }}>
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

            {/* FAB: Add Workout (Blue, Bottom-Right) */}
            <div
                onClick={() => setShowModal(true)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '30px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    fontSize: '30px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
                aria-label="Add Workout"
            >
                +
            </div>

            {/* FAB: Back/Home (Gray, Bottom-Left) */}
            <div
                onClick={() => window.location.href = '/'}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '30px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    fontSize: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
                aria-label="Back Home"
            >
                ←
            </div>

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