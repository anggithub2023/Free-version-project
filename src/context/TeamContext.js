// src/context/TeamContext.js
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

    // Extract teamId from URL
    useEffect(() => {
        const match = location.pathname.match(/\/team\/([^/]+)/);
        if (match && match[1] !== teamId) {
            setTeamId(match[1]);
        }
    }, [location.pathname, teamId]);

    // Fetch team info when teamId is set
    useEffect(() => {
        const fetchTeamInfo = async () => {
            if (!teamId) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('teams')
                .select('name, created_by')
                .eq('id', teamId)
                .single();

            if (!error && data) {
                setTeamName(data.name);
                setCoachId(data.created_by);
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