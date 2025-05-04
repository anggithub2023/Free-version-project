// src/components/Analytics/ReflectionHistoryTable.jsx

import React, { useEffect, useState } from 'react';
import { fetchReflections } from '../../services/syncService';

function ReflectionHistoryTable() {
    const [reflections, setReflections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadReflections = async () => {
            try {
                const data = await fetchReflections();
                setReflections(data || []);
            } catch (err) {
                console.error('Failed to fetch reflections:', err.message);
                setReflections([]);
            } finally {
                setLoading(false);
            }
        };

        loadReflections();
    }, []);

    if (loading) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 py-6">
                Loading reflection history...
            </div>
        );
    }

    if (!reflections.length) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 py-6">
                No reflections recorded yet.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Sport</th>
                    <th className="border px-4 py-2">Position</th>
                    <th className="border px-4 py-2">Total</th>
                    <th className="border px-4 py-2">Offense</th>
                    <th className="border px-4 py-2">Defense</th>
                    <th className="border px-4 py-2">Team ID</th>
                    <th className="border px-4 py-2">Focus</th>
                    <th className="border px-4 py-2">Prep</th>
                    <th className="border px-4 py-2">Exec</th>
                    <th className="border px-4 py-2">Bonus</th>
                </tr>
                </thead>
                <tbody>
                {reflections.map((entry, index) => {
                    const scores = entry.scores || {};
                    const created = new Date(entry.created_at || Date.now()).toLocaleDateString();
                    return (
                        <tr key={index} className="text-center hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">
                            <td className="border px-4 py-2">{created}</td>
                            <td className="border px-4 py-2">{entry.sport || '--'}</td>
                            <td className="border px-4 py-2">{entry.position || '--'}</td>
                            <td className="border px-4 py-2">{scores.total ?? '--'}%</td>
                            <td className="border px-4 py-2">{scores.offense ?? '--'}%</td>
                            <td className="border px-4 py-2">{scores.defense ?? '--'}%</td>
                            <td className="border px-4 py-2">{scores.teamIdentity ?? '--'}%</td>
                            <td className="border px-4 py-2">{scores.focus ?? '--'}%</td>
                            <td className="border px-4 py-2">{scores.preparation ?? '--'}%</td>
                            <td className="border px-4 py-2">{scores.execution ?? '--'}%</td>
                            <td className="border px-4 py-2">{scores.bonus ?? '--'}%</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ReflectionHistoryTable;