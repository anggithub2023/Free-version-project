import React from 'react';
import { FaHeartbeat, FaDumbbell, FaSpa } from 'react-icons/fa';

const FitnessSnapshot = ({ workouts }) => {
    const calculateCategoryScore = (category) => {
        const count = workouts.filter(w => w.activityType === category).length;
        return Math.min(100, count * 10);
    };

    const data = [
        { label: 'Cardio', value: calculateCategoryScore('Run'), icon: <FaHeartbeat className="text-indigo-500" /> },
        { label: 'Strength', value: calculateCategoryScore('Weight Lifting'), icon: <FaDumbbell className="text-emerald-500" /> },
        { label: 'Recovery', value: calculateCategoryScore('Recovery'), icon: <FaSpa className="text-sky-500" /> }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {data.map(({ label, value, icon }) => (
                <div
                    key={label}
                    className="bg-white dark:bg-gray-900 bg-opacity-70 shadow-lg rounded-xl p-4 flex items-center justify-between"
                >
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
                            {icon} {label}
                        </div>
                        <div className="relative w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full mt-2">
                            <div
                                className={`h-3 rounded-full ${
                                    label === 'Cardio' ? 'bg-indigo-500' :
                                        label === 'Strength' ? 'bg-emerald-500' :
                                            'bg-sky-500'
                                }`}
                                style={{ width: `${value}%`, transition: 'width 0.6s ease-in-out' }}
                            ></div>
                        </div>
                        <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">{value}%</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FitnessSnapshot;

// NOTES: THIS COMPONENT PROVIDES A SNAPSHOT BAR FOR RUN, WEIGHT LIFTING, AND RECOVERY ACTIVITY TYPES. IT TAKES `workouts` PROP FROM WORKOUTPAGE. THE BARS REFLECT PARTICIPATION LEVELS. COLOR-CODED AND ANIMATED FOR MODERN UX.
