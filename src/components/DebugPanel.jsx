// src/components/DebugPanel.jsx
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function DebugPanel() {
    const [authUser, setAuthUser] = useState(null);
    const [dbProfile, setDbProfile] = useState(null);
    const [cacheProfile, setCacheProfile] = useState(null);

    useEffect(() => {
        const loadDebugData = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user) {
                setAuthUser(user);
                const { data } = await supabase
                    .from('users_auth')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                if (data) setDbProfile(data);
            }

            updateCacheProfile(); // Initial load
        };

        const updateCacheProfile = () => {
            const cached = localStorage.getItem('user_profile');
            setCacheProfile(cached ? JSON.parse(cached) : null);
        };

        loadDebugData();

        // Listen for localStorage changes
        window.addEventListener('storage', updateCacheProfile);

        return () => {
            window.removeEventListener('storage', updateCacheProfile);
        };
    }, []);

    const matchStatus =
        dbProfile && cacheProfile
            ? JSON.stringify(dbProfile) === JSON.stringify(cacheProfile)
                ? '✅ Match'
                : '⚠️ Mismatch'
            : 'N/A';

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black text-green-300 text-xs p-4 font-mono z-50 border-t border-green-500">
            <div className="flex flex-col gap-1">
                <div>🔐 <strong>Auth User:</strong> {authUser?.email || 'None'}</div>
                <div>🧾 <strong>User ID:</strong> {authUser?.id || 'N/A'}</div>
                <div>📂 <strong>Cached Profile:</strong> {cacheProfile ? JSON.stringify(cacheProfile) : 'None'}</div>
                <div>📡 <strong>DB Profile:</strong> {dbProfile ? JSON.stringify(dbProfile) : 'None'}</div>
                <div>🧪 <strong>Match:</strong> {matchStatus}</div>
            </div>
        </div>
    );
}