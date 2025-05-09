import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export default function ProtectedRoute({ requireCoach = false, requireAuth = true }) {
    const { profile, loading, error } = useCurrentUserProfile();

    if (loading) {
        return <div className="text-center p-8">🔄 Loading...</div>;
    }

    if (error) {
        console.error("User profile load error:", error);
        return <Navigate to="/login" />;
    }

    // Redirect if auth required and no profile
    if (requireAuth && !profile) {
        return <Navigate to="/login" />;
    }

    // Redirect if coach access required and user isn't a coach
    if (requireCoach && !profile?.is_coach) {
        return <Navigate to="/scheduling/events" />;
    }

    return <Outlet />;
}