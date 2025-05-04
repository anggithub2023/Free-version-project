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
            "Did I create good scoring opportunities for my teammates?",
            "Did I avoid early shot clock attempts unless wide open?",
            "Did I keep my dribble alive when needed?",
            "Did I use screens effectively and read the defense?",
            "Did I drive with purpose and control?",
            "Did I move without the ball to open up space?",
            "Did I find balance between scoring and playmaking?",
            "Did I follow my shot for possible second-chance points?"
        ],
        defense: [
            "Did I stay in a stance and contest every shot?",
            "Did I talk on defense — on screens and switches?",
            "Did I help on defense and recover to my man?",
            "Did I box out and go for every rebound?",
            "Did I close out under control and avoid fouling shooters?",
            "Did I maintain effort on every defensive possession?",
            "Did I apply ball pressure without fouling?",
            "Did I force tough shots or turnovers by sticking to our defensive principles?",
            "Did I stay in position to help on drives?",
            "Did I rotate when needed to cover teammates?",
            "Did I limit second chances by crashing the boards?",
            "Did I play with energy even when off-ball?",
            "Did I recover quickly when beat?",
            "Did I stay disciplined and avoid risky reach-ins?",
            "Did I recognize when to trap or double team?"
        ],
        teamIdentity: [
            "Was I a great teammate — vocal, positive, and unselfish?",
            "Did I communicate on defense (screens, cutters, switches)?",
            "Did I give full effort — including hustle plays, box-outs, and deflections?",
            "Did I avoid bad turnovers, such as lazy passes or over-dribbling?",
            "Did I support my teammates on and off the court?",
            "Did I hold myself accountable to our team principles?",
            "Did I stay locked in and focused even when off the ball or on the bench?",
            "Did I bring positive energy to the team throughout the session?",
            "Did I clap and lift up teammates after mistakes?",
            "Did I celebrate others' success genuinely?",
            "Did I encourage teammates during tough stretches?",
            "Did I model great body language — win or lose?",
            "Did I hustle to help teammates up when they hit the floor?",
            "Did I play like someone others want on their team?",
            "Did I represent our program with pride and respect?"
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
            "Did I offer clear outlet options for defenders?",
            "Did I help maintain team possession during distribution?"
        ],
        defense: [
            "Did I communicate early and loudly with defenders?",
            "Did I challenge crosses effectively?",
            "Did I stay focused throughout long stretches without action?",
            "Did I organize the defense during set pieces?"
        ],
        teamIdentity: [
            "Did I boost team morale vocally and by example?",
            "Did I quickly reset the team after conceding a goal?",
            "Did I stay positive and composed under pressure?",
            "Did I support and encourage the team from the back?"
        ]
    },

    // ⚽ Soccer Field Player
    "soccer-field-player": {
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

    // 🏈 Football Player
    "football-running-back": {
        offense: [
            "Did I hit running lanes quickly and decisively?",
            "Did I protect the football through contact?",
            "Did I contribute in pass protection effectively?",
            "Did I finish every run with effort?",
            "Did I communicate pre-snap assignments?"
        ],
        teamIdentity: [
            "Did I support teammates vocally and on the field?",
            "Did I show effort on and off the ball?",
            "Did I stay mentally tough through the session?",
            "Did I stay positive after tough plays?"
        ]
    },

    // 🏈 Football Wide Receiver
    "football-wide-receiver": {
        offense: [
            "Did I run sharp, deliberate routes?",
            "Did I secure every catch within reach?",
            "Did I block for teammates on running plays?",
            "Did I make smart decisions after the catch?",
            "Did I maintain spacing and timing with the QB?"
        ],
        teamIdentity: [
            "Did I bring energy to the huddle and sideline?",
            "Did I celebrate teammates' success?",
            "Did I support my unit vocally and by example?",
            "Did I demonstrate focus throughout the game?"
        ]
    },

    // 🏈 Football Defensive Player
    "football-defensive-player": {
        defense: [
            "Did I align properly on each play?",
            "Did I pursue the ball with urgency?",
            "Did I communicate on coverage and gaps?",
            "Did I tackle safely and effectively?",
            "Did I stay disciplined in my assignments?"
        ],
        teamIdentity: [
            "Did I encourage teammates after mistakes?",
            "Did I bring energy on every series?",
            "Did I lead by example on effort and hustle?",
            "Did I contribute to defensive unity?"
        ],
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
// 🏌️ Golf (Individual)
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

// 🏃 Track / Cross Country (Individual)
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
            "Did I stay aggressive but smart on the bases?",
            "Did I swing at pitches in my hitting zone?",
            "Did I track pitches from the pitcher’s hand?",
            "Did I use the whole field when hitting?",
            "Did I stay balanced during my swing?",
            "Did I hustle out every ground ball or flyout?",
            "Did I adjust to the pitcher’s rhythm or pitch sequence?",
            "Did I look for ways to pressure the defense while running bases?"
        ],
        defense: [
            "Did I make routine plays on defense?",
            "Did I back up throws and plays when needed?",
            "Did I stay focused every pitch?",
            "Did I communicate with teammates in the field?",
            "Did I support the pitcher with strong defense?",
            "Did I keep throws accurate and quick?",
            "Did I adjust my positioning based on the hitter and situation?",
            "Did I anticipate plays instead of reacting late?",
            "Did I keep my glove down on ground balls?",
            "Did I get into ready position before every pitch?",
            "Did I know where to throw before the ball was hit?",
            "Did I charge slow rollers aggressively?",
            "Did I take good angles to fly balls?",
            "Did I stay composed after making a mistake?",
            "Did I listen and respond to my teammates' communication on the field?"
        ],
        teamIdentity: [
            "Did I encourage teammates after plays?",
            "Did I show hustle on and off the field?",
            "Did I stay mentally locked in between innings?",
            "Did I maintain a positive attitude regardless of my stats?",
            "Did I act as a leader through actions and words?",
            "Did I respect umpires, coaches, and opponents at all times?",
            "Did I lift teammates up after mistakes?",
            "Did I show appreciation for teammates' efforts and successes?",
            "Did I bring energy from the dugout when not on the field?",
            "Did I celebrate team achievements more than personal ones?",
            "Did I keep my body language positive when things didn’t go well?",
            "Did I support teammates vocally and with presence?",
            "Did I take care of my gear and follow team routines?",
            "Did I represent the team with pride today?"
        ]
    },

    // ⚾ Baseball Pitcher
    "baseball-pitcher": {
        offense: [
            "Did I stay aggressive while pitching smart?",
            "Did I control pitch location and selection under pressure?",
            "Did I attack hitters early in counts?",
            "Did I mix up pitch speeds and types to keep batters off balance?",
            "Did I follow the catcher’s lead when appropriate?",
            "Did I adjust my strategy based on each batter?",
            "Did I stay calm after a walk or hit?",
            "Did I avoid giving up free bases (walks, hit batters)?"
        ],
        defense: [
            "Did I field my position cleanly (bunts, grounders)?",
            "Did I back up bases properly on throws?",
            "Did I hold runners effectively to prevent steals?",
            "Did I cover first base on grounders to the right side?",
            "Did I throw strikes in pressure situations?",
            "Did I respond quickly to line drives or comebackers?",
            "Did I know the right defensive play in each situation?",
            "Did I help manage the pace of the game when needed?"
        ],
        teamIdentity: [
            "Did I stay composed after giving up hits/runs?",
            "Did I communicate clearly with catchers and infielders?",
            "Did I project positive energy to the team from the mound?",
            "Did I respond to coaching or signs with focus?",
            "Did I support teammates vocally between innings?",
            "Did I bounce back from tough innings with resilience?",
            "Did I stay locked in during long innings on the bench?",
            "Did I lead by example in effort and attitude today?"
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
            "Did I make the extra pass to create a better shot?",
            "Did I finish my shots with confidence and accuracy?",
            "Did I stay aware of shot clock and possession time?",
            "Did I draw defenders to open up opportunities for others?",
            "Did I recover quickly after losing possession?"
        ],
        defense: [
            "Did I maintain good defensive positioning?",
            "Did I communicate with teammates about slides and picks?",
            "Did I stay low and play strong 1v1 defense?",
            "Did I hustle back in transition defense?",
            "Did I check responsibly without overcommitting?",
            "Did I stay between my man and the goal?",
            "Did I support off-ball with smart help defense?",
            "Did I clear the ball cleanly after turnovers?",
            "Did I recover quickly if beaten on a dodge?",
            "Did I anticipate passes and get into passing lanes?",
            "Did I keep pressure on the ball without fouling?",
            "Did I recognize and call out man-down or EMO situations?"
        ],
        teamIdentity: [
            "Did I encourage and support teammates vocally?",
            "Did I show resilience after mistakes?",
            "Did I maintain high energy throughout the session?",
            "Did I demonstrate leadership on and off the field?",
            "Did I celebrate my teammates' successes?",
            "Did I respect the referees, coaches, and opponents?",
            "Did I stay mentally focused all game?",
            "Did I contribute positively to our team culture?",
            "Did I help teammates stay focused during breaks or timeouts?",
            "Did I model good sportsmanship regardless of the score?",
            "Did I stay engaged when on the sideline?",
            "Did I show pride in our team’s effort today?"
        ]
    },

    // 🥍 Lacrosse Goalie
    "lacrosse-goalie": {
        offense: [
            "Did I start clears quickly and accurately?",
            "Did I communicate outlet options clearly to teammates?",
            "Did I assist the offense with smart ball distribution?",
            "Did I read the ride and make the best pass under pressure?",
            "Did I avoid turnovers on clears and long passes?",
            "Did I support my defense by moving into space for safe outlets?",
            "Did I reset the clear when pressured instead of forcing a pass?"
        ],
        defense: [
            "Did I maintain proper stance and positioning?",
            "Did I make saves I was expected to make?",
            "Did I communicate the defensive setup vocally?",
            "Did I react quickly on rebounds and loose balls?",
            "Did I track the ball into my stick on every shot?",
            "Did I move my feet and adjust angle to the shooter's position?",
            "Did I stay alert for skip passes and screens?",
            "Did I lead the defense on man-down situations?"
        ],
        teamIdentity: [
            "Did I show leadership from the crease?",
            "Did I stay calm and composed after goals allowed?",
            "Did I encourage defenders during tough stretches?",
            "Did I bring positive energy regardless of game situation?",
            "Did I motivate the team after a big save?",
            "Did I stay vocal and engaged even when not facing shots?",
            "Did I show good sportsmanship with opponents and referees?",
            "Did I take ownership of my performance and support the team mindset?"
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
    "How determined was I to finish strong today?",
    "Did I give my best effort regardless of the outcome?",
    "Did I stay coachable and open to feedback?",
    "Did I take responsibility for my actions today?",
    "Did I encourage someone else who needed it?",
    "Did I bounce back quickly from a tough moment?",
    "Did I stay present instead of worrying about mistakes?",
    "Did I show gratitude for the chance to play today?",
    "Did I try to improve at least one skill today?",
    "Did I treat opponents with respect?",
    "Did I listen with attention and respect during team talks?",
    "Did I represent my team in a way I’m proud of?",
    "Did I manage my emotions in a mature way?",
    "Did I make others around me better today?",
    "Did I reflect on what I can do better next time?",
    "Did I carry myself like a leader today?",
    "Did I challenge myself to step outside my comfort zone?"
];

export default QUESTIONS;