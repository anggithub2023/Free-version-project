import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReflectionPage from './pages/ReflectionPage';
import ReadinessPage from './pages/ReadinessPage';
import InjuryPage from './pages/InjuryPage';
import StatsPage from './pages/StatsPage';
import VideosPage from './pages/VideosPage';
import WorkoutsPage from './pages/WorkoutsPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reflect" element={<ReflectionPage />} />
            <Route path="/readiness" element={<ReadinessPage />} />
            <Route path="/injury" element={<InjuryPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
        </Routes>
    );
}

export default App;
