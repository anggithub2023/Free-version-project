// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';

import HomePage from './pages/HomePage';
import ReflectionPage from './pages/ReflectionPage';
import ReadinessPage from './pages/ReadinessPage';
import InjuryPage from './pages/InjuryPage';
import PlayerStatsPage from './pages/PlayerStatsPage';
import VideosPage from './pages/VideosPage';
import WorkoutsPage from './pages/WorkoutsPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import DashboardPage from './pages/DashboardPage';

import LoginPage from './pages/LoginPage';
import SchedulingDashboard from './pages/SchedulingDashboard';
import CreateEventPage from './pages/CreateEventPage';
import RSVPEventsPage from './pages/RSVPEventsPage';
import CoachEventDashboard from './pages/CoachEventDashboard';
import JoinTeamPage from './pages/JoinTeamPage';
import TeamManagementPage from './pages/TeamManagementPage'; // ✅ Add this

import useAnonymousUser from './hooks/useAnonymousUser';

function App() {
    useAnonymousUser();

    return (
        <AppShell>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/reflect" element={<ReflectionPage />} />
                <Route path="/readiness" element={<ReadinessPage />} />
                <Route path="/injury" element={<InjuryPage />} />
                <Route path="/playerstats" element={<PlayerStatsPage />} />
                <Route path="/videos" element={<VideosPage />} />
                <Route path="/workouts" element={<WorkoutsPage />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* Scheduling */}
                <Route path="/scheduling" element={<SchedulingDashboard />} />
                <Route path="/scheduling/create" element={<CreateEventPage />} />
                <Route path="/scheduling/events" element={<RSVPEventsPage />} />
                <Route path="/scheduling/coach" element={<CoachEventDashboard />} />

                {/* Auth + Teams */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join-team" element={<JoinTeamPage />} />
                <Route path="/team-management" element={<TeamManagementPage />} /> {/* ✅ New Route */}
            </Routes>
        </AppShell>
    );
}

export default App;