import React from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const WorkoutTableSection = ({ type = 'Other', workouts = [], expanded = false, toggleSection = () => {} }) => {
    if (!Array.isArray(workouts)) return null;

    return (
        <div className="mb-4">
            <button
                className="flex justify-between items-center w-full bg-indigo-100 dark:bg-gray-800 px-4 py-2 font-semibold rounded"
                onClick={() => toggleSection(type)}
            >
                <span>{type}</span>
                {expanded ? <MdExpandLess /> : <MdExpandMore />}
            </button>

            {expanded && (
                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700">
                        <thead>
                        <tr className="bg-indigo-200 dark:bg-gray-700">
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Sport</th>
                            <th className="px-4 py-2">Subtype</th>
                            <th className="px-4 py-2">Duration</th>
                            <th className="px-4 py-2">Miles</th>
                            <th className="px-4 py-2">Muscle Group</th>
                            <th className="px-4 py-2">Run Type</th>
                            <th className="px-4 py-2">Conditioning Type</th>
                            <th className="px-4 py-2">Recovery Type</th>
                            <th className="px-4 py-2">Notes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {workouts.map((entry, idx) => (
                            <tr key={idx} className="border-t border-gray-300 dark:border-gray-700">
                                <td className="px-4 py-2">{entry.date}</td>
                                <td className="px-4 py-2">{entry.sport}</td>
                                <td className="px-4 py-2">{entry.subtype}</td>
                                <td className="px-4 py-2">{entry.duration}</td>
                                <td className="px-4 py-2">{entry.miles}</td>
                                <td className="px-4 py-2">{entry.muscleGroup}</td>
                                <td className="px-4 py-2">{entry.runType}</td>
                                <td className="px-4 py-2">{entry.conditioningType}</td>
                                <td className="px-4 py-2">{entry.recoveryType}</td>
                                <td className="px-4 py-2">{entry.notes}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default WorkoutTableSection;