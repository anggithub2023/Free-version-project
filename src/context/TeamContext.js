import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
    const location = useLocation();
    const [teamId, setTeamId] = useState(null);
    const [teamName, setTeamName] = useState(null);
    const [coachId, setCoachId] = useState(null);
    const [loading, setLoading] = useState(false);

    // ✅ Extract real teamId from the URL (ignore placeholders)
    useEffect(() => {
        const match = location.pathname.match(/\/team\/([^/]+)/);
        const newId = match && match[1] !== ':teamId' ? match[1] : null;

        if (newId && newId !== teamId) {
            console.log('[TeamContext] Detected teamId:', newId);
            setTeamId(newId);
        }
    }, [location.pathname, teamId]);

    // 🔍 Fetch metadata for the current team
    useEffect(() => {
        const fetchTeamInfo = async () => {
            if (!teamId) return;

            setLoading(true);
            const { data, error } = await supabase
                .from('teams')
                .select('name, created_by')
                .eq('id', teamId)
                .single();

            if (data && !error) {
                setTeamName(data.name);
                setCoachId(data.created_by);
            } else {
                console.warn('[TeamContext] Failed to fetch team data:', error?.message);
            }

            setLoading(false);
        };

        fetchTeamInfo();
    }, [teamId]);

    return (
        <TeamContext.Provider value={{ teamId, setTeamId, teamName, coachId, loading }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeamContext = () => useContext(TeamContext);