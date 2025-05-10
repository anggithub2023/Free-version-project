// src/pages/CreateEventPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function CreateEventPage() {
    const [formData, setFormData] = useState({
        title: '',
        event_date: '',
        event_time: '',
        location: '',
        event_type: '',
        opponent: '',
        notes: '',
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!formData.title || !formData.event_date) {
            setErrorMsg('Title and date are required.');
            return;
        }

        setLoading(true);
        const { data, error: userErr } = await supabase.auth.getUser();
        const user = data?.user;

        if (userErr || !user) {
            setErrorMsg('Authentication error.');
            setLoading(false);
            return;
        }

        const { error: insertErr } = await supabase.from('events').insert({
            ...formData,
            created_by: user.id,
            team_id: 'replace-with-your-team-id', // Replace when dynamic
        });

        if (insertErr) {
            setErrorMsg(insertErr.message);
            setLoading(false);
            return;
        }

        navigate('/dashboard');
        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow font-[Poppins]">
            <h2 className="text-2xl font-bold mb-4">Create Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    type="text"
                    placeholder="Event Title *"
                    className="w-full border p-2"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    name="event_date"
                    type="date"
                    className="w-full border p-2"
                    value={formData.event_date}
                    onChange={handleChange}
                    required
                />
                <input
                    name="event_time"
                    type="time"
                    className="w-full border p-2"
                    value={formData.event_time}
                    onChange={handleChange}
                />
                <input
                    name="location"
                    type="text"
                    placeholder="Location (optional)"
                    className="w-full border p-2"
                    value={formData.location}
                    onChange={handleChange}
                />
                <select
                    name="event_type"
                    className="w-full border p-2"
                    value={formData.event_type}
                    onChange={handleChange}
                >
                    <option value="">Event Type (optional)</option>
                    <option value="game">Game</option>
                    <option value="practice">Practice</option>
                    <option value="meeting">Meeting</option>
                    <option value="other">Other</option>
                </select>
                {formData.event_type === 'game' && (
                    <input
                        name="opponent"
                        type="text"
                        placeholder="Opponent (optional)"
                        className="w-full border p-2"
                        value={formData.opponent}
                        onChange={handleChange}
                    />
                )}
                <textarea
                    name="notes"
                    placeholder="Notes (optional)"
                    className="w-full border p-2"
                    value={formData.notes}
                    onChange={handleChange}
                />
                {errorMsg && <p className="text-red-600">{errorMsg}</p>}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
}