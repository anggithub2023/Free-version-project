// src/data/PROCESS_CATEGORIES.js

/**
 * Categories used in process-oriented reflection.
 * Each contains a unique key, title, description, and questions.
 */
const PROCESS_CATEGORIES = [
    {
        key: "preparation",
        title: "Preparation & Planning",
        description: "How you physically and mentally prepare before practice or competition.",
        questions: [
            "Did I follow my warm-up and preparation routines?",
            "Was I focused and ready when the session started?"
        ]
    },
    {
        key: "effort",
        title: "Effort & Engagement",
        description: "Your energy, hustle, and commitment during training or competition.",
        questions: [
            "Did I give consistent effort regardless of score or conditions?",
            "Was I fully engaged the entire time?"
        ]
    },
    {
        key: "focus",
        title: "Focus & Execution",
        description: "Concentrating on doing the small tasks and skills correctly.",
        questions: [
            "Did I stay focused on the fundamentals?",
            "Did I avoid distractions and stay locked in?"
        ]
    },
    {
        key: "adaptability",
        title: "Adaptability & Responsiveness",
        description: "Adjusting effectively to changes, challenges, or adversity.",
        questions: [
            "Did I respond positively when things didn’t go as planned?",
            "Did I adjust quickly when needed?"
        ]
    },
    {
        key: "communication",
        title: "Communication & Team Interaction",
        description: "Supportive and effective interactions with teammates and coaches.",
        questions: [
            "Did I communicate clearly and support my team?",
            "Did I listen to and apply feedback?"
        ]
    },
    {
        key: "resilience",
        title: "Mental Toughness & Resilience",
        description: "Staying composed and focused through challenges.",
        questions: [
            "Did I bounce back after mistakes?",
            "Did I keep my emotions under control?"
        ]
    },
    {
        key: "reflection",
        title: "Reflection & Continuous Improvement",
        description: "Learning from experiences to improve future efforts.",
        questions: [
            "Did I think about what went well and what I could improve?",
            "Did I apply something I learned recently?"
        ]
    }
];

export default PROCESS_CATEGORIES;