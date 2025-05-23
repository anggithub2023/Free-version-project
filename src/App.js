import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ReflectionPage from './pages/ReflectionPage';
import ProcessPage from './pages/ProcessPage';
import ReadinessPage from './pages/ReadinessPage';
import InjuryPage from './pages/InjuryPage';
import PlayerStatsPage from './pages/PlayerStatsPage';
import VideosPage from './pages/VideosPage';
import WorkoutsPage from './pages/WorkoutsPage';
import PlayerAnalyticsPage from './pages/AnalyticsDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import DashboardPage from './pages/DashboardPage'; //
import PersonalizePage from './pages/PersonalizePage';
import useAnonymousUser from './hooks/useAnonymousUser'; // ✅ Hook for generating anonymous user ID

function App() {
    useAnonymousUser(); // ✅ Ensures userId is set once when the app loads

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reflect" element={<ReflectionPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/readiness" element={<ReadinessPage />} />
            <Route path="/injury" element={<InjuryPage />} />
            <Route path="/playerstats" element={<PlayerStatsPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/analytics" element={<PlayerAnalyticsPage />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/personalize" element={<PersonalizePage />} />
        </Routes>
    );
}

export default App;
