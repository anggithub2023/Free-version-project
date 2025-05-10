// src/components/Schedule/EventForm.jsx
import React from 'react';

export default function EventForm({
                                      formData,
                                      setFormData,
                                      onSubmit,
                                      loading,
                                      errorMsg,
                                  }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 font-[Poppins]">
            <input
                name="title"
                type="text"
                placeholder="Event Title *"
                className="w-full border p-2 rounded"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <input
                name="event_date"
                type="date"
                className="w-full border p-2 rounded"
                value={formData.event_date}
                onChange={handleChange}
                required
            />
            <input
                name="event_time"
                type="time"
                className="w-full border p-2 rounded"
                value={formData.event_time}
                onChange={handleChange}
            />
            <input
                name="location"
                type="text"
                placeholder="Location (optional)"
                className="w-full border p-2 rounded"
                value={formData.location}
                onChange={handleChange}
            />
            <select
                name="event_type"
                className="w-full border p-2 rounded"
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
                    className="w-full border p-2 rounded"
                    value={formData.opponent}
                    onChange={handleChange}
                />
            )}
            <textarea
                name="notes"
                placeholder="Notes (optional)"
                className="w-full border p-2 rounded"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
            />
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? 'Saving...' : 'Submit Event'}
            </button>
        </form>
    );
}