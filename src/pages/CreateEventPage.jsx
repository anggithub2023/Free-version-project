import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import { useTeamContext } from '../context/TeamContext';
import EventForm from '../components/Schedule/EventForm';

export default function CreateEventPage() {
    const { teamId } = useTeamContext();
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!formData.title || !formData.event_date) {
            setErrorMsg('Title and date are required.');
            return;
        }

        if (!teamId) {
            setErrorMsg('Missing team ID.');
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
            team_id: teamId,
        });

        if (insertErr) {
            setErrorMsg(insertErr.message);
        } else {
            navigate(`/team/${teamId}/dashboard`);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow font-[Poppins]">
            <h2 className="text-2xl font-bold mb-4">Create Event</h2>
            <EventForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
                errorMsg={errorMsg}
            />
        </div>
    );
}