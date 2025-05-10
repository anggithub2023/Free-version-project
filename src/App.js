// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import { TeamProvider } from './context/TeamContext';

// ✅ Confirmed Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ReflectionPage from './pages/ReflectionPage';
import ReadinessPage from './pages/ReadinessPage';
import InjuryPage from './pages/InjuryPage';
import PlayerStatsPage from './pages/PlayerStatsPage';
import VideosPage from './pages/VideosPage';
import WorkoutsPage from './pages/WorkoutsPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import ResultsPage from './pages/ResultsPage';

export default function App() {
    return (
        <TeamProvider>
            <AppShell>
                <Routes>
                    {/* Public */}
                    <Route path="/" element={<HomePage />} />

                    {/* Core Pages */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/reflect" element={<ReflectionPage />} />
                    <Route path="/readiness" element={<ReadinessPage />} />
                    <Route path="/injury" element={<InjuryPage />} />
                    <Route path="/playerstats" element={<PlayerStatsPage />} />
                    <Route path="/videos" element={<VideosPage />} />
                    <Route path="/workouts" element={<WorkoutsPage />} />
                    <Route path="/analytics" element={<AnalyticsDashboard />} />
                    <Route path="/results" element={<ResultsPage />} />
                </Routes>
            </AppShell>
        </TeamProvider>
    );
}