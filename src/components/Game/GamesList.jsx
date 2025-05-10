// src/components/Games/GamesList.jsx
import React from 'react';

const GamesList = ({ games }) => {
    if (!games.length) return <p>No games found.</p>;

    return (
        <section className="games-list">
            <h2>Game Summaries</h2>
            <ul>
                {games.map(({ id, opponent_name, result, team_score, opponent_score, date }) => (
                    <li key={id}>
                        vs {opponent_name || 'Unknown'} — {result || 'N/A'}
                        ({team_score} - {opponent_score}) on {new Date(date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default GamesList;