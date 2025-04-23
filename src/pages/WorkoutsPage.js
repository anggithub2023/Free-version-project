import React, { useState, useEffect } from 'react';

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [form, setForm] = useState({
        activityType: '',
        sport: '',
        subtype: '',
        date: '',
        duration: '',
        notes: '',
        miles: '',
        muscleGroup: ''
    });
    const [showModal, setShowModal] = useState(false);

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
        setForm({ activityType: '', sport: '', subtype: '', date: '', duration: '', notes: '', miles: '', muscleGroup: '' });
        setShowModal(false);
    };

    const countCategory = (category) => {
        return workouts.filter(entry => entry.activityType === category).length;
    };

    const totalCount = workouts.length || 1;
    const cardioCount = countCategory('Run') + countCategory('Sports');
    const strengthCount = countCategory('Weight Lifting') + countCategory('Conditioning');
    const recoveryCount = countCategory('Recovery');

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Fitness Snapshot</h2>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <div className="flex h-6 text-xs font-medium text-white">
                            <div
                                className="bg-blue-500 text-center"
                                style={{ width: `${(cardioCount / totalCount) * 100}%` }}
                            >
                                Cardio
                            </div>
                            <div
                                className="bg-green-500 text-center"
                                style={{ width: `${(strengthCount / totalCount) * 100}%` }}
                            >
                                Strength
                            </div>
                            <div
                                className="bg-yellow-500 text-center"
                                style={{ width: `${(recoveryCount / totalCount) * 100}%` }}
                            >
                                Recovery
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Workout Tracker</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow"
                    >
                        + Add Workout
                    </button>
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white dark:bg-gray-900 w-full max-w-xl p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Log New Workout</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block mb-1 font-medium">Activity Type</label>
                                    <select
                                        name="activityType"
                                        value={form.activityType}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                                    >
                                        <option value="">Select</option>
                                        <option value="Run">Run</option>
                                        <option value="Weight Lifting">Weight Lifting</option>
                                        <option value="Conditioning">Conditioning</option>
                                        <option value="Recovery">Recovery</option>
                                        <option value="Sports">Sports</option>
                                    </select>
                                </div>

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
                                    <label className="block mb-1 font-medium">Duration</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={form.duration}
                                        onChange={handleChange}
                                        placeholder="e.g., 45 mins or 3 miles"
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

                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 border border-gray-400 dark:border-gray-600 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow"
                                    >
                                        Save Workout
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-indigo-100 dark:bg-gray-700 text-indigo-800 dark:text-white">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Activity Type</th>
                            <th className="p-3">Sport</th>
                            <th className="p-3">Subtype</th>
                            <th className="p-3">Duration</th>
                            <th className="p-3">Notes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {workouts.map((entry, idx) => (
                            <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="p-3 whitespace-nowrap">{entry.date}</td>
                                <td className="p-3 whitespace-nowrap">{entry.activityType}</td>
                                <td className="p-3 whitespace-nowrap">{entry.sport}</td>
                                <td className="p-3 whitespace-nowrap">{entry.subtype}</td>
                                <td className="p-3 whitespace-nowrap">{entry.duration}</td>
                                <td className="p-3 whitespace-pre-wrap">{entry.notes}</td>
                            </tr>
                        ))}
                        {workouts.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-3 text-center text-gray-500 dark:text-gray-400">
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
