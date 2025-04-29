const sportFields = {
    basketball: ["Points", "Assists", "Rebounds", "Steals", "Blocks", "Turnovers", "Minutes Played"],

    soccer: position?.toLowerCase() === "goalie"
        ? ["Saves", "Goals Against", "Clean Sheets", "Save Percentage"]
        : ["Goals", "Assists", "Shots on Target", "Tackles Won", "Fouls Committed"],

    football: (() => {
        switch (position?.toLowerCase()) {
            case "quarterback":
                return ["Passing Yards", "Passing TDs", "Completions", "Interceptions Thrown", "Completion Percentage"];
            case "running back":
                return ["Rushing Yards", "Rushing TDs", "Fumbles Lost"];
            case "wide receiver":
                return ["Receiving Yards", "Receiving TDs", "Receptions"];
            case "defensive player":
                return ["Tackles", "Sacks", "Interceptions Caught"];
            default:
                return ["Generic Stat 1", "Generic Stat 2"];
        }
    })(),

    baseball: position?.toLowerCase() === "pitcher"
        ? ["Strikeouts", "ERA", "Walks Allowed", "Innings Pitched"]
        : ["Hits", "Runs", "RBIs", "Home Runs", "Errors"],

    icehockey: position?.toLowerCase() === "goalie"
        ? ["Saves", "Goals Against", "Save Percentage"]
        : ["Goals", "Assists", "Shots on Goal", "Plus/Minus Rating"],

    lacrosse: position?.toLowerCase() === "goalie"
        ? ["Saves", "Goals Against"]
        : ["Goals", "Assists", "Ground Balls", "Faceoffs Won"],

    trackcrosscountry: ["Event Name", "Time", "Placement"],

    golf: ["Round Score", "Pars", "Birdies", "Bogeys", "Fairways Hit", "Greens in Regulation"]
};