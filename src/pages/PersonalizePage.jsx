import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import useAnonymousUser from '../hooks/useAnonymousUser';

export default function PersonalizePage() {
    const navigate = useNavigate();
    const userId = useAnonymousUser();

    const [nickname, setNickname] = useState('');
    const [pin, setPin] = useState('');
    const [restoreNickname, setRestoreNickname] = useState('');
    const [restorePin, setRestorePin] = useState('');
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        if (!nickname || !pin || !userId) {
            setMessage('Nickname, PIN, and User ID are required.');
            return;
        }

        const { error } = await supabase.from('identity_links').insert([
            { nickname, pin, user_id: userId }
        ]);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            localStorage.setItem('nickname', nickname);
            setMessage('✅ Personalization saved successfully.');
        }
    };

    const handleRestore = async () => {
        const { data, error } = await supabase
            .from('identity_links')
            .select('user_id')
            .eq('nickname', restoreNickname)
            .eq('pin', restorePin)
            .single();

        if (error || !data) {
            setMessage('❌ Could not find a matching record.');
        } else {
            localStorage.setItem('uuid', data.user_id);
            setMessage('✅ Progress restored!');
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white px-6 py-10 font-poppins">
            <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
                Personalize or Restore
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
                <h2 className="text-xl font-semibold mb-4 text-center">Save My Progress</h2>
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full max-w-xs mx-auto mb-3 p-2 rounded border"
                />
                <input
                    type="password"
                    placeholder="4-digit PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full max-w-xs mx-auto mb-3 p-2 rounded border"
                />
                <button
                    onClick={handleSave}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded w-full max-w-xs mx-auto block"
                >
                    Save Personalization
                </button>
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400 my-4">— OR —</div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
                <h2 className="text-xl font-semibold mb-4 text-center">Restore My Progress</h2>
                <input
                    type="text"
                    placeholder="Nickname"
                    value={restoreNickname}
                    onChange={(e) => setRestoreNickname(e.target.value)}
                    className="w-full max-w-xs mx-auto mb-3 p-2 rounded border"
                />
                <input
                    type="password"
                    placeholder="PIN"
                    value={restorePin}
                    onChange={(e) => setRestorePin(e.target.value)}
                    className="w-full max-w-xs mx-auto mb-3 p-2 rounded border"
                />
                <button
                    onClick={handleRestore}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded w-full max-w-xs mx-auto block"
                >
                    Restore Progress
                </button>
            </div>

            {message && (
                <div className="text-center text-sm text-red-600 dark:text-red-400 mt-2">{message}</div>
            )}

            <div className="mt-8 text-center">
                <button
                    onClick={() => navigate('/')}
                    className="text-sm underline text-gray-600 dark:text-gray-300 hover:text-indigo-500"
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    );
}