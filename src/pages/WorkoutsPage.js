import React, { useState, useEffect } from 'react';

const activityTypes = ['Sports', 'Run', 'Weight Lifting', 'Conditioning', 'Recovery'];

const sportOptions = [
    'Basketball', 'Soccer', 'Track', 'Volleyball', 'Baseball', 'Lacrosse', 'Ice Hockey',
    'Football', 'Tennis', 'Swimming', 'Golf', 'Wrestling', 'Softball', 'CrossFit', 'Cycling', 'Rowing'
];

const sportSubtypes = {
    Basketball: ['Practice', 'Game'],
    Soccer: ['Practice', 'Game'],
    Track: ['Sprint', 'Distance', 'Meet'],
    Volleyball: ['Practice', 'Game'],
    Baseball: ['Practice', 'Game', 'Bullpen'],
    Lacrosse: ['Practice', 'Game'],
    IceHockey: ['Practice', 'Game'],
    Football: ['Practice', 'Game', 'Scrimmage'],
    Tennis: ['Practice', 'Match'],
    Swimming: ['Practice', 'Meet'],
    Golf: ['Practice', 'Tournament'],
    Wrestling: ['Practice', 'Match'],
    Softball: ['Practice', 'Game'],
    CrossFit: ['WOD', 'Competition'],
    Cycling: ['Ride', 'Race'],
    Rowing: ['Practice', 'Race']
};

const muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
const conditioningFocus = ['Endurance', 'Agility', 'Speed', 'Power', 'Stamina'];
const recoveryFocus = ['Stretching', 'Ice Bath', 'Massage', 'Foam Rolling', 'Rest'];

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [form, setForm] = useState({
        activityType: '',
        sport: '',
        subtype: '',
        date: '',
        duration: '',
        notes: '',
        muscleGroup: '',
        focusArea: ''
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('athleteWorkouts');
        if (saved) {
            try {
                setWorkouts(JSON.parse(saved));
            } catch {
                setWorkouts([]);
            }
        }
    }, []);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updated = [...workouts, form];
        setWorkouts(updated);
        localStorage.setItem('athleteWorkouts', JSON.stringify(updated));
        setForm({
            activityType: '',
            sport: '',
            subtype: '',
            date: '',
            duration: '',
            notes: '',
            muscleGroup: '',
            focusArea: ''
        });
        setShowModal(false);
    };

    const groupedWorkouts = workouts.reduce((acc, entry) => {
        if (!acc[entry.activityType]) acc[entry.activityType] = [];
        acc[entry.activityType].push(entry);
        return acc;
    }, {});

    const renderTable = (type, entries) => {
        return (
            <div key={type} className="mb-10">
                <h2 className="text-2xl font-semibold mb-2 capitalize">{type}</h2>
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-indigo-100 dark:bg-gray-700 text-indigo-800 dark:text-white">
                        <tr>
                            <th className="p-3">Date</th>
                            {type === 'Sports' && <><th className="p-3">Sport</th><th className="p-3">Subtype</th></>}
                            {type === 'Weight Lifting' && <th className="p-3">Muscle Group</th>}
                            {(type === 'Conditioning' || type === 'Recovery') && <th className="p-3">Focus Area</th>}
                            <th className="p-3">Duration</th>
                            <th className="p-3">Notes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {entries.map((entry, idx) => (
                            <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="p-3 whitespace-nowrap">{entry.date}</td>
                                {type === 'Sports' && <><td className="p-3 whitespace-nowrap">{entry.sport}</td><td className="p-3 whitespace-nowrap">{entry.subtype}</td></>}
                                {type === 'Weight Lifting' && <td className="p-3 whitespace-nowrap">{entry.muscleGroup}</td>}
                                {(type === 'Conditioning' || type === 'Recovery') && <td className="p-3 whitespace-nowrap">{entry.focusArea}</td>}
                                <td className="p-3 whitespace-nowrap">{entry.duration}</td>
                                <td className="p-3 whitespace-pre-wrap">{entry.notes}</td>
                            </tr>
                        ))}
                        {entries.length === 0 && (
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
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
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
                                        {activityTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {form.activityType === 'Sports' && (
                                    <>
                                        <div>
                                            <label className="block mb-1 font-medium">Sport</label>
                                            <select
                                                name="sport"
                                                value={form.sport}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                                            >
                                                <option value="">Select</option>
                                                {sportOptions.map((sport) => (
                                                    <option key={sport} value={sport}>{sport}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {form.sport && sportSubtypes[form.sport] && (
                                            <div>
                                                <label className="block mb-1 font-medium">Activity</label>
                                                <select
                                                    name="subtype"
                                                    value={form.subtype}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                                                >
                                                    <option value="">Select</option>
                                                    {sportSubtypes[form.sport].map((sub) => (
                                                        <option key={sub} value={sub}>{sub}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </>
                                )}

                                {form.activityType === 'Weight Lifting' && (
                                    <div>
                                        <label className="block mb-1 font-medium">Muscle Group</label>
                                        <select
                                            name="muscleGroup"
                                            value={form.muscleGroup}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                                        >
                                            <option value="">Select</option>
                                            {muscleGroups.map((group) => (
                                                <option key={group} value={group}>{group}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {['Conditioning', 'Recovery'].includes(form.activityType) && (
                                    <div>
                                        <label className="block mb-1 font-medium">Focus Area</label>
                                        <select
                                            name="focusArea"
                                            value={form.focusArea}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                                        >
                                            <option value="">Select</option>
                                            {(form.activityType === 'Conditioning' ? conditioningFocus : recoveryFocus).map((focus) => (
                                                <option key={focus} value={focus}>{focus}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

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

                {Object.keys(groupedWorkouts).map((type) => renderTable(type, groupedWorkouts[type]))}
            </div>
        </div>
    );
};

export default WorkoutPage;
