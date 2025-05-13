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
    const [showInfo, setShowInfo] = useState(false);

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
            <h1 className="text-3xl font-bold text-center mb-1">Personalize or Restore</h1>
            <div className="text-center mb-6">
                <button
                    onClick={() => setShowInfo(true)}
                    className="text-sm underline text-gray-500 dark:text-gray-400 hover:text-indigo-500"
                >
                    Why personalize?
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
                <h2 className="text-xl font-semibold mb-4 text-center">Save My Progress</h2>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="p-2 rounded border w-full max-w-xs"
                    />
                    <input
                        type="password"
                        placeholder="4-digit PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="p-2 rounded border w-full max-w-xs"
                    />
                </div>
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
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Nickname"
                        value={restoreNickname}
                        onChange={(e) => setRestoreNickname(e.target.value)}
                        className="p-2 rounded border w-full max-w-xs"
                    />
                    <input
                        type="password"
                        placeholder="PIN"
                        value={restorePin}
                        onChange={(e) => setRestorePin(e.target.value)}
                        className="p-2 rounded border w-full max-w-xs"
                    />
                </div>
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

            {/* Modal */}
            {showInfo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
                    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-lg font-bold mb-2">Why Personalize?</h3>
                        <p className="text-sm mb-4">
                            Personalizing your experience lets you save your progress across sessions — even if your device data is cleared.
                        </p>
                        <ul className="text-sm list-disc pl-5 space-y-1 mb-4">
                            <li>Keep track of your reflections and performance</li>
                            <li>Restore your session on any device</li>
                            <li>Get a more personal experience with saved stats and progress</li>
                        </ul>
                        <p className="text-sm mb-4">
                            No email or login needed — just your name and a simple PIN.
                        </p>
                        <div className="text-center">
                            <button
                                onClick={() => setShowInfo(false)}
                                className="text-sm underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-800"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}