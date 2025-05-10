// src/services/teamService.js
const API_BASE = '/teams';

export async function getPlayers(teamId) {
    const res = await fetch(`${API_BASE}/${teamId}/players`);
    if (!res.ok) throw new Error('Failed to fetch players');
    return res.json();
}

export async function getSchedule(teamId) {
    const res = await fetch(`${API_BASE}/${teamId}/schedule?fetch_place_details=true`);
    if (!res.ok) throw new Error('Failed to fetch schedule');
    return res.json();
}

export async function getGames(teamId) {
    const res = await fetch(`${API_BASE}/${teamId}/game-summaries`);
    if (!res.ok) throw new Error('Failed to fetch games');
    return res.json();
}

export async function getUsers(teamId) {
    const res = await fetch(`${API_BASE}/${teamId}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}