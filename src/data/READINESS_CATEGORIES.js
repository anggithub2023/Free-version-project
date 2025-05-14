const READINESS_CATEGORIES = [
    {
        key: 'mental',
        title: 'Mental Focus',
        description: 'Focus, clarity, and mindset before performance.',
        questions: [
            'How focused are you right now?',
            'How easily are you distracted today?',
            'Are you mentally present in this moment?',
            'How well can you process instructions or plays?',
            'Can you move past mistakes quickly?',
            'Are you mentally ready to compete?',
            'Is your mind calm and clear?',
            'How well are you blocking out distractions?',
            'Can you stay focused on one thing at a time?',
            'Are you focused on what you can control today?'
        ]
    },
    {
        key: 'physical',
        title: 'Physical Readiness',
        description: 'Energy levels, soreness, and injury status.',
        questions: [
            'Do you feel physically energized?',
            'Is your body sore or fatigued?',
            'Are you free from pain or tightness?',
            'How well did you recover since your last session?',
            'Are you warmed up and moving freely?',
            'Do any past injuries feel aggravated?',
            'Can you move without restriction?',
            'Are your joints and muscles feeling loose?',
            'Do you feel balanced and stable physically?',
            'Is your movement pain-free right now?'
        ]
    },
    {
        key: 'energy',
        title: 'Energy & Alertness',
        description: 'Sleep, fuel, and ability to compete at full intensity.',
        questions: [
            'How much energy are you bringing today?',
            'Did you sleep well last night?',
            'Are you alert and mentally sharp?',
            'Did you hydrate and fuel properly?',
            'Can you give your full intensity if needed?',
            'Do you feel sluggish or reactive?',
            'How well did you warm up today?',
            'Are your eyes and head feeling clear?',
            'How physically responsive do you feel?',
            'Did you eat and hydrate in the past few hours?'
        ]
    },
    {
        key: 'emotional',
        title: 'Emotional Readiness',
        description: 'Confidence, composure, and leadership mindset.',
        questions: [
            'How confident are you heading into today?',
            'Are you managing nerves or pressure well?',
            'Do you feel emotionally steady?',
            'Are you in a positive headspace today?',
            'Can you lead yourself and others emotionally?',
            'Are you mentally prepared to handle setbacks?',
            'Do you feel emotionally connected to your role today?',
            'How well are you handling your emotions right now?',
            'Are you feeling tense or calm?',
            'Do you believe in your ability to perform well today?'
        ]
    },
    {
        key: 'intention',
        title: 'Intention & Purpose',
        description: 'Set your mindset and purpose for this session.',
        questions: [
            "What's one thing you’ll focus on today?",
            "What is your personal goal for this session?",
            "What’s one habit you want to strengthen today?",
            "What mindset will help you succeed today?",
            "What do you want to walk away having improved?"
        ]
    }
];

export default READINESS_CATEGORIES;
