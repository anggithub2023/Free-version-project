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

import FormField from './FormField';
import FormSelect from './FormSelect';

const initialFormState = {
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
};

const WorkoutFormModal = ({ onClose, onSubmit }) => {
    const [form, setForm] = useState(initialFormState);
    const [error, setError] = useState('');

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

        setError('');
    };

    const validate = () => {
        if (!form.activityType || !form.date || !form.duration) {
            setError('Activity type, date, and duration are required.');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const workoutWithId = { ...form, id: Date.now() };
        onSubmit(workoutWithId);
        setForm(initialFormState);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl">
                <h3 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Add Workout</h3>

                {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormSelect id="activityType" label="Activity Type" options={activityTypes} value={form.activityType} onChange={handleChange} />

                    {form.activityType === 'Sports' && (
                        <>
                            <FormSelect id="sport" label="Sport" options={sportOptions} value={form.sport} onChange={handleChange} />
                            {form.sport && sportSubtypes[form.sport] && (
                                <FormSelect id="subtype" label="Subtype" options={sportSubtypes[form.sport]} value={form.subtype} onChange={handleChange} />
                            )}
                        </>
                    )}

                    {form.activityType === 'Run' && (
                        <>
                            <FormSelect id="runType" label="Run Type" options={runTypes} value={form.runType} onChange={handleChange} />
                            <FormField id="miles" label="Miles" type="text" value={form.miles} onChange={handleChange} />
                        </>
                    )}

                    {form.activityType === 'Weight Lifting' && (
                        <FormSelect id="muscleGroup" label="Muscle Group" options={muscleGroups} value={form.muscleGroup} onChange={handleChange} />
                    )}

                    {form.activityType === 'Conditioning' && (
                        <FormSelect id="conditioningType" label="Conditioning Type" options={conditioningOptions} value={form.conditioningType} onChange={handleChange} />
                    )}

                    {form.activityType === 'Recovery' && (
                        <FormSelect id="recoveryType" label="Recovery Type" options={recoveryOptions} value={form.recoveryType} onChange={handleChange} />
                    )}

                    <FormField id="date" label="Date" type="date" value={form.date} onChange={handleChange} />
                    <FormField id="duration" label="Duration (minutes)" type="text" value={form.duration} onChange={handleChange} />
                    <FormField id="notes" label="Notes" type="textarea" value={form.notes} onChange={handleChange} />

                    <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WorkoutFormModal;