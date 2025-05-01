// src/pages/TestSupabase.jsx
import React, { useEffect } from 'react';
import supabase from '../lib/supabaseClient';

const TestSupabase = () => {
    useEffect(() => {
        const testConnection = async () => {
            const { data, error } = await supabase.from('users').select('*');
            if (error) {
                console.error('❌ Supabase error:', error.message);
            } else {
                console.log('✅ Supabase users:', data);
            }
        };
        testConnection();
    }, []);

    return (
        <div className="p-6 text-center text-gray-700 dark:text-gray-300">
            <h1 className="text-xl font-bold">Testing Supabase connection…</h1>
            <p>Check the console 👇</p>
        </div>
    );
};

export default TestSupabase;