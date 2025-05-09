// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export function RequireAuth() {
    const { profile, loading, error } = useCurrentUserProfile();

    if (loading) {
        return <p className="text-center p-8">🔄 Authenticating...</p>;
    }

    if (error || !profile) {
        console.error('Auth error or no profile:', error);
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export function RequireCoach() {
    const { profile, loading, error } = useCurrentUserProfile();

    if (loading) {
        return <p className="text-center p-8">🔄 Checking access...</p>;
    }

    if (error || !profile?.is_coach) {
        console.warn('Coach access denied or error:', error);
        return <Navigate to="/scheduling/events" />;
    }

    return <Outlet />;
}