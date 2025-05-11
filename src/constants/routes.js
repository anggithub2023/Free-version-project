// src/constants/routes.js

export const ROUTES = {
    LOGIN: '/login',
    SIGNUP: '/signup',
    COACH_DASHBOARD: '/coach-dashboard',
    PLAYER_DASHBOARD: '/player-dashboard',
    TEAM_DASHBOARD: (teamId = ':teamId') => `/team/${teamId}`,
    CREATE_EVENT: '/create-event',
    VIDEOS: '/videos',
    RESULTS: '/results',
    WORKOUTS: '/workouts',
    CREATE_TEAM: '/create-team',
    COACH_PROFILE: '/coach-profile',
};