import React, { useState, useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [form, setForm] = useState({
        activityType: '', sport: '', subtype: '', date: '', duration: '', notes: '', miles: '', muscleGroup: '', runType: '', conditioningType: '', recoveryType: ''
    });
    const [expandedSections, setExpandedSections] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('athleteWorkouts')) || [];
        setWorkouts(saved);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['duration', 'miles'];
        if (numericFields.includes(name) && value !== '' && !/^\d*\.?\d*$/.test(value)) return;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updated = [...workouts, form];
        setWorkouts(updated);
        localStorage.setItem('athleteWorkouts', JSON.stringify(updated));
        setForm({ activityType: '', sport: '', subtype: '', date: '', duration: '', notes: '', miles: '', muscleGroup: '', runType: '', conditioningType: '', recoveryType: '' });
        setShowModal(false);
    };

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
                    <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">Own Your Grind: Track Every Rep, Every Step</h1>
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
                    <div key={type} className="mb-4">
                        <button
                            className="flex justify-between items-center w-full bg-indigo-100 dark:bg-gray-800 px-4 py-2 font-semibold rounded"
                            onClick={() => toggleSection(type)}
                        >
                            <span>{type}</span>
                            {expandedSections[type] ? <MdExpandLess /> : <MdExpandMore />}
                        </button>
                        {expandedSections[type] && (
                            <div className="overflow-x-auto mt-2">
                                <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700">
                                    <thead>
                                    <tr className="bg-indigo-200 dark:bg-gray-700">
                                        <th className="px-4 py-2">Date</th>
                                        <th className="px-4 py-2">Sport</th>
                                        <th className="px-4 py-2">Subtype</th>
                                        <th className="px-4 py-2">Duration</th>
                                        <th className="px-4 py-2">Miles</th>
                                        <th className="px-4 py-2">Muscle Group</th>
                                        <th className="px-4 py-2">Run Type</th>
                                        <th className="px-4 py-2">Conditioning Type</th>
                                        <th className="px-4 py-2">Recovery Type</th>
                                        <th className="px-4 py-2">Notes</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {groupedWorkouts[type].map((entry, idx) => (
                                        <tr key={idx} className="border-t border-gray-300 dark:border-gray-700">
                                            <td className="px-4 py-2">{entry.date}</td>
                                            <td className="px-4 py-2">{entry.sport}</td>
                                            <td className="px-4 py-2">{entry.subtype}</td>
                                            <td className="px-4 py-2">{entry.duration}</td>
                                            <td className="px-4 py-2">{entry.miles}</td>
                                            <td className="px-4 py-2">{entry.muscleGroup}</td>
                                            <td className="px-4 py-2">{entry.runType}</td>
                                            <td className="px-4 py-2">{entry.conditioningType}</td>
                                            <td className="px-4 py-2">{entry.recoveryType}</td>
                                            <td className="px-4 py-2">{entry.notes}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutPage;
