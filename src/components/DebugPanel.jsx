import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function DebugPanel() {
    const [authUser, setAuthUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [localProfile, setLocalProfile] = useState(null);
    const [teamId, setTeamId] = useState(null);

    useEffect(() => {
        const run = async () => {
            const { data: { user }, error: userErr } = await supabase.auth.getUser();
            if (userErr) {
                console.error('❌ Supabase User Error:', userErr.message);
                return;
            }
            setAuthUser(user);

            const { data, error } = await supabase
                .from('users_auth')
                .select('*')
                .eq('id', user.id)
                .single();
            if (error) {
                console.error('❌ Profile Fetch Error:', error.message);
            } else {
                setProfile(data);
            }

            setLocalProfile(JSON.parse(localStorage.getItem('user_profile')));
            setTeamId(localStorage.getItem('team_id'));
        };
        run();
    }, []);

    return (
        <div className="fixed bottom-0 right-0 w-[380px] max-h-[90vh] bg-black text-white text-xs p-4 overflow-auto shadow-xl z-50 font-mono">
            <h2 className="text-yellow-400 font-bold mb-2">🛠 Debug Panel</h2>
            <pre className="mb-2"><b>Auth User:</b> {JSON.stringify(authUser, null, 2)}</pre>
            <pre className="mb-2"><b>Supabase Profile:</b> {JSON.stringify(profile, null, 2)}</pre>
            <pre className="mb-2"><b>localStorage Profile:</b> {JSON.stringify(localProfile, null, 2)}</pre>
            <pre><b>Cached team_id:</b> {teamId}</pre>
        </div>
    );
}