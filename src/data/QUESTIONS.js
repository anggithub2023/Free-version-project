const QUESTIONS = {
    // 🏀 TEAM SPORTS: Offense / Defense / Team Identity
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

    lacrosse: {
        offense: [
            "Did I create space or opportunities for teammates?",
            "Did I take high-percentage shots?",
            "Did I protect the ball under pressure?",
            "Did I find passing lanes and move the ball quickly?",
            "Did I keep my head up during dodges or cuts?",
            "Did I communicate on the offensive sets?",
            "Did I maintain composure and timing during possessions?",
            "Did I finish plays with intensity?"
        ],
        defense: [
            "Did I stay in proper stance and body position?",
            "Did I communicate effectively with my unit?",
            "Did I avoid unnecessary fouls or over-commits?",
            "Did I help when slides were needed?",
            "Did I recover quickly on broken plays?",
            "Did I hustle in transition?",
            "Did I win ground ball battles?",
            "Did I make it tough for my opponent to execute?"
        ],
        teamIdentity: [
            "Did I support teammates vocally and physically?",
            "Did I stay locked in through the entire session?",
            "Did I handle adversity without frustration?",
            "Did I bring effort every rep regardless of playing time?",
            "Did I make sacrifices for the team’s success?",
            "Did I play within our system and strategy?",
            "Did I show enthusiasm for team progress?",
            "Did I respect coaches and teammates consistently?"
        ]
    },

    iceHockey: {
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

    // 🏃 INDIVIDUAL SPORTS: Focus / Preparation / Execution
    golf: {
        focus: [
            "Was I mentally present before each shot?",
            "Did I stick to my pre-shot routine?",
            "Did I stay composed after mistakes?",
            "Did I commit to my decisions with confidence?",
            "Did I manage my breathing and emotions?",
            "Did I focus on the process rather than outcome?",
            "Did I reset mentally between shots?",
            "Did I finish my round with discipline?"
        ],
        courseManagement: [
            "Did I choose smart targets for my ability?",
            "Did I avoid high-risk shots?",
            "Did I recover intelligently when in trouble?",
            "Did I plan shots around hazards?",
            "Did I play to my strengths?",
            "Did I read greens carefully?",
            "Did I stick to a game plan?",
            "Did I reflect on decision-making after the round?"
        ],
        execution: [
            "Did I strike the ball cleanly?",
            "Did I control distance on approaches?",
            "Did I putt with focus and tempo?",
            "Did I manage short game situations well?",
            "Did I hit fairways off the tee?",
            "Did I finish swings with balance?",
            "Did I keep my tempo steady all round?",
            "Did I adjust to course/weather conditions?"
        ]
    },

    trackCrossCountry: {
        focus: [
            "Did I approach the race with a positive mindset?",
            "Did I visualize my race strategy before starting?",
            "Did I stay mentally locked in despite distractions?",
            "Did I stay confident and trust my training?",
            "Did I set realistic but challenging goals for the race?",
            "Did I control pre-race nerves effectively?",
            "Did I stay focused through each lap or mile?",
            "Did I maintain a strong mental attitude during the toughest parts?"
        ],
        preparation: [
            "Did I warm up properly?",
            "Did I fuel and hydrate effectively?",
            "Did I mentally prepare before the race?",
            "Did I arrive focused and ready?",
            "Did I visualize race strategy?",
            "Did I shake off nerves or distractions?",
            "Did I stretch and activate properly?",
            "Did I start the race with the right mindset?"
        ],
        execution: [
            "Did I race with smart pacing?",
            "Did I stay relaxed and composed?",
            "Did I hit key checkpoints/goals?",
            "Did I adjust if conditions changed?",
            "Did I run with proper form?",
            "Did I respond to competitors' moves?",
            "Did I stick to the plan (or improve it)?",
            "Did I reflect and write down insights after the race?"
        ]
    }
};

export default QUESTIONS;