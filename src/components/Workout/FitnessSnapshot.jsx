import React from 'react';

const FitnessSnapshot = ({ workouts }) => {
    const getMetric = (activityType) => {
        const entries = workouts.filter(w => w.activityType === activityType);
        if (!entries.length) return 0;

        let total = 0;
        if (activityType === 'Run') {
            total = entries.reduce((sum, w) => sum + parseFloat(w.miles || 0), 0);
            return Math.min((total / 5) * 100, 100);
        } else if (activityType === 'Weight Lifting') {
            total = entries.length;
            return Math.min((total / 3) * 100, 100);
        } else if (activityType === 'Conditioning') {
            total = entries.reduce((sum, w) => sum + parseFloat(w.duration || 0), 0);
            return Math.min((total / 60) * 100, 100);
        } else if (activityType === 'Recovery') {
            total = entries.length;
            return Math.min((total / 2) * 100, 100);
        }

        return 0;
    };

    const metrics = [
        { name: 'Cardio', value: getMetric('Run') },
        { name: 'Strength', value: getMetric('Weight Lifting') },
        { name: 'Conditioning', value: getMetric('Conditioning') },
        { name: 'Recovery', value: getMetric('Recovery') }
    ];

    return (
        <div className="grid grid-cols-2 gap-4 mb-8">
            {metrics.map((metric, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 text-center">
                    <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">{metric.name}</h4>
                    <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded">
                        <div
                            className="h-full rounded bg-emerald-400 dark:bg-emerald-400"
                            style={{ width: `${metric.value}%` }}
                        ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{metric.value.toFixed(1)}%</p>
                </div>
            ))}
        </div>
    );
};

export default FitnessSnapshot;

// FOOTER NOTES: FITNESS SNAPSHOT RENDERS 4 METRICS BASED ON ACTIVITY TYPES. BAR COLORS USE EMERALD-400 FOR HIGH VISIBILITY IN DARK MODE. VALUES BASED ON CDC-LIKE WEEKLY GOALS.