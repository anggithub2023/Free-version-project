import React from 'react';

const FitnessSnapshot = ({ workouts }) => {
    const totals = workouts.reduce(
        (acc, curr) => {
            const duration = parseFloat(curr.duration) || 0;
            if (curr.activityType === 'Run') acc.cardio += duration;
            else if (curr.activityType === 'Weight Lifting') acc.strength += duration;
            else if (curr.activityType === 'Conditioning') acc.conditioning += duration;
            else if (curr.activityType === 'Recovery') acc.recovery += duration;
            else acc.other += duration;
            return acc;
        },
        { cardio: 0, strength: 0, conditioning: 0, recovery: 0, other: 0 }
    );

    const total =
        totals.cardio + totals.strength + totals.conditioning + totals.recovery + totals.other;

    const getPercentage = (val) => (total ? Math.round((val / total) * 100) : 0);

    const stats = [
        { label: 'Cardio', value: totals.cardio, percent: getPercentage(totals.cardio) },
        { label: 'Strength', value: totals.strength, percent: getPercentage(totals.strength) },
        { label: 'Conditioning', value: totals.conditioning, percent: getPercentage(totals.conditioning) },
        { label: 'Rest', value: totals.recovery, percent: getPercentage(totals.recovery) }
    ];

    return (
        <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300 text-center">
                Fitness Snapshot
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-indigo-100 dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col items-center"
                    >
            <span className="text-md font-semibold text-indigo-800 dark:text-indigo-200">
              {item.label}
            </span>
                        <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full mt-2">
                            <div
                                className="h-3 rounded-full"
                                style={{
                                    width: `${item.percent}%`,
                                    backgroundColor: '#6366F1' // Indigo-500
                                }}
                            ></div>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {item.percent}%
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FitnessSnapshot;

// FOOTER NOTES: FITNESS SNAPSHOT DISPLAYS WORKOUT TYPE RATIOS. USES GRID LAYOUT WITH DARK MODE STYLING. NOW INCLUDES "REST" TILE AND MOBILE-FRIENDLY SQUARE LAYOUT.
