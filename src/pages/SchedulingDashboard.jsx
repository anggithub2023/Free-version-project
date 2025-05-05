// src/pages/SchedulingDashboard.jsx
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/schedulingService';
import EventList from '../components/Scheduling/EventList';
import StickyCtaBar from '../components/StickyCtaBar';
import { useNavigate } from 'react-router-dom';

export default function SchedulingDashboard() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchEvents();
                setEvents(data);
            } catch (err) {
                console.error('Error loading events:', err);
            }
        };
        loadEvents();

        const font = document.createElement('link');
        font.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
        font.rel = 'stylesheet';
        document.head.appendChild(font);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white px-4 py-6 font-['Inter']">
            <h1 className="text-3xl font-bold mb-4 text-center">Team Schedule</h1>
            <EventList events={events} />

            <StickyCtaBar
                onSubmit={() => navigate('/scheduling/new')}
                onDownload={() => alert('Download coming soon')}
                onHome={() => navigate('/')}
                onFeedback={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSeopJAyVo6uA4CEKw0bVEbgTEDHwQr2S8Xev17D1KkUZcFDIQ/viewform', '_blank')}
            />
        </div>
    );
}
