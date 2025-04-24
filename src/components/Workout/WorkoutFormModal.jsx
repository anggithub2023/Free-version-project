import React, { useState } from 'react';

const activityTypes = ['Sports', 'Run', 'Weight Lifting', 'Conditioning', 'Recovery'];
const sportOptions = ['Basketball', 'Soccer', 'Track', 'Volleyball', 'Baseball', 'Lacrosse', 'Ice Hockey', 'Football', 'Tennis', 'Swimming', 'Golf', 'Wrestling', 'Softball', 'CrossFit', 'Cycling', 'Rowing'];
const runTypes = ['Distance', 'Sprints', 'Intervals', 'Hills', 'Tempo', 'Recovery'];
const recoveryOptions = ['Ice Bath', 'Stretching', 'Foam Rolling', 'Massage', 'Rest Day'];
const conditioningOptions = ['Agility Drills', 'Plyometrics', 'HIIT', 'Circuit Training'];
const muscleGroups = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core'];

const WorkoutFormModal = ({ onClose, onSubmit }) => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['duration', 'miles'];
        if (numericFields.includes(name) && value !== '' && !/^[0-9]*\.?[0-9]*$/.test(value)) return;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({
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
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl">
                <h3 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Add Workout</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select name="activityType" value={form.activityType} onChange={handleChange} className="w-full p-2 rounded border">
                        <option value="">Select Activity Type</option>
                        {activityTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>

                    {form.activityType === 'Sports' && (
                        <>
                            <select name="sport" value={form.sport} onChange={handleChange} className="w-full p-2 rounded border">
                                <option value="">Select Sport</option>
                                {sportOptions.map(sport => <option key={sport} value={sport}>{sport}</option>)}
                            </select>
                            <input type="text" name="subtype" value={form.subtype} onChange={handleChange} placeholder="Subtype (e.g., Game, Practice)" className="w-full p-2 rounded border" />
                        </>
                    )}
                    {form.activityType === 'Run' && (
                        <>
                            <select name="runType" value={form.runType} onChange={handleChange} className="w-full p-2 rounded border">
                                <option value="">Select Run Type</option>
                                {runTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                            <input type="text" name="miles" value={form.miles} onChange={handleChange} placeholder="Miles" className="w-full p-2 rounded border" />
                        </>
                    )}
                    {form.activityType === 'Weight Lifting' && (
                        <select name="muscleGroup" value={form.muscleGroup} onChange={handleChange} className="w-full p-2 rounded border">
                            <option value="">Select Muscle Group</option>
                            {muscleGroups.map(group => <option key={group} value={group}>{group}</option>)}
                        </select>
                    )}
                    {form.activityType === 'Conditioning' && (
                        <select name="conditioningType" value={form.conditioningType} onChange={handleChange} className="w-full p-2 rounded border">
                            <option value="">Select Conditioning Type</option>
                            {conditioningOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    )}
                    {form.activityType === 'Recovery' && (
                        <select name="recoveryType" value={form.recoveryType} onChange={handleChange} className="w-full p-2 rounded border">
                            <option value="">Select Recovery Type</option>
                            {recoveryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    )}

                    <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 rounded border" />
                    <input type="text" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (minutes)" className="w-full p-2 rounded border" />
                    <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full p-2 rounded border" />

                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WorkoutFormModal;

// PAGE NOTES: THIS COMPONENT IS THE MODAL USED FOR ADDING WORKOUTS. IT HANDLES FORM STATE AND VALIDATION, AND PASSES DATA BACK VIA THE onSubmit PROP.
