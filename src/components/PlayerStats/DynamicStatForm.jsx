import React, { useState } from 'react';

function DynamicStatForm({ sport, position, onSaveStat }) {
    const [formData, setFormData] = useState({});

    const normalizeSport = (sportId) => sportId?.toLowerCase().replace(/[^a-z]/g, '');

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

        icehockey: position === "Goalie"
            ? ["Saves", "Goals Against", "Save Percentage"]
            : ["Goals", "Assists", "Shots on Goal", "Plus/Minus Rating"],

        lacrosse: position === "Goalie"
            ? ["Saves", "Goals Against"]
            : ["Goals", "Assists", "Ground Balls", "Faceoffs Won"],

        trackcrosscountry: ["Event Name", "Time", "Placement"],

        golf: ["Round Score", "Pars", "Birdies", "Bogeys", "Fairways Hit", "Greens in Regulation"]
    };

    const fields = sportFields[normalizeSport(sport)] || [];

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
            setFormData({});
        }
    };

    if (!sport) return <div className="text-center mt-10 text-gray-500">No sport selected yet.</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">
                Log Stats for {sport.charAt(0).toUpperCase() + sport.slice(1)} {position && `- ${position}`}
            </h2>
            {fields.length > 0 ? (
                fields.map((field) => (
                    <div key={field} className="flex flex-col">
                        <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">{field}</label>
                        <input
                            type="number"
                            name={field}
                            value={formData[field] || ""}
                            onChange={handleChange}
                            className="border rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-400
                              bg-white dark:bg-gray-700 dark:border-gray-400 dark:text-white
                              placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder={field}
                        />
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500">No input fields configured for this sport yet.</div>
            )}

            {/* Save and Clear Buttons */}
            <div className="flex gap-4 mt-6">
                <button
                    type="submit"
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
                >
                    Save Stats
                </button>

                <button
                    type="button"
                    onClick={() => setFormData({})}
                    className="flex-1 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg"
                >
                    Clear
                </button>
            </div>
        </form>
    );
}

export default DynamicStatForm;
