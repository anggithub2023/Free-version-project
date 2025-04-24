import React, { useState } from 'react';

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
        if (numericFields.includes(name) && value !== '' && !/^\d*\.?\d*$/.test(value)) return;
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
                    <input type="text" name="activityType" value={form.activityType} onChange={handleChange} placeholder="Activity Type" className="w-full p-2 rounded border" />
                    <input type="text" name="sport" value={form.sport} onChange={handleChange} placeholder="Sport" className="w-full p-2 rounded border" />
                    <input type="text" name="subtype" value={form.subtype} onChange={handleChange} placeholder="Subtype" className="w-full p-2 rounded border" />
                    <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 rounded border" />
                    <input type="text" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (min)" className="w-full p-2 rounded border" />
                    <input type="text" name="miles" value={form.miles} onChange={handleChange} placeholder="Miles (if run)" className="w-full p-2 rounded border" />
                    <input type="text" name="muscleGroup" value={form.muscleGroup} onChange={handleChange} placeholder="Muscle Group (if weight lifting)" className="w-full p-2 rounded border" />
                    <input type="text" name="runType" value={form.runType} onChange={handleChange} placeholder="Run Type" className="w-full p-2 rounded border" />
                    <input type="text" name="conditioningType" value={form.conditioningType} onChange={handleChange} placeholder="Conditioning Type" className="w-full p-2 rounded border" />
                    <input type="text" name="recoveryType" value={form.recoveryType} onChange={handleChange} placeholder="Recovery Type" className="w-full p-2 rounded border" />
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
