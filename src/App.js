import ProtectedRoute from './routes/ProtectedRoute';

<Route path="/scheduling/coach" element={
    <ProtectedRoute requireCoach>
        <CoachEventDashboard />
    </ProtectedRoute>
} />

<Route path="/scheduling/events/create" element={
    <ProtectedRoute requireCoach>
        <CreateEventPage />
    </ProtectedRoute>
} />

<Route path="/team-management" element={
    <ProtectedRoute requireCoach>
        <TeamManagementPage />
    </ProtectedRoute>
} />

{/* Player Routes (just authenticated) */}
<Route path="/scheduling/events" element={
    <ProtectedRoute>
        <RSVPEventsPage />
    </ProtectedRoute>
} />

<Route path="/scheduling/events/:id" element={
    <ProtectedRoute>
        <EventDetailPage />
    </ProtectedRoute>
} />