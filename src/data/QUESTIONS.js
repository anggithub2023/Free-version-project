const QUESTIONS = {
    // 🏀 Basketball
    basketball: {
        offense: [
            "Did I get into the paint before taking a shot?",
            "Did we move the ball with at least three passes before taking a shot?",
            "Did I take smart shots — ones we practice?",
            "Did I make the 'one more' pass when a teammate was more open?",
            "Did I keep proper spacing and timing in our offense?",
            "Did I stay patient and allow plays to develop before rushing?",
            "Did I handle the ball confidently under pressure?",
            "Did I create good scoring opportunities for my teammates?"
        ],
        defense: [
            "Did I stay in a stance and contest every shot?",
            "Did I talk on defense — on screens and switches?",
            "Did I help on defense and recover to my man?",
            "Did I box out and go for every rebound?",
            "Did I close out under control and avoid fouling shooters?",
            "Did I maintain effort on every defensive possession?",
            "Did I apply ball pressure without fouling?",
            "Did I force tough shots or turnovers by sticking to our defensive principles?"
        ],
        teamIdentity: [
            "Was I a great teammate — vocal, positive, and unselfish?",
            "Did I communicate on defense (screens, cutters, switches)?",
            "Did I give full effort — including hustle plays, box-outs, and deflections?",
            "Did I avoid bad turnovers, such as lazy passes or over-dribbling?",
            "Did I support my teammates on and off the court?",
            "Did I hold myself accountable to our team principles?",
            "Did I stay locked in and focused even when off the ball or on the bench?",
            "Did I bring positive energy to the team throughout the session?"
        ]
    },

    // ⚽ Soccer Player
    soccer: {
        offense: [
            "Did I create scoring chances through smart movement?",
            "Did I make unselfish passes in the final third?",
            "Did I keep my head up and find open teammates?",
            "Did I avoid forced or low-percentage shots?",
            "Did I time my runs correctly to stay onside?",
            "Did I support the attack with intelligent spacing?",
            "Did I control the ball under pressure?",
            "Did I stay composed in front of goal?"
        ],
        defense: [
            "Did I track back quickly after losing the ball?",
            "Did I stay goal-side and mark my assignment?",
            "Did I communicate with teammates on defense?",
            "Did I apply pressure without fouling?",
            "Did I anticipate passes and intercept?",
            "Did I stay disciplined in our shape?",
            "Did I clear the ball with purpose?",
            "Did I recover quickly after a mistake?"
        ],
        teamIdentity: [
            "Did I hustle consistently and set the tone?",
            "Did I communicate positively on and off the ball?",
            "Did I show respect to coaches and teammates?",
            "Did I help others reset after mistakes?",
            "Did I stay coachable throughout the session?",
            "Did I show leadership through action?",
            "Did I celebrate team success over individual glory?",
            "Did I bring energy and intensity to practice or game?"
        ]
    },

    // ⚽ Soccer Goalie
    "soccer-goalie": {
        offense: [
            "Did I distribute the ball accurately under pressure?",
            "Did I start counterattacks quickly and smartly?",
            "Did I offer clear outlet options for defenders?"
        ],
        defense: [
            "Did I communicate early and loudly with defenders?",
            "Did I challenge crosses effectively?",
            "Did I stay focused throughout long stretches without action?"
        ],
        teamIdentity: [
            "Did I boost team morale vocally and by example?",
            "Did I quickly reset the team after conceding a goal?",
            "Did I stay positive and composed under pressure?"
        ]
    },

    // 🏈 Football Player
    football: {
        offense: [
            "Did I execute my assignment with precision?",
            "Did I protect the ball and avoid turnovers?",
            "Did I communicate with my teammates on the line or in the huddle?",
            "Did I make smart decisions under pressure?",
            "Did I finish plays with full effort?",
            "Did I adjust to the defense effectively?",
            "Did I block or support teammates when I wasn’t the ball carrier?",
            "Did I run crisp, purposeful routes?"
        ],
        defense: [
            "Did I maintain alignment and responsibility?",
            "Did I stay physical without committing penalties?",
            "Did I wrap up and finish tackles?",
            "Did I communicate pre-snap and during the play?",
            "Did I pursue the ball with relentless effort?",
            "Did I respond well to mistakes and recover?",
            "Did I play with intensity from snap to whistle?",
            "Did I disrupt the offense’s rhythm effectively?"
        ],
        teamIdentity: [
            "Did I hold myself and others accountable?",
            "Did I stay mentally tough through adversity?",
            "Did I support the team regardless of my role?",
            "Did I maintain discipline and focus?",
            "Did I show leadership by example?",
            "Did I respect coaches, officials, and opponents?",
            "Did I put the team’s success first?",
            "Did I bring positive energy to the sidelines?"
        ]
    },

    // 🏈 Football Quarterback
    "football-quarterback": {
        offense: [
            "Did I quickly read the defense pre-snap?",
            "Did I make smart, accurate throws under pressure?",
            "Did I manage the game tempo effectively?"
        ],
        defense: [
            "Did I protect the ball from risky throws?",
            "Did I recognize defensive shifts and blitzes fast?",
            "Did I stay composed after turnovers or mistakes?"
        ],
        teamIdentity: [
            "Did I inspire teammates with calm leadership?",
            "Did I take ownership of team execution?",
            "Did I maintain emotional composure regardless of score?"
        ]
    },

    // ⚾ Baseball Player
    baseball: {
        offense: [
            "Did I make solid contact at the plate?",
            "Did I advance runners when possible?",
            "Did I have quality at-bats regardless of outcome?",
            "Did I communicate with base coaches and teammates?",
            "Did I use good baserunning instincts?",
            "Did I stay patient and disciplined at the plate?",
            "Did I execute bunts or situational hitting when called upon?",
            "Did I stay aggressive but smart on the bases?"
        ],
        defense: [
            "Did I make routine plays on defense?",
            "Did I back up throws and plays when needed?",
            "Did I stay focused every pitch?",
            "Did I communicate with teammates in the field?",
            "Did I support the pitcher with strong defense?",
            "Did I keep throws accurate and quick?",
            "Did I adjust my positioning based on the hitter and situation?",
            "Did I anticipate plays instead of reacting late?"
        ],
        teamIdentity: [
            "Did I encourage teammates after plays?",
            "Did I show hustle on and off the field?",
            "Did I stay mentally locked in between innings?",
            "Did I maintain a positive attitude regardless of my stats?",
            "Did I act as a leader through actions and words?",
            "Did I respect umpires, coaches, and opponents at all times?",
            "Did I lift teammates up after mistakes?",
            "Did I show appreciation for teammates' efforts and successes?"
        ]
    },

    // ⚾ Baseball Pitcher
    "baseball-pitcher": {
        offense: [
            "Did I stay aggressive while pitching smart?",
            "Did I control pitch location and selection under pressure?",
            "Did I attack hitters early in counts?"
        ],
        defense: [
            "Did I field my position cleanly (bunts, grounders)?",
            "Did I back up bases properly on throws?",
            "Did I hold runners effectively to prevent steals?"
        ],
        teamIdentity: [
            "Did I stay composed after giving up hits/runs?",
            "Did I communicate clearly with catchers and infielders?",
            "Did I project positive energy to the team from the mound?"
        ]
    },

    // 🏒 Ice Hockey Skater
    "iceHockey-skater": {
        offense: [
            "Did I keep the puck moving with smart passes?",
            "Did I crash the net after shots?",
            "Did I support the puck carrier with good positioning?",
            "Did I shoot with purpose and accuracy?",
            "Did I create space through movement or picks?",
            "Did I win puck battles in the offensive zone?",
            "Did I avoid turnovers in key moments?",
            "Did I communicate with linemates effectively?"
        ],
        defense: [
            "Did I stay between my man and the net?",
            "Did I maintain stick discipline and avoid penalties?",
            "Did I block shots and disrupt passing lanes?",
            "Did I communicate on defensive shifts?",
            "Did I clear the crease and protect the goalie?",
            "Did I win battles along the boards?",
            "Did I backcheck with full effort?",
            "Did I stay calm under pressure in the D-zone?"
        ],
        teamIdentity: [
            "Did I stay positive and composed?",
            "Did I contribute to team energy and communication?",
            "Did I play with heart and hustle every shift?",
            "Did I focus on team goals over stats?",
            "Did I respond to coaching feedback?",
            "Did I stay locked in on the bench?",
            "Did I lead by example with effort and discipline?",
            "Did I encourage teammates in tough moments?"
        ]
    },

    // 🏒 Ice Hockey Goalie
    "iceHockey-goalie": {
        offense: [
            "Did I make smart outlet passes to start transition?",
            "Did I help maintain puck control by safe handling behind the net?",
            "Did I support quick counterattacks with decisions?"
        ],
        defense: [
            "Did I maintain rebound control after saves?",
            "Did I stay square and calm under high pressure?",
            "Did I communicate to defense clearly during scrambles?"
        ],
        teamIdentity: [
            "Did I encourage defenders after breakdowns?",
            "Did I show calmness and leadership after goals allowed?",
            "Did I stay fully engaged for the full 60 minutes?"
        ]
    },

    // 🥍 Lacrosse Field Player
    "lacrosse-field-player": {
        offense: [
            "Did I create space effectively for my teammates?",
            "Did I pass accurately under pressure?",
            "Did I take high-percentage shots?",
            "Did I move off the ball to support the offense?",
            "Did I ride hard after turnovers?",
            "Did I dodge smartly without forcing plays?",
            "Did I maintain good field spacing?",
            "Did I make the extra pass to create a better shot?"
        ],
        defense: [
            "Did I maintain good defensive positioning?",
            "Did I communicate with teammates about slides and picks?",
            "Did I stay low and play strong 1v1 defense?",
            "Did I hustle back in transition defense?",
            "Did I check responsibly without overcommitting?",
            "Did I stay between my man and the goal?",
            "Did I support off-ball with smart help defense?",
            "Did I clear the ball cleanly after turnovers?"
        ],
        teamIdentity: [
            "Did I encourage and support teammates vocally?",
            "Did I show resilience after mistakes?",
            "Did I maintain high energy throughout the session?",
            "Did I demonstrate leadership on and off the field?",
            "Did I celebrate my teammates' successes?",
            "Did I respect the referees, coaches, and opponents?",
            "Did I stay mentally focused all game?",
            "Did I contribute positively to our team culture?"
        ]
    },

    // 🥍 Lacrosse Goalie
    "lacrosse-goalie": {
        offense: [
            "Did I start clears quickly and accurately?",
            "Did I communicate outlet options clearly to teammates?",
            "Did I assist the offense with smart ball distribution?"
        ],
        defense: [
            "Did I maintain proper stance and positioning?",
            "Did I make saves I was expected to make?",
            "Did I communicate the defensive setup vocally?",
            "Did I react quickly on rebounds and loose balls?"
        ],
        teamIdentity: [
            "Did I show leadership from the crease?",
            "Did I stay calm and composed after goals allowed?",
            "Did I encourage defenders during tough stretches?",
            "Did I bring positive energy regardless of game situation?"
        ]
    }
};

// Bonus positivity questions pool (slider input)
export const BONUS_QUESTIONS = [
    "How proud am I of my effort today?",
    "How focused did I stay after mistakes?",
    "How connected did I feel to my teammates today?",
    "How much leadership did I show today?",
    "How positive was my attitude throughout the session?",
    "How supportive was I of others today?",
    "How resilient was I when challenged today?",
    "How much joy did I feel playing today?",
    "How determined was I to finish strong today?"
];

export default QUESTIONS;