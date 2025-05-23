import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import useAnonymousUser from '../hooks/useAnonymousUser';
import StickyCtaBar from '../components/StickyCtaBar';

export default function PersonalizePage() {
    const navigate = useNavigate();
    const userId = useAnonymousUser();

    const [nickname, setNickname] = useState('');
    const [pin, setPin] = useState('');
    const [restoreNickname, setRestoreNickname] = useState('');
    const [restorePin, setRestorePin] = useState('');
    const [message, setMessage] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSave = async () => {
        if (!nickname || !pin || !userId) {
            setMessage('Nickname, PIN, and User ID are required.');
            return;
        }

        if (!/^\d{4}$/.test(pin)) {
            setMessage('PIN must be exactly 4 digits.');
            return;
        }

        const { data: existing } = await supabase
            .from('identity_links')
            .select('id')
            .eq('nickname', nickname)
            .eq('pin', pin)
            .maybeSingle();

        if (existing) {
            setMessage('That nickname and PIN are already in use.');
            return;
        }

        const { error } = await supabase.from('identity_links').insert([
            { nickname, pin, user_id: userId }
        ]);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            localStorage.setItem('nickname', nickname);
            setShowSuccessModal(true);
            setNickname('');
            setPin('');
            setTimeout(() => {
                setShowSuccessModal(false);
                navigate('/');
            }, 2500);
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
            localStorage.setItem('userId', data.user_id);
            setMessage('✅ Progress restored!');
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white px-6 pt-10 pb-24 font-poppins">
            <h1 className="text-3xl font-bold text-center mb-1">Personalize or Restore</h1>
            <div className="text-center mb-6">
                <button
                    onClick={() => setShowInfo(true)}
                    className="text-sm underline text-gray-500 dark:text-gray-400 hover:text-indigo-500"
                >
                    Why personalize?
                </button>
            </div>

            <div className="max-w-xl w-full mx-auto">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
                    <h2 className="text-xl font-semibold mb-1 text-center">Create My Profile</h2>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
                        This helps us remember who you are and connect your data.
                    </p>
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
                            maxLength={4}
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
                    <h2 className="text-xl font-semibold mb-1 text-center">Restore My Profile</h2>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
                        Enter your nickname and PIN to reconnect your data and continue where you left off.
                    </p>
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
                            maxLength={4}
                        />
                    </div>
                    <button
                        onClick={handleRestore}
                        className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded w-full max-w-xs mx-auto block"
                    >
                        Restore Progress
                    </button>
                </div>
            </div>

            {message && (
                <div
                    className={`text-center text-sm mt-4 ${
                        message.startsWith('✅') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}
                >
                    {message}
                </div>
            )}

            {/* Why personalize modal */}
            {showInfo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
                    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-lg font-bold mb-2">Why Personalize?</h3>
                        <p className="text-sm mb-4">
                            Personalizing your experience lets you save your progress across sessions — even if your device data is
                            cleared.
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

            {/* Success modal after save */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
                    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                        <p className="text-base font-medium">Personalization saved successfully.</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Redirecting to home...</p>
                    </div>
                </div>
            )}

            {/* Sticky Home Button */}
            <StickyCtaBar onHome={() => navigate('/')} />
        </div>
    );
}