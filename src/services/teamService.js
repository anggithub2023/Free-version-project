const API_BASE = '/teams';

// Fetch players for a team
export async function getPlayers(teamId) {
    const res = await fetch(`${API_BASE}/${teamId}/players`);
    if (!res.ok) throw new Error('Failed to fetch players');
    return res.json();
}

// Fetch schedule for a team
export async function getSchedule(teamId) {
    const res = await fetch(`${API_BASE}/${teamId}/schedule?fetch_place_details=true`);
    if (!res.ok) throw new Error('Failed to fetch schedule');
    return res.json();
}

// Fetch game summaries for a team
export async function getGames(teamId) {
    const res = await fetch(`${API_BASE}/${teamId}/game-summaries`);
    if (!res.ok) throw new Error('Failed to fetch games');
    return res.json();
}

// Fetch users on a team
export async function getUsers(teamId) {
    const res = await fetch(`${API_BASE}/${teamId}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}

// Create a new team
export async function createTeam(data) {
    const res = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Failed to create team');
    return res.json();
}