import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';

// 🔐 Auth wrappers
import { RequireAuth, RequireCoach } from './routes/ProtectedRoute';

// 🧩 Pages
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.jsx';
import AuthCallback from './pages/AuthCallback.jsx';

import DashboardPage from './pages/DashboardPage.jsx';
import ReflectionPage from './pages/ReflectionPage.js';
import ResultsPage from './pages/ResultsPage.js';
import ReadinessPage from './pages/ReadinessPage.js';

import PlayerStatsPage from './pages/PlayerStatsPage.js';
import AnalyticsDashboard from './pages/AnalyticsDashboard.jsx';
import WorkoutsPage from './pages/WorkoutsPage.js';
import InjuryPage from './pages/InjuryPage.js';
import VideosPage from './pages/VideosPage.js';

import RSVPEventsPage from './pages/RSVPEventsPage.jsx';
import CoachEventDashboard from './pages/CoachEventDashboard.jsx';
import CreateEventPage from './pages/CreateEventPage.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';

import CreateTeamPage from './pages/CreateTeamPage.jsx';
import JoinTeamPage from './pages/JoinTeamPage.jsx';
import TeamManagementPage from './pages/TeamManagementPage.jsx';

import TestSupabase from './pages/TestSupabase.jsx';

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />

                {/* Authenticated Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <RequireAuth>
                            <AppShell><DashboardPage /></AppShell>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/reflection"
                    element={
                        <RequireAuth>
                            <AppShell><ReflectionPage /></AppShell>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/results"
                    element={
                        <RequireAuth>
                            <AppShell><ResultsPage /></AppShell>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/readiness"
                    element={
                        <RequireAuth>
                            <AppShell><ReadinessPage /></AppShell>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/playerstats"
                    element={
                        <RequireAuth>
                            <AppShell><PlayerStatsPage /></AppShell>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/analytics"
                    element={
                        <RequireAuth>
                            <AppShell><AnalyticsDashboard /></AppShell>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/workouts"
                    element={
                        <RequireAuth>
                            <AppShell><WorkoutsPage /></AppShell>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/injury"
                    element={
                        <RequireAuth>
                            <AppShell><InjuryPage /></AppShell>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/videos"
                    element={
                        <RequireAuth>
                            <AppShell><VideosPage /></AppShell>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/scheduling/events"
                    element={
                        <RequireAuth>
                            <AppShell><RSVPEventsPage /></AppShell>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/scheduling/events/:id"
                    element={
                        <RequireAuth>
                            <AppShell><EventDetailPage /></AppShell>
                        </RequireAuth>
                    }
                />

                {/* Coach-only Routes */}
                <Route
                    path="/scheduling/coach"
                    element={
                        <RequireCoach>
                            <AppShell><CoachEventDashboard /></AppShell>
                        </RequireCoach>
                    }
                />
                <Route
                    path="/scheduling/events/create"
                    element={
                        <RequireCoach>
                            <AppShell><CreateEventPage /></AppShell>
                        </RequireCoach>
                    }
                />
                <Route
                    path="/team/create"
                    element={
                        <RequireCoach>
                            <AppShell><CreateTeamPage /></AppShell>
                        </RequireCoach>
                    }
                />
                <Route
                    path="/team/join"
                    element={
                        <RequireCoach>
                            <AppShell><JoinTeamPage /></AppShell>
                        </RequireCoach>
                    }
                />
                <Route
                    path="/team/manage"
                    element={
                        <RequireCoach>
                            <AppShell><TeamManagementPage /></AppShell>
                        </RequireCoach>
                    }
                />

                {/* Dev Tools */}
                <Route
                    path="/test"
                    element={
                        <AppShell><TestSupabase /></AppShell>
                    }
                />
            </Routes>
        </Router>
    );
}