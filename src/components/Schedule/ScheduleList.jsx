// src/components/Schedule/ScheduleList.jsx
import React from 'react';

const ScheduleList = ({ schedule }) => {
    if (!schedule.length) return <p>No upcoming events.</p>;

    return (
        <section className="schedule-list">
            <h2>Schedule</h2>
            <ul>
                {schedule.map(({ id, name, location, start_time }) => (
                    <li key={id}>
                        {name} @ {location?.name || 'TBD'} — {new Date(start_time).toLocaleString()}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ScheduleList;