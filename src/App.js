import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import { RequireAuth, RequireCoach } from './routes/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AuthCallback from './pages/AuthCallback';

import DashboardPage from './pages/DashboardPage';
import ReflectionPage from './pages/ReflectionPage';
import ResultsPage from './pages/ResultsPage';
import ReadinessPage from './pages/ReadinessPage';

import PlayerStatsPage from './pages/PlayerStatsPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import WorkoutsPage from './pages/WorkoutsPage';
import InjuryPage from './pages/InjuryPage';
import VideosPage from './pages/VideosPage';

import RSVPEventsPage from './pages/RSVPEventsPage';
import CoachEventDashboard from './pages/CoachEventDashboard';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailPage from './pages/EventDetailPage';

import CreateTeamPage from './pages/CreateTeamPage';
import JoinTeamPage from './pages/JoinTeamPage';
import TeamManagementPage from './pages/TeamManagementPage';

import TestSupabase from './pages/TestSupabase';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />

                {/* Authenticated */}
                <Route element={<RequireAuth />}>
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

                {/* Coach-only */}
                <Route element={<RequireCoach />}>
                    <Route path="/scheduling/coach" element={<AppShell><CoachEventDashboard /></AppShell>} />
                    <Route path="/scheduling/events/create" element={<AppShell><CreateEventPage /></AppShell>} />
                    <Route path="/team/create" element={<AppShell><CreateTeamPage /></AppShell>} />
                    <Route path="/team/join" element={<AppShell><JoinTeamPage /></AppShell>} />
                    <Route path="/team/manage" element={<AppShell><TeamManagementPage /></AppShell>} />
                </Route>

                {/* Misc */}
                <Route path="/test" element={<AppShell><TestSupabase /></AppShell>} />
            </Routes>
        </Router>
    );
}

export default App;