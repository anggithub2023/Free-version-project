export default function ScheduleList({ events = [] }) {
    if (!Array.isArray(events)) {
        console.warn('Expected events to be an array, received:', events);
        return null;
    }

    return (
        <ul>
            {events.map((event) => (
                <li key={event.id}>{event.name}</li> // adjust to your structure
            ))}
        </ul>
    );
}