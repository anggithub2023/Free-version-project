import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ReflectionPage from './pages/ReflectionPage';
import ReadinessPage from './pages/ReadinessPage';
import InjuryPage from './pages/InjuryPage';
import PlayerStatsPage from './pages/PlayerStatsPage';
import VideosPage from './pages/VideosPage';
import WorkoutsPage from './pages/WorkoutsPage';
import PlayerAnalyticsPage from './pages/PlayerAnalyticsPage';
import DashboardPage from './pages/DashboardPage'; // ✅ FIXED
import useAnonymousUser from './hooks/useAnonymousUser'; // ✅ Hook for generating anonymous user ID

function App() {
    useAnonymousUser(); // ✅ Ensures userId is set once when the app loads

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reflect" element={<ReflectionPage />} />
            <Route path="/readiness" element={<ReadinessPage />} />
            <Route path="/injury" element={<InjuryPage />} />
            <Route path="/playerstats" element={<PlayerStatsPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/analytics" element={<PlayerAnalyticsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
    );
}

export default App;