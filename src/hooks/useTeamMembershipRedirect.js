// src/hooks/useTeamMembershipRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useTeamMembershipRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkMembership = async () => {
            const { data: authData, error: userErr } = await supabase.auth.getUser();
            const user = authData?.user;

            if (!user || userErr) {
                console.warn('No authenticated user found.');
                return;
            }

            const { data: memberships, error: fetchErr } = await supabase
                .from('team_memberships')
                .select('team_id')
                .eq('user_id', user.id);

            if (fetchErr) {
                console.error('Error checking team memberships:', fetchErr.message);
                return;
            }

            if (!memberships || memberships.length === 0) {
                navigate('/get-started');
            } else if (memberships.length === 1) {
                navigate(`/team/${memberships[0].team_id}/dashboard`);
            }
            // Else: stay on current route or show a picker later
        };

        checkMembership();
    }, [navigate]);
}