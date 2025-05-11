import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import { TeamProvider } from './context/TeamContext';

// ✅ Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; // 👈 New route
import DashboardPage from './pages/DashboardPage';
import ReflectionPage from './pages/ReflectionPage';
import ReadinessPage from './pages/ReadinessPage';
import InjuryPage from './pages/InjuryPage';
import PlayerStatsPage from './pages/PlayerStatsPage';
import VideosPage from './pages/VideosPage';
import WorkoutsPage from './pages/WorkoutsPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import ResultsPage from './pages/ResultsPage';
import CreateEventPage from './pages/CreateEventPage';
import RSVPEventPage from './pages/RSVPEventPage';
import TeamDashboard from './pages/TeamDashboard';
import CoachEventDashboard from './pages/CoachEventDashboard';
import CreateTeamPage from './pages/CreateTeamPage';
import JoinTeamPage from './pages/JoinTeamPage'; // 👈 Optional

export default function App() {
    return (
        <TeamProvider>
            <AppShell>
                <Routes>
                    {/* 🌐 Public */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} /> {/* 👈 New */}

                    {/* 📊 Core Pages */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/reflect" element={<ReflectionPage />} />
                    <Route path="/readiness" element={<ReadinessPage />} />
                    <Route path="/injury" element={<InjuryPage />} />
                    <Route path="/playerstats" element={<PlayerStatsPage />} />
                    <Route path="/videos" element={<VideosPage />} />
                    <Route path="/workouts" element={<WorkoutsPage />} />
                    <Route path="/analytics" element={<AnalyticsDashboard />} />
                    <Route path="/results" element={<ResultsPage />} />

                    {/* 🧠 Scheduling + Teams */}
                    <Route path="/team/:teamId/dashboard" element={<TeamDashboard />} />
                    <Route path="/team/:teamId/events/create" element={<CreateEventPage />} />
                    <Route path="/team/:teamId/events/:eventId" element={<RSVPEventPage />} />
                    <Route path="/team/:teamId/events/admin" element={<CoachEventDashboard />} />

                    {/* 👥 Team management */}
                    <Route path="/create-team" element={<CreateTeamPage />} />
                    <Route path="/join-team" element={<JoinTeamPage />} />

                    {/* ❌ 404 fallback */}
                    <Route path="*" element={<div className="p-6 text-center">Page not found</div>} />
                </Routes>
            </AppShell>
        </TeamProvider>
    );
}