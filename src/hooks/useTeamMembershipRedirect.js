import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useTeamMembershipRedirect() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const redirectIfNoTeam = async () => {
            try {
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                const userId = sessionData?.session?.user?.id;

                if (!userId || sessionError) {
                    console.warn('No user session found');
                    setLoading(false);
                    return;
                }

                const { data: memberships, error: fetchError } = await supabase
                    .from('team_memberships')
                    .select('team_id')
                    .eq('user_id', userId);

                if (fetchError) {
                    console.error('Error fetching team memberships:', fetchError.message);
                }

                if (!memberships || memberships.length === 0) {
                    navigate('/create-team');
                }
            } catch (err) {
                console.error('Unexpected error in useTeamMembershipRedirect:', err);
            } finally {
                setLoading(false);
            }
        };

        redirectIfNoTeam();
    }, [navigate]);

    return loading;
}