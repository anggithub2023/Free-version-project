// src/components/DebugPanel.jsx
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function DebugPanel() {
    const [authUser, setAuthUser] = useState(null);
    const [dbProfile, setDbProfile] = useState(null);
    const [cacheProfile, setCacheProfile] = useState(null);
    const [timestamp, setTimestamp] = useState('');

    useEffect(() => {
        const loadDebugData = async () => {
            const now = new Date().toLocaleTimeString();
            setTimestamp(now);

            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();
            if (user) {
                setAuthUser(user);

                const { data, error: profileErr } = await supabase
                    .from('users_auth')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (!profileErr) {
                    setDbProfile(data);
                }
            }

            const cached = localStorage.getItem('user_profile');
            if (cached) setCacheProfile(JSON.parse(cached));
        };

        loadDebugData();
    }, []);

    const compareProfiles = () => {
        if (!dbProfile || !cacheProfile) return false;

        const { created_at: _, ...dbClean } = dbProfile;
        return JSON.stringify(dbClean) === JSON.stringify(cacheProfile);
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black text-green-300 text-xs p-4 font-mono z-50 border-t border-green-500">
            <div className="flex flex-col gap-1">
                <div>🕓 <strong>Timestamp:</strong> {timestamp}</div>
                <div>🔐 <strong>Auth User:</strong> {authUser?.email || 'None'}</div>
                <div>🧾 <strong>User ID:</strong> {authUser?.id || 'N/A'}</div>
                <div>📂 <strong>Cached Profile:</strong> {cacheProfile ? JSON.stringify(cacheProfile) : 'None'}</div>
                <div>📡 <strong>DB Profile:</strong> {dbProfile ? JSON.stringify(dbProfile) : 'None'}</div>
                {dbProfile?.created_at && (
                    <div>⏱️ <strong>DB created_at:</strong> {dbProfile.created_at}</div>
                )}
                <div>
                    🧪 <strong>Match:</strong>{' '}
                    {dbProfile && cacheProfile
                        ? compareProfiles()
                            ? <span className="text-green-400">✅ Match</span>
                            : <span className="text-yellow-400">⚠️ Mismatch</span>
                        : 'N/A'}
                </div>
            </div>
        </div>
    );
}