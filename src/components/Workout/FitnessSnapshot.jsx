import React from 'react';

const FitnessSnapshot = ({ workouts }) => {
    const totalDays = 7;
    const muscleGroups = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core'];
    const cardioGoal = 150; // CDC guideline in minutes

    const thisWeek = workouts.slice(-7); // Assuming last 7 entries represent a week
    const strengthSet = new Set();
    let cardioMinutes = 0;
    let recoverySessions = 0;
    let restDays = 0;

    thisWeek.forEach((w) => {
        if (w.activityType === 'Weight Lifting' && w.muscleGroup) strengthSet.add(w.muscleGroup);
        if (w.activityType === 'Run' || w.activityType === 'Conditioning') cardioMinutes += parseFloat(w.duration || 0);
        if (w.activityType === 'Recovery') recoverySessions++;
        if (!w.activityType) restDays++;
    });

    const strengthPct = Math.min((strengthSet.size / muscleGroups.length) * 100, 100);
    const cardioPct = Math.min((cardioMinutes / cardioGoal) * 100, 100);
    const recoveryPct = Math.min((recoverySessions / totalDays) * 100, 100);
    const restPct = Math.min((restDays / totalDays) * 100, 100);

    const tiles = [
        { title: 'Strength', percent: strengthPct },
        { title: 'Cardio', percent: cardioPct },
        { title: 'Recovery', percent: recoveryPct },
        { title: 'Rest', percent: restPct }
    ];

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
            {tiles.map(({ title, percent }) => (
                <div key={title} className="bg-indigo-100 dark:bg-gray-700 rounded-2xl p-4 shadow text-center">
                    <h3 className="font-semibold text-indigo-700 dark:text-indigo-200 mb-2">{title}</h3>
                    <div className="w-full h-3 bg-white dark:bg-gray-800 rounded overflow-hidden">
                        <div
                            className="h-full bg-indigo-600"
                            style={{ width: `${percent}%` }}
                        ></div>
                    </div>
                    <p className="mt-1 text-sm font-medium text-indigo-700 dark:text-indigo-200">{Math.round(percent)}%</p>
                </div>
            ))}
        </div>
    );
};

export default FitnessSnapshot;
