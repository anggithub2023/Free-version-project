// pages/join.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function JoinTeamPage() {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        const joinWithToken = async () => {
            const token = router.query.token as string;

            if (!token) {
                setStatus('Missing invite token.');
                setLoading(false);
                return;
            }

            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                setStatus('You must be logged in to accept an invite.');
                setLoading(false);
                return;
            }

            const { error } = await supabase.rpc('accept_invite', { token });

            if (error) {
                console.error(error);
                setStatus(`Error accepting invite: ${error.message}`);
                setLoading(false);
                return;
            }

            // Success
            router.push('/dashboard');
        };

        joinWithToken();
    }, [router.query.token]);

    return (
        <div style={{ padding: 32, textAlign: 'center' }}>
            <h1>Joining Team...</h1>
            {loading ? (
                <p>Please wait, processing your invite.</p>
            ) : (
                <p style={{ color: status?.startsWith('Error') ? 'red' : 'green' }}>
                    {status}
                </p>
            )}
        </div>
    );
}