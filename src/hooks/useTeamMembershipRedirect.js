import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useTeamMembershipRedirect() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const redirectIfNoTeam = async () => {
            const { data: session } = await supabase.auth.getSession();
            const userId = session?.session?.user?.id;

            if (!userId) {
                setLoading(false);
                return;
            }

            const { data: memberships, error } = await supabase
                .from('team_memberships')
                .select('team_id')
                .eq('user_id', userId);

            if (error) {
                console.error('Error fetching team memberships:', error.message);
                setLoading(false);
                return;
            }

            // ⬇️ Finish loading first, THEN redirect
            setLoading(false);

            if (!memberships?.length) {
                navigate('/create-team');
            }
        };

        redirectIfNoTeam();
    }, [navigate]);

    return loading;
}