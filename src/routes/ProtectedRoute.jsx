// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export function RequireAuth() {
    const { profile, loading } = useCurrentUserProfile();

    if (loading) return <p className="text-center p-8">🔄 Authenticating...</p>;
    if (!profile) return <Navigate to="/login" />;

    return <Outlet />;
}

export function RequireCoach() {
    const { profile, loading } = useCurrentUserProfile();

    if (loading) return <p className="text-center p-8">🔄 Checking access...</p>;
    if (!profile?.is_coach) return <Navigate to="/scheduling/events" />;

    return <Outlet />;
}