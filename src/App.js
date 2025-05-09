import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import ProtectedRoute from './routes/ProtectedRoute';

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

export default function App() {
    return (
        <Router>
            <AppShell>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />

                    {/* Authenticated Routes */}
                    <Route element={<ProtectedRoute requireAuth />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/reflection" element={<ReflectionPage />} />
                        <Route path="/results" element={<ResultsPage />} />
                        <Route path="/readiness" element={<ReadinessPage />} />
                        <Route path="/playerstats" element={<PlayerStatsPage />} />
                        <Route path="/analytics" element={<AnalyticsDashboard />} />
                        <Route path="/workouts" element={<WorkoutsPage />} />
                        <Route path="/injury" element={<InjuryPage />} />
                        <Route path="/videos" element={<VideosPage />} />

                        <Route path="/scheduling/events" element={<RSVPEventsPage />} />
                        <Route path="/scheduling/events/:id" element={<EventDetailPage />} />
                    </Route>

                    {/* Coach-only Routes */}
                    <Route element={<ProtectedRoute requireCoach />}>
                        <Route path="/scheduling/coach" element={<CoachEventDashboard />} />
                        <Route path="/scheduling/events/create" element={<CreateEventPage />} />
                        <Route path="/team/create" element={<CreateTeamPage />} />
                        <Route path="/team/join" element={<JoinTeamPage />} />
                        <Route path="/team/manage" element={<TeamManagementPage />} />
                    </Route>

                    {/* Dev tools */}
                    <Route path="/test" element={<TestSupabase />} />
                </Routes>
            </AppShell>
        </Router>
    );
}