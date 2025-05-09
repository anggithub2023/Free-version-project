import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient'; // adjust if needed

export default function useCurrentIdentity() {
    const [identity, setIdentity] = useState({
        userId: null,
        anonymousId: null,
        anonymousName: ''
    });

    useEffect(() => {
        const resolveIdentity = async () => {
            let userId = localStorage.getItem('userId');
            let anonymousId = localStorage.getItem('anonId');
            let anonymousName = localStorage.getItem('anonName') || '';

            // Try getting user from Supabase auth
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user?.id) {
                    userId = user.id;
                    localStorage.setItem('userId', userId);
                }
            } catch (err) {
                console.warn('Supabase auth getUser failed:', err.message);
            }

            // Fallback to anonymous
            if (!userId) {
                if (!anonymousId) {
                    anonymousId = crypto.randomUUID();
                    localStorage.setItem('anonId', anonymousId);
                }
                if (!anonymousName) {
                    anonymousName = prompt('Enter your name or nickname:') || 'Guest';
                    localStorage.setItem('anonName', anonymousName);
                }
            }

            setIdentity({
                userId,
                anonymousId: userId ? null : anonymousId,
                anonymousName: userId ? null : anonymousName
            });
        };

        resolveIdentity();
    }, []);

    return identity;
}