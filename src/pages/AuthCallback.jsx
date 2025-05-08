import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                // 🔁 Let the auth redirect logic handle routing
                navigate('/dashboard');
            } else {
                navigate('/login');
            }
        };

        checkSession();
    }, [navigate]);

    return <p className="text-center mt-10">Verifying login...</p>;
}