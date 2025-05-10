// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';

// 🧠 Global Context
import { TeamProvider } from './context/TeamContext';

// 📄 Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ReflectionPage from './pages/ReflectionPage';
import ReadinessPage from './pages/ReadinessPage';
import InjuryPage from './pages/InjuryPage';
import PlayerStatsPage from './pages/PlayerStatsPage';
import VideosPage from './pages/VideosPage';
import WorkoutsPage from './pages/WorkoutsPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

import LoginPage from './pages/LoginPage';
import AuthCallback from './pages/AuthCallback';
import GetStartedPage from './pages/GetStartedPage';

import RSVPEventsPage from './pages/RSVPEventsPage';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailPage from './pages/EventDetailPage';
import CoachEventDashboard from './pages/CoachEventDashboard';

import CreateTeamPage from './pages/CreateTeamPage';
import JoinTeamPage from './pages/JoinTeamPage';
import TeamManagementPage from './pages/TeamManagementPage';
import TeamDashboard from './pages/TeamDashboard';

import TestSupabase from './pages/TestSupabase';

export default function App() {
    return (
        <TeamProvider>
            <AppShell>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="/get-started" element={<GetStartedPage />} />

                    {/* Core App Pages */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/reflect" element={<ReflectionPage />} />
                    <Route path="/readiness" element={<ReadinessPage />} />
                    <Route path="/injury" element={<InjuryPage />} />
                    <Route path="/playerstats" element={<PlayerStatsPage />} />
                    <Route path="/videos" element={<VideosPage />} />
                    <Route path="/workouts" element={<WorkoutsPage />} />
                    <Route path="/analytics" element={<AnalyticsDashboard />} />

                    {/* Scheduling Features */}
                    <Route path="/scheduling/events" element={<RSVPEventsPage />} />
                    <Route path="/scheduling/events/create" element={<CreateEventPage />} />
                    <Route path="/scheduling/events/:id" element={<EventDetailPage />} />
                    <Route path="/scheduling/coach" element={<CoachEventDashboard />} />

                    {/* Team Management */}
                    <Route path="/team/create" element={<CreateTeamPage />} />
                    <Route path="/team/join" element={<JoinTeamPage />} />
                    <Route path="/team/manage" element={<TeamManagementPage />} />
                    <Route path="/team/:teamId/dashboard" element={<TeamDashboard />} />

                    {/* Developer / QA */}
                    <Route path="/test" element={<TestSupabase />} />
                </Routes>
            </AppShell>
        </TeamProvider>
    );
}