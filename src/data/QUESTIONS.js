const QUESTIONS = {
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

    soccer: {
        offense: [
            "Did I make smart runs into space?",
            "Did I connect passes effectively under pressure?",
            "Did I take high-quality shots on goal?",
            "Did I create scoring opportunities for my teammates?",
            "Did I maintain composure and vision in the final third?"
        ],
        defense: [
            "Did I stay goal-side and apply pressure to the ball?",
            "Did I communicate with teammates on positioning?",
            "Did I track back and recover defensively after turnovers?",
            "Did I contest headers and win 50/50 balls?",
            "Did I avoid unnecessary fouls in dangerous areas?"
        ],
        teamIdentity: [
            "Did I stay positive and vocal toward teammates?",
            "Did I hustle both offensively and defensively?",
            "Did I show resilience after mistakes?",
            "Did I maintain high focus even off the ball?",
            "Did I embody our team culture and goals today?"
        ]
    },

    football: {
        offense: [
            "Did I execute my assignment with full effort?",
            "Did I secure the ball properly during plays?",
            "Did I maintain smart decision-making under pressure?",
            "Did I block effectively when not the ball carrier?",
            "Did I stay disciplined and avoid penalties?"
        ],
        defense: [
            "Did I align correctly before the snap?",
            "Did I pursue the ball carrier with speed and angles?",
            "Did I communicate coverages or adjustments?",
            "Did I wrap up tackles securely without fouling?",
            "Did I maintain discipline on reads and gaps?"
        ],
        teamIdentity: [
            "Did I encourage teammates on and off the field?",
            "Did I hustle through the whistle on every rep?",
            "Did I stay locked in regardless of play outcome?",
            "Did I hold teammates and myself to high standards?",
            "Did I bring leadership and energy to the field today?"
        ]
    },

    baseball: {
        offense: [
            "Did I have disciplined at-bats and good pitch selection?",
            "Did I move runners with smart situational hitting?",
            "Did I hustle out of the box and run hard on base paths?",
            "Did I make productive outs when necessary?",
            "Did I stay aggressive but smart on the bases?"
        ],
        defense: [
            "Did I stay ready and react quickly to the ball?",
            "Did I communicate effectively with teammates on plays?",
            "Did I make accurate throws and smart defensive decisions?",
            "Did I back up plays when necessary?",
            "Did I stay focused between pitches and innings?"
        ],
        teamIdentity: [
            "Did I support teammates vocally during games?",
            "Did I hustle on and off the field every inning?",
            "Did I encourage players after mistakes?",
            "Did I stay locked in even when not directly involved in a play?",
            "Did I bring positivity and focus to the dugout?"
        ]
    },

    iceHockey: {
        offense: [
            "Did I maintain puck control and protect possession?",
            "Did I move into open ice to create chances?",
            "Did I take quality shots when opportunities arose?",
            "Did I make smart passes to keep the attack flowing?",
            "Did I stay patient and wait for high-percentage plays?"
        ],
        defense: [
            "Did I stay strong in positioning between puck and net?",
            "Did I pressure puck carriers without overcommitting?",
            "Did I clear rebounds and protect the goalie?",
            "Did I communicate switches and coverages with teammates?",
            "Did I avoid unnecessary penalties in critical moments?"
        ],
        teamIdentity: [
            "Did I bring energy to every shift?",
            "Did I stay positive on the bench and in the locker room?",
            "Did I show leadership regardless of my minutes played?",
            "Did I hold myself accountable to team values?",
            "Did I lift teammates up after mistakes or tough plays?"
        ]
    },

    trackCrossCountry: {
        offense: [
            "Did I maintain a strong and consistent pace?",
            "Did I focus on smart race strategies?",
            "Did I push through tough stretches mentally?",
            "Did I execute good starts and strong finishes?",
            "Did I adjust tactics when necessary for competition?"
        ],
        defense: [
            "Did I stay mentally tough during fatigue?",
            "Did I compete fiercely against those around me?",
            "Did I push myself when being challenged?",
            "Did I keep form and mechanics sound under fatigue?",
            "Did I close hard at the end of the race?"
        ],
        teamIdentity: [
            "Did I support and encourage teammates?",
            "Did I help build a positive team environment?",
            "Did I stay humble whether I won or lost?",
            "Did I embody grit and resilience in training and races?",
            "Did I bring strong energy to our team culture?"
        ]
    },

    lacrosse: {
        offense: [
            "Did I move without the ball to create space?",
            "Did I execute passes and shots efficiently?",
            "Did I make the extra pass when teammates were open?",
            "Did I stay composed in high-pressure situations?",
            "Did I control the tempo of our offense?"
        ],
        defense: [
            "Did I communicate slides and switches loudly?",
            "Did I keep good positioning on my mark?",
            "Did I check cleanly without drawing penalties?",
            "Did I hustle back in transition defense?",
            "Did I stay aggressive but smart defensively?"
        ],
        teamIdentity: [
            "Did I bring energy on and off the field?",
            "Did I lift teammates’ morale during tough stretches?",
            "Did I hustle through every drill and scrimmage?",
            "Did I embody discipline and sportsmanship?",
            "Did I stay positive regardless of mistakes?"
        ]
    },

    golf: {
        offense: [
            "Did I manage course strategy intelligently?",
            "Did I recover well after mistakes or bad shots?",
            "Did I stay composed and patient throughout the round?",
            "Did I focus completely on each shot without distraction?",
            "Did I play aggressively but smart based on conditions?"
        ],
        defense: [
            "Did I maintain mental toughness during difficult stretches?",
            "Did I stick to my routine under pressure?",
            "Did I stay disciplined in shot selection?",
            "Did I make smart decisions to limit mistakes?",
            "Did I keep emotions in check after setbacks?"
        ],
        teamIdentity: [
            "Did I support and respect playing partners?",
            "Did I represent my team with great sportsmanship?",
            "Did I stay positive regardless of personal performance?",
            "Did I embody our team values throughout the round?",
            "Did I compete with confidence and resilience?"
        ]
    }
};

export default QUESTIONS;