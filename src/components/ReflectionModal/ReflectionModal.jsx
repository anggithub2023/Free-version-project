function ReflectionModal({ total, offense, defense, culture, bonus, sport, position }) {
    const handleHome = () => {
        localStorage.removeItem('selectedSport');
        localStorage.removeItem('selectedPosition');
        localStorage.removeItem('randomQuestionsReflection');
        localStorage.removeItem('processAnswers');
        window.location.href = '/';
    };

    const handlePlayerStats = () => {
        // ✅ Re-save sport and position to avoid missing data
        if (sport) {
            localStorage.setItem('selectedSport', sport);
        }
        if (position) {
            localStorage.setItem('selectedPosition', position);
        }
        window.location.href = '/playerstats';
    };

    return (
        <div> {/* ...rest of your modal UI... */} </div>
    );
}