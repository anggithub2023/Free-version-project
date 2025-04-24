import React, { useState } from 'react';
import {
    activityTypes,
    sportOptions,
    sportSubtypes,
    runTypes,
    recoveryOptions,
    conditioningOptions,
    muscleGroups
} from '../../constants/workoutConstants';

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

        if (name === 'activityType') {
            setForm({
                ...form,
                activityType: value,
                sport: '',
                subtype: '',
                miles: '',
                muscleGroup: '',
                runType: '',
                conditioningType: '',
                recoveryType: ''
            });
        } else if (name === 'sport') {
            setForm({ ...form, sport: value, subtype: '' });
        } else {
            setForm({ ...form, [name]: value });
        }
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
                                {sportOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>

                            {form.sport && sportSubtypes[form.sport] && (
                                <select name="subtype" value={form.subtype} onChange={handleChange} className="w-full p-2 rounded border">
                                    <option value="">Select Subtype</option>
                                    {sportSubtypes[form.sport].map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                </select>
                            )}
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
                            {conditioningOptions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    )}

                    {form.activityType === 'Recovery' && (
                        <select name="recoveryType" value={form.recoveryType} onChange={handleChange} className="w-full p-2 rounded border">
                            <option value="">Select Recovery Type</option>
                            {recoveryOptions.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    )}

                    <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 rounded border" />
                    <input type="text" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (min)" className="w-full p-2 rounded border" />
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

// FOOTER NOTES:
// THIS COMPONENT RENDERS A MODAL FORM FOR ADDING A WORKOUT ENTRY
// FIELDS CHANGE DYNAMICALLY BASED ON THE SELECTED ACTIVITY TYPE
// OPTIONS AND LOGIC ARE IMPORTED FROM /constants/workoutConstants.js
