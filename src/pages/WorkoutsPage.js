// src/components/WorkoutModal.jsx
import React from 'react';


const WorkoutModal = ({ form, setForm, onClose, onSubmit }) => {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const getDynamicInputs = () => {
        const type = form.activityType;
        const key = type.replace(/\s+/g, '');
        const config = sportWorkoutInputs[key];

        if (!config) return null;

        return config.map((input) => (
            <div key={input.name}>
                <label className="block mb-1 font-medium">{input.label}</label>
                {input.type === 'select' ? (
                    <select
                        name={input.name}
                        value={form[input.name] || ''}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                    >
                        <option value="">Select</option>
                        {input.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={input.type}
                        name={input.name}
                        value={form[input.name] || ''}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                    />
                )}
            </div>
        ));
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 w-full max-w-xl p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Log New Workout</h2>
                <form onSubmit={onSubmit} className="space-y-4">
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
                            <option value="Sports">Sports</option>
                            <option value="Run">Run</option>
                            <option value="Weight Lifting">Weight Lifting</option>
                            <option value="Conditioning">Conditioning</option>
                            <option value="Recovery">Recovery</option>
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
                                    <option value="Basketball">Basketball</option>
                                    <option value="Soccer">Soccer</option>
                                    <option value="Track">Track</option>
                                    <option value="Volleyball">Volleyball</option>
                                    <option value="Ice Hockey">Ice Hockey</option>
                                    <option value="Baseball">Baseball</option>
                                </select>
                            </div>

                            {form.sport && (
                                <div>
                                    <label className="block mb-1 font-medium">Subtype</label>
                                    <input
                                        type="text"
                                        name="subtype"
                                        value={form.subtype || ''}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                                    />
                                </div>
                            )}
                        </>
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

                    {getDynamicInputs()}

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
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
    );
};

export default WorkoutModal;
