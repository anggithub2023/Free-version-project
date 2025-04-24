import React from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const WorkoutTableSection = ({ type, entries, isExpanded, toggleSection }) => {
    const hasRun = entries.some(entry => entry.runType);
    const hasMiles = entries.some(entry => entry.miles);
    const hasMuscleGroup = entries.some(entry => entry.muscleGroup);
    const hasConditioning = entries.some(entry => entry.conditioningType);
    const hasRecovery = entries.some(entry => entry.recoveryType);

    return (
        <div className="mb-4">
            <button
                className="flex justify-between items-center w-full bg-indigo-100 dark:bg-gray-800 px-4 py-2 font-semibold rounded"
                onClick={() => toggleSection(type)}
            >
                <span>{type}</span>
                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </button>
            {isExpanded && (
                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700">
                        <thead>
                        <tr className="bg-indigo-200 dark:bg-gray-700">
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Sport</th>
                            <th className="px-4 py-2">Subtype</th>
                            <th className="px-4 py-2">Duration</th>
                            {hasMiles && <th className="px-4 py-2">Miles</th>}
                            {hasMuscleGroup && <th className="px-4 py-2">Muscle Group</th>}
                            {hasRun && <th className="px-4 py-2">Run Type</th>}
                            {hasConditioning && <th className="px-4 py-2">Conditioning Type</th>}
                            {hasRecovery && <th className="px-4 py-2">Recovery Type</th>}
                            <th className="px-4 py-2">Notes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {entries.map((entry, idx) => (
                            <tr key={idx} className="border-t border-gray-300 dark:border-gray-700">
                                <td className="px-4 py-2">{entry.date}</td>
                                <td className="px-4 py-2">{entry.sport}</td>
                                <td className="px-4 py-2">{entry.subtype}</td>
                                <td className="px-4 py-2">{entry.duration}</td>
                                {hasMiles && <td className="px-4 py-2">{entry.miles}</td>}
                                {hasMuscleGroup && <td className="px-4 py-2">{entry.muscleGroup}</td>}
                                {hasRun && <td className="px-4 py-2">{entry.runType}</td>}
                                {hasConditioning && <td className="px-4 py-2">{entry.conditioningType}</td>}
                                {hasRecovery && <td className="px-4 py-2">{entry.recoveryType}</td>}
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
