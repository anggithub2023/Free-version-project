import React from 'react';

const WorkoutTableSection = ({ type, workouts, expanded, toggleSection }) => {
    const getVisibleColumns = () => {
        switch (type) {
            case 'Run':
                return ['date', 'sport', 'subtype', 'duration', 'miles', 'runType', 'notes'];
            case 'Weight Lifting':
                return ['date', 'sport', 'subtype', 'duration', 'muscleGroup', 'notes'];
            case 'Conditioning':
                return ['date', 'sport', 'subtype', 'duration', 'conditioningType', 'notes'];
            case 'Recovery':
                return ['date', 'sport', 'subtype', 'duration', 'recoveryType', 'notes'];
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
                        </tr>
                        </thead>
                        <tbody>
                        {workouts.map((entry, idx) => (
                            <tr key={idx} className="border-t border-gray-300 dark:border-gray-700">
                                {visibleColumns.map((col) => (
                                    <td key={col} className="px-4 py-2">
                                        {entry[col]}
                                    </td>
                                ))}
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