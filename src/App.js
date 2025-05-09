import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import ProtectedRoute from './routes/ProtectedRoute';

// ✅ Page imports – all matched with actual file extensions
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
                <Route element={<ProtectedRoute requireAuth />}>
                    <Route path="/dashboard" element={<AppShell><DashboardPage /></AppShell>} />
                    <Route path="/reflection" element={<AppShell><ReflectionPage /></AppShell>} />
                    <Route path="/results" element={<AppShell><ResultsPage /></AppShell>} />
                    <Route path="/readiness" element={<AppShell><ReadinessPage /></AppShell>} />
                    <Route path="/playerstats" element={<AppShell><PlayerStatsPage /></AppShell>} />
                    <Route path="/analytics" element={<AppShell><AnalyticsDashboard /></AppShell>} />
                    <Route path="/workouts" element={<AppShell><WorkoutsPage /></AppShell>} />
                    <Route path="/injury" element={<AppShell><InjuryPage /></AppShell>} />
                    <Route path="/videos" element={<AppShell><VideosPage /></AppShell>} />
                    <Route path="/scheduling/events" element={<AppShell><RSVPEventsPage /></AppShell>} />
                    <Route path="/scheduling/events/:id" element={<AppShell><EventDetailPage /></AppShell>} />
                </Route>

                {/* Coach-only Routes */}
                <Route element={<ProtectedRoute requireCoach />}>
                    <Route path="/scheduling/coach" element={<AppShell><CoachEventDashboard /></AppShell>} />
                    <Route path="/scheduling/events/create" element={<AppShell><CreateEventPage /></AppShell>} />
                    <Route path="/team/create" element={<AppShell><CreateTeamPage /></AppShell>} />
                    <Route path="/team/join" element={<AppShell><JoinTeamPage /></AppShell>} />
                    <Route path="/team/manage" element={<AppShell><TeamManagementPage /></AppShell>} />
                </Route>

                {/* Dev/Testing */}
                <Route path="/test" element={<AppShell><TestSupabase /></AppShell>} />
            </Routes>
        </Router>
    );
}