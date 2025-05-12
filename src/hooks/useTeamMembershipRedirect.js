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

            if (!userId) return;

            const { data: memberships, error } = await supabase
                .from('team_memberships')
                .select('team_id')
                .eq('user_id', userId);

            if (error) {
                console.error('Error fetching team memberships:', error.message);
            }

            if (!memberships?.length) {
                navigate('/create-team');
            }

            setLoading(false);
        };

        redirectIfNoTeam();
    }, [navigate]);

    return loading;
}