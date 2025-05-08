import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from '../lib/supabaseClient';
import useAuthRedirect from '../hooks/useAuthRedirect';

export default function LoginPage() {
    useAuthRedirect();

    // 🔍 Debug current auth session on component mount
    useEffect(() => {
        supabase.auth.getSession().then(({ data, error }) => {
            if (error) {
                console.error('Session error:', error.message);
            } else if (data?.session) {
                console.log('✅ Session active:', data.session);
            } else {
                console.log('ℹ️ No active session.');
            }
        });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
                    Coach Login
                </h1>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={[]}
                    theme="default"
                    magicLink
                />
            </div>
        </div>
    );
}