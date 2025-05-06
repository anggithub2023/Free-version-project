import React, { useState } from 'react';
import { createEvent } from './eventService';
import { useNavigate } from 'react-router-dom';

export default function CreateEventPage() {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createEvent(formData);
            navigate('/schedule');
        } catch (err) {
            alert('Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="input" required />
                <input name="date" type="date" value={formData.date} onChange={handleChange} className="input" required />
                <input name="time" type="time" value={formData.time} onChange={handleChange} className="input" required />
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="input" />
                <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" className="input" />
                <button type="submit" disabled={loading} className="btn btn-primary w-full">
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
}
