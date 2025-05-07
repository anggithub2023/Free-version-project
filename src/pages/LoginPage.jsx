// src/pages/LoginPage.jsx
import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from '../lib/supabaseClient'; // ✅ RELATIVE
import useAuthRedirect from '../hooks/useAuthRedirect'; // ✅ Add this hook

export default function LoginPage() {
    useAuthRedirect(); // ✅ Automatically redirects on successful login

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