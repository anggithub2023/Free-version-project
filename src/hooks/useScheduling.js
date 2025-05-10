// src/hooks/useScheduling.js
import { useEffect, useState, useCallback } from 'react';
import {
    getAllEventsWithRSVPs,
    getUpcomingEvents,
    submitRSVP,
    createEvent,
    updateEvent,
    getEventById,
} from '../services/schedulingService';

export function useScheduling({ view = 'coach' } = {}) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🌀 Load all events depending on view
    const loadEvents = useCallback(async () => {
        setLoading(true);
        try {
            const data = view === 'coach'
                ? await getAllEventsWithRSVPs()
                : await getUpcomingEvents();
            setEvents(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Error loading events');
        } finally {
            setLoading(false);
        }
    }, [view]);

    // 🔁 Initial load
    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    return {
        events,
        loading,
        error,
        reload: loadEvents,
        createEvent,
        updateEvent,
        submitRSVP,
        getEventById,
    };
}