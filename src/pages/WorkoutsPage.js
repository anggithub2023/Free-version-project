// src/pages/WorkoutPage.jsx
import React, { useState, useEffect } from 'react';

const activityTypes = [
    'Practice',
    'Game',
    'Run',
    'Weight Lifting',
    'Skill Work',
    'Conditioning',
    'Recovery'
];

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [form, setForm] = useState({
        date: '',
        type: '',
        duration: '',
        notes: ''
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('athleteWorkouts')) || [];
        setWorkouts(saved);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updated = [...workouts, form];
        setWorkouts(updated);
        localStorage.setItem('athleteWorkouts', JSON.stringify(updated));
        setForm({ date: '', type: '', duration: '', notes: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Workout Tracker</h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-10 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Activity Type</label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                            >
                                <option value="">Select</option>
                                {activityTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Duration (e.g., 45 mins, 3 miles)</label>
                        <input
                            type="text"
                            name="duration"
                            value={form.duration}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Notes</label>
                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                        />
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow"
                        >
                            Add Workout
                        </button>
                    </div>
                </form>

                {/* Table */}
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-indigo-100 dark:bg-gray-700 text-indigo-800 dark:text-white">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Duration</th>
                            <th className="p-3">Notes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {workouts.map((entry, idx) => (
                            <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="p-3 whitespace-nowrap">{entry.date}</td>
                                <td className="p-3 whitespace-nowrap">{entry.type}</td>
                                <td className="p-3 whitespace-nowrap">{entry.duration}</td>
                                <td className="p-3 whitespace-pre-wrap">{entry.notes}</td>
                            </tr>
                        ))}
                        {workouts.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-3 text-center text-gray-500 dark:text-gray-400">
                                    No workouts logged yet.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkoutPage;
