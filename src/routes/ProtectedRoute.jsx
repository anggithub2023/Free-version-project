import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export default function ProtectedRoute({ requireCoach = false, requireAuth = true }) {
    const { profile, loading, error } = useCurrentUserProfile();

    // 🔁 Still loading – don't render/redirect yet
    if (loading) {
        return <div className="text-center p-8">🔐 Authenticating...</div>;
    }

    // ❌ Auth error (optional)
    if (error) {
        console.error("Profile error:", error);
        return <Navigate to="/login" />;
    }

    // 🧑‍💻 Not authenticated
    if (requireAuth && !profile) {
        return <Navigate to="/login" />;
    }

    // 🧑‍🏫 Not a coach (when required)
    if (requireCoach && !profile?.is_coach) {
        return <Navigate to="/scheduling/events" />;
    }

    // ✅ Access granted
    return <Outlet />;
}