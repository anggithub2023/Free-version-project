// src/pages/CreateEventPage.jsx
import React, { useState } from 'react';
import { createEvent } from '../services/schedulingService';
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
            navigate('/scheduling');
        } catch (err) {
            alert('❌ Failed to create event');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 font-['Inter'] text-gray-800 dark:text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    required
                />
                <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    required
                />
                <input
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    required
                />
                <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Notes"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 min-h-[100px]"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition"
                >
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
}