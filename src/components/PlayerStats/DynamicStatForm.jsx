import React, { useState } from 'react';

function DynamicStatForm({ sport, position, onSaveStat }) {
    const [formData, setFormData] = useState({});

    const sportFields = {
        basketball: ["Points", "Assists", "Rebounds", "Steals", "Blocks", "Turnovers", "Minutes Played"],

        soccer: position === "Goalie"
            ? ["Saves", "Goals Against", "Clean Sheets", "Save Percentage"]
            : ["Goals", "Assists", "Shots on Target", "Tackles Won", "Fouls Committed"],

        football: (() => {
            switch (position) {
                case "Quarterback":
                    return ["Passing Yards", "Passing TDs", "Completions", "Interceptions Thrown", "Completion Percentage"];
                case "Running Back":
                    return ["Rushing Yards", "Rushing TDs", "Fumbles Lost"];
                case "Wide Receiver":
                    return ["Receiving Yards", "Receiving TDs", "Receptions"];
                case "Defensive Player":
                    return ["Tackles", "Sacks", "Interceptions Caught"];
                default:
                    return ["Generic Stat 1", "Generic Stat 2"];
            }
        })(),

        baseball: position === "Pitcher"
            ? ["Strikeouts", "ERA", "Walks Allowed", "Innings Pitched"]
            : ["Hits", "Runs", "RBIs", "Home Runs", "Errors"],

        iceHockey: position === "Goalie"
            ? ["Saves", "Goals Against", "Save Percentage"]
            : ["Goals", "Assists", "Shots on Goal", "Plus/Minus Rating"],

        lacrosse: position === "Goalie"
            ? ["Saves", "Goals Against"]
            : ["Goals", "Assists", "Ground Balls", "Faceoffs Won"],

        trackCrossCountry: ["Event Name", "Time", "Placement"],

        golf: ["Round Score", "Pars", "Birdies", "Bogeys", "Fairways Hit", "Greens in Regulation"]
    };

    const fields = sportFields[sport?.toLowerCase()] || [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSaveStat) {
            onSaveStat({
                date: new Date().toISOString(),
                sport,
                position: position || "General Player",
                stats: formData
            });
            setFormData({}); // reset after save
        }
    };

    if (!sport) return <div className="text-center">No sport selected yet.</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">
                Log Stats for {sport} {position && `- ${position}`}
            </h2>
            {fields.map((field) => (
                <div key={field} className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">{field}</label>
                    <input
                        type="number"
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                        className="border rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-400"
                    />
                </div>
            ))}
            <button
                type="submit"
                className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
            >
                Save Stats
            </button>
        </form>
    );
}

export default DynamicStatForm;
