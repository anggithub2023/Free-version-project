// src/components/DebugPanel.jsx
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function DebugPanel() {
    const [authUser, setAuthUser] = useState(null);
    const [dbProfile, setDbProfile] = useState(null);
    const [cacheProfile, setCacheProfile] = useState(null);
    const [diffKeys, setDiffKeys] = useState([]);
    const [timestamp, setTimestamp] = useState('');

    useEffect(() => {
        const loadDebugData = async () => {
            setTimestamp(new Date().toLocaleTimeString());

            const { data: { user }, error } = await supabase.auth.getUser();
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

    const normalize = (obj) => {
        const { created_at, ...rest } = obj || {};
        return rest;
    };

    const findDiffKeys = () => {
        if (!dbProfile || !cacheProfile) return [];

        const a = normalize(dbProfile);
        const b = normalize(cacheProfile);

        return Object.keys({ ...a, ...b }).filter(key => a[key] !== b[key]);
    };

    useEffect(() => {
        setDiffKeys(findDiffKeys());
    }, [dbProfile, cacheProfile]);

    const matchStatus =
        dbProfile && cacheProfile
            ? diffKeys.length === 0
                ? '✅ Match'
                : '⚠️ Mismatch'
            : 'N/A';

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black text-green-300 text-xs p-4 font-mono z-50 border-t border-green-500 max-h-[50vh] overflow-y-auto">
            <div className="flex flex-col gap-1">
                <div>🕓 <strong>Timestamp:</strong> {timestamp}</div>
                <div>🔐 <strong>Auth User:</strong> {authUser?.email || 'None'}</div>
                <div>🧾 <strong>User ID:</strong> {authUser?.id || 'N/A'}</div>
                <div>📂 <strong>Cached Profile:</strong> {cacheProfile ? JSON.stringify(cacheProfile) : 'None'}</div>
                <div>📡 <strong>DB Profile:</strong> {dbProfile ? JSON.stringify(dbProfile) : 'None'}</div>
                <div>🧪 <strong>Match:</strong> {matchStatus}</div>
                {diffKeys.length > 0 && (
                    <div className="text-yellow-400">
                        🔍 <strong>Diff Keys:</strong> {diffKeys.join(', ')}
                    </div>
                )}
                {dbProfile?.created_at && (
                    <div className="text-gray-400">
                        ⏱️ <strong>DB created_at:</strong> {dbProfile.created_at}
                    </div>
                )}
            </div>
        </div>
    );
}