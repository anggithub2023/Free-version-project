import React, { useState, useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';

const activityTypes = ['Run', 'Weight Lifting', 'Recovery', 'Conditioning', 'Sports'];

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

const muscleGroups = ['Legs', 'Arms', 'Back', 'Chest', 'Shoulders', 'Core'];
const runTypes = ['Distance', 'Sprints', 'Interval', 'Cross Country', 'Hill'];
const conditioningTypes = ['Agility', 'Plyometrics', 'HIIT', 'Circuit'];
const recoveryTypes = ['Stretching', 'Foam Rolling', 'Ice Bath', 'Massage'];

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
            activityType: '', sport: '', subtype: '', date: '', duration: '', notes: '', miles: '',
            muscleGroup: '', runType: '', conditioningType: '', recoveryType: ''
        });
        setShowModal(false);
    };

    const countCategory = (category) => workouts.filter(entry => entry.activityType === category).length;

    const totalCount = workouts.length || 1;
    const cardioCount = countCategory('Run') + countCategory('Sports');
    const strengthCount = countCategory('Weight Lifting') + countCategory('Conditioning');
    const recoveryCount = countCategory('Recovery');

    const groupedWorkouts = workouts.reduce((acc, entry) => {
        if (!acc[entry.activityType]) acc[entry.activityType] = [];
        acc[entry.activityType].push(entry);
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

                {Object.entries(groupedWorkouts).map(([type, entries]) => (
                    <div key={type} className="mb-8">
                        <h3 className="text-xl font-semibold mb-2">{type} Workouts</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                                <thead>
                                <tr className="text-left bg-indigo-100 dark:bg-indigo-900">
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Sport</th>
                                    <th className="px-4 py-2">Subtype</th>
                                    <th className="px-4 py-2">Duration</th>
                                    <th className="px-4 py-2">Notes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {entries.map((w, i) => (
                                    <tr key={i} className="border-t border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-2">{w.date}</td>
                                        <td className="px-4 py-2">{w.sport}</td>
                                        <td className="px-4 py-2">{w.subtype}</td>
                                        <td className="px-4 py-2">{w.duration} min</td>
                                        <td className="px-4 py-2">{w.notes}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-xl">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />

                                <select name="activityType" value={form.activityType} onChange={handleChange} className="w-full p-2 border rounded" required>
                                    <option value="">Select Activity Type</option>
                                    {activityTypes.map(type => <option key={type}>{type}</option>)}
                                </select>

                                {form.activityType === 'Sports' && (
                                    <select name="sport" value={form.sport} onChange={handleChange} className="w-full p-2 border rounded">
                                        <option value="">Select Sport</option>
                                        {sportOptions.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                )}

                                {form.sport && sportSubtypes[form.sport] && (
                                    <select name="subtype" value={form.subtype} onChange={handleChange} className="w-full p-2 border rounded">
                                        <option value="">Select Subtype</option>
                                        {sportSubtypes[form.sport].map(st => <option key={st}>{st}</option>)}
                                    </select>
                                )}

                                {form.activityType === 'Run' && (
                                    <select name="runType" value={form.runType} onChange={handleChange} className="w-full p-2 border rounded">
                                        <option value="">Run Type</option>
                                        {runTypes.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                )}

                                {form.activityType === 'Weight Lifting' && (
                                    <select name="muscleGroup" value={form.muscleGroup} onChange={handleChange} className="w-full p-2 border rounded">
                                        <option value="">Muscle Group</option>
                                        {muscleGroups.map(g => <option key={g}>{g}</option>)}
                                    </select>
                                )}

                                {form.activityType === 'Conditioning' && (
                                    <select name="conditioningType" value={form.conditioningType} onChange={handleChange} className="w-full p-2 border rounded">
                                        <option value="">Conditioning Type</option>
                                        {conditioningTypes.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                )}

                                {form.activityType === 'Recovery' && (
                                    <select name="recoveryType" value={form.recoveryType} onChange={handleChange} className="w-full p-2 border rounded">
                                        <option value="">Recovery Type</option>
                                        {recoveryTypes.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                )}

                                {form.activityType === 'Run' && (
                                    <input name="miles" placeholder="Miles" value={form.miles} onChange={handleChange} className="w-full p-2 border rounded" />
                                )}

                                <input name="duration" placeholder="Duration (min)" value={form.duration} onChange={handleChange} className="w-full p-2 border rounded" />
                                <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} className="w-full p-2 border rounded" />

                                <div className="flex justify-end gap-4">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutPage;
