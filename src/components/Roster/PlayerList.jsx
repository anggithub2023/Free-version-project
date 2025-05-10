// src/components/Roster/PlayerList.jsx
import React from 'react';

const PlayerList = ({ players }) => {
    if (!players.length) return <p>No players found.</p>;

    return (
        <section className="player-list">
            <h2>Players</h2>
            <ul>
                {players.map(({ id, name, jersey_number, position }) => (
                    <li key={id}>
                        #{jersey_number || '–'} – {name} {position && `(${position})`}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PlayerList;