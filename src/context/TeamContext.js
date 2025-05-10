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

    // 🔎 Extract teamId from URL path like /team/:teamId/*
    useEffect(() => {
        const match = location.pathname.match(/\/team\/([^/]+)/);
        const extractedId = match?.[1];
        if (extractedId && extractedId !== ':teamId' && extractedId !== teamId) {
            setTeamId(extractedId);
        }
    }, [location.pathname, teamId]);

    // 📡 Fetch team info when teamId changes
    useEffect(() => {
        const fetchTeamInfo = async () => {
            if (!teamId) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('teams')
                .select('name, created_by')
                .eq('id', teamId)
                .single();

            if (data) {
                setTeamName(data.name);
                setCoachId(data.created_by);
            } else {
                console.warn('[TeamContext] Could not load team data:', error?.message);
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