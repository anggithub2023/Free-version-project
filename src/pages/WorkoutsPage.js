import React, { useState, useEffect } from 'react';
import { FaDumbbell, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const activityTypes = [
    'Run', 'Weight Lifting', 'Conditioning', 'Recovery', 'Sports'
];

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
    'Ice Hockey': ['Practice', 'Game'],
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
        muscleGroup: '',
        runType: '',
        conditioningType: '',
        recoveryType: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});

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
        setForm({
            activityType: '', sport: '', subtype: '', date: '', duration: '', notes: '',
            miles: '', muscleGroup: '', runType: '', conditioningType: '', recoveryType: ''
        });
        setShowModal(false);
    };

    const toggleSection = (type) => {
        setExpandedSections(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const countCategory = (category) => {
        return workouts.filter(entry => entry.activityType === category).length;
    };

    const totalCount = workouts.length || 1;
    const cardioCount = countCategory('Run') + countCategory('Sports');
    const strengthCount = countCategory('Weight Lifting') + countCategory('Conditioning');
    const recoveryCount = countCategory('Recovery');

    const groupedWorkouts = workouts.reduce((acc, workout) => {
        const key = workout.activityType;
        if (!acc[key]) acc[key] = [];
        acc[key].push(workout);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">Own Your Grind: Track Every Rep, Every Step</h1>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Fitness Snapshot</h2>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <div className="flex h-6 text-xs font-medium text-white">
                            <div className="bg-blue-500 text-center" style={{ width: `${(cardioCount / totalCount) * 100}%` }}>Cardio</div>
                            <div className="bg-green-500 text-center" style={{ width: `${(strengthCount / totalCount) * 100}%` }}>Strength</div>
                            <div className="bg-yellow-500 text-center" style={{ width: `${(recoveryCount / totalCount) * 100}%` }}>Recovery</div>
                        </div>
                    </div>
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
                    <div key={type} className="mb-4 border rounded-lg overflow-hidden">
                        <div
                            onClick={() => toggleSection(type)}
                            className="cursor-pointer bg-indigo-100 dark:bg-gray-800 px-4 py-2 flex items-center justify-between text-lg font-semibold"
                        >
                            <span>{type} Activities</span>
                            {expandedSections[type] ? <FaChevronDown /> : <FaChevronRight />}
                        </div>
                        {expandedSections[type] && (
                            <table className="w-full text-sm text-left border-t">
                                <thead className="bg-indigo-200 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Sport</th>
                                    <th className="px-4 py-2">Subtype</th>
                                    <th className="px-4 py-2">Duration</th>
                                    <th className="px-4 py-2">Notes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {groupedWorkouts[type].map((workout, idx) => (
                                    <tr key={idx} className="border-t border-gray-300 dark:border-gray-600">
                                        <td className="px-4 py-2">{workout.date}</td>
                                        <td className="px-4 py-2">{workout.sport}</td>
                                        <td className="px-4 py-2">{workout.subtype}</td>
                                        <td className="px-4 py-2">{workout.duration} min</td>
                                        <td className="px-4 py-2">{workout.notes}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ))}

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h3 className="text-xl font-semibold mb-4">Add New Workout</h3>
                            <input name="date" value={form.date} onChange={handleChange} type="date" className="w-full mb-2 p-2 border rounded" required />
                            <select name="activityType" value={form.activityType} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required>
                                <option value="">Select Activity Type</option>
                                {activityTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
                            </select>
                            <select name="sport" value={form.sport} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required>
                                <option value="">Select Sport</option>
                                {sportOptions.map((sport, idx) => <option key={idx} value={sport}>{sport}</option>)}
                            </select>
                            <select name="subtype" value={form.subtype} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
                                <option value="">Select Subtype</option>
                                {(sportSubtypes[form.sport] || []).map((sub, idx) => <option key={idx} value={sub}>{sub}</option>)}
                            </select>
                            <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (minutes)" className="w-full mb-2 p-2 border rounded" />
                            <input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full mb-2 p-2 border rounded" />
                            <div className="flex justify-between">
                                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
                                <button type="button" onClick={() => setShowModal(false)} className="text-red-500 font-semibold">Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutPage;
