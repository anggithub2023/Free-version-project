// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export default function ProtectedRoute({ children, requireCoach = false }) {
    const { profile, loading, error } = useCurrentUserProfile();

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error loading user.</p>;

    if (!profile) return <Navigate to="/login" replace />;
    if (requireCoach && !profile.is_coach) return <Navigate to="/dashboard" replace />;

    return children;
}