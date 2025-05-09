<Route element={<RequireAuth />}>
    <Route path="/dashboard" element={<AppShell><DashboardPage /></AppShell>} />
</Route>