// src/components/DebugPanel.jsx
import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function DebugPanel() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [teamId, setTeamId] = useState(null);

    useEffect(() => {
        const run = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (user) setUser(user);
        };

        const cachedProfile = localStorage.getItem('user_profile');
        if (cachedProfile) setProfile(JSON.parse(cachedProfile));

        const cachedTeamId = localStorage.getItem('team_id');
        if (cachedTeamId) setTeamId(cachedTeamId);

        run();
    }, []);

    return (
        <div className="bg-black text-white text-xs p-4 border-t border-gray-700 font-mono">
            <div className="mb-2 font-bold text-green-400">🧪 Debug Panel</div>
            <div><strong>Auth User:</strong> {user ? user.email : 'None'}</div>
            <div><strong>User ID:</strong> {user?.id || 'N/A'}</div>
            <div><strong>Cached Profile:</strong> {profile ? JSON.stringify(profile) : 'None'}</div>
            <div><strong>Team ID:</strong> {teamId || 'N/A'}</div>
            <div className="mt-2">
                <button
                    onClick={() => {
                        supabase.auth.signOut();
                        localStorage.clear();
                        window.location.reload();
                    }}
                    className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                >
                    🚪 Sign Out + Clear Cache
                </button>
            </div>
        </div>
    );
}