// src/components/Users/UsersPanel.jsx
import React from 'react';

const UsersPanel = ({ users }) => {
    if (!users.length) return <p>No team members found.</p>;

    return (
        <section className="users-panel">
            <h2>Team Members</h2>
            <ul>
                {users.map(({ id, full_name, role }) => (
                    <li key={id}>
                        {full_name} {role && `– ${role}`}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default UsersPanel;