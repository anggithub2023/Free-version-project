import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import ReflectionPage from './pages/ReflectionPage';
import CreateTeamPage from './pages/CreateTeamPage';
import JoinTeamPage from './pages/JoinTeamPage';
import TeamSubDashboard from './pages/TeamSubDashboard';
import CreateEventPage from './pages/CreateEventPage';
import CoachEventDashboard from './pages/CoachEventDashboard';
import RSVPEventPage from './pages/RSVPEventPage';
import PlayerStatsPage from './pages/PlayerStatsPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import WorkoutsPage from './pages/WorkoutsPage';
import InjuryPage from './pages/InjuryPage';
import VideosPage from './pages/VideosPage';
import ResultsPage from './pages/ResultsPage';
import CoachProfilePage from './pages/CoachProfilePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import GetStartedPage from './pages/GetStartedPage';
import CoachDashboard from './pages/CoachDashboard';


export default function App() {
    // ⛔ Uncomment if using route guards via redirect (e.g. from /coach-dashboard)
    // useTeamMembershipRedirect();

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/reflect" element={<ReflectionPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Coach or Authenticated User Routes */}
                <Route path="/coach-dashboard" element={<CoachDashboard />} />
                <Route path="/team/:teamId/admin" element={<TeamSubDashboard />} />
                <Route path="/team/:teamId/events/create" element={<CreateEventPage />} />
                <Route path="/team/:teamId/events/admin" element={<CoachEventDashboard />} />
                <Route path="/team/:teamId/events/:eventId/rsvp" element={<RSVPEventPage />} />
                <Route path="/team/:teamId/players" element={<PlayerStatsPage />} />

                {/* Utilities */}
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                <Route path="/workouts" element={<WorkoutsPage />} />
                <Route path="/injury" element={<InjuryPage />} />
                <Route path="/videos" element={<VideosPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/coach-profile" element={<CoachProfilePage />} />

                {/* Team Management */}
                <Route path="/create-team" element={<CreateTeamPage />} />
                <Route path="/join-team" element={<JoinTeamPage />} />
                <Route path="/get-started" element={<GetStartedPage />} />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}