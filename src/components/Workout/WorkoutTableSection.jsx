import React from 'react';
import { FaTrash } from 'react-icons/fa';

const WorkoutTableSection = ({ type, workouts, expanded, toggleSection, onDelete }) => {
    const getVisibleColumns = () => {
        switch (type) {
            case 'Run':
                return ['date', 'duration', 'miles', 'runType', 'notes'];
            case 'Weight Lifting':
                return ['date', 'duration', 'muscleGroup', 'notes'];
            case 'Conditioning':
                return ['date', 'duration', 'conditioningType', 'notes'];
            case 'Recovery':
                return ['date', 'duration', 'recoveryType', 'notes'];
            case 'Sports':
            default:
                return ['date', 'sport', 'subtype', 'duration', 'notes'];
        }
    };

    const visibleColumns = getVisibleColumns();

    const columnLabels = {
        date: 'Date',
        sport: 'Sport',
        subtype: 'Subtype',
        duration: 'Duration',
        miles: 'Miles',
        muscleGroup: 'Muscle Group',
        runType: 'Run Type',
        conditioningType: 'Conditioning Type',
        recoveryType: 'Recovery Type',
        notes: 'Notes',
    };

    return (
        <div className="mb-4">
            <button
                className="flex justify-between items-center w-full bg-indigo-100 dark:bg-gray-800 px-4 py-2 font-semibold rounded"
                onClick={() => toggleSection(type)}
            >
                <span>{type}</span>
                <span>{expanded ? '▲' : '▼'}</span>
            </button>

            {expanded && (
                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700">
                        <thead>
                        <tr className="bg-indigo-200 dark:bg-gray-700">
                            {visibleColumns.map((col) => (
                                <th key={col} className="px-4 py-2">
                                    {columnLabels[col]}
                                </th>
                            ))}
                            <th className="px-4 py-2">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {workouts.map((entry) => (
                            <tr key={entry.id} className="border-t border-gray-300 dark:border-gray-700">
                                {visibleColumns.map((col) => (
                                    <td key={col} className="px-4 py-2">
                                        {entry[col]}
                                    </td>
                                ))}
                                <td className="px-4 py-2 text-center">
                                    <button onClick={() => onDelete(entry.id)}>
                                        <FaTrash className="text-red-600 hover:text-red-800" />
                                    </button>
                                </td>
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