import React, { useState } from 'react';
import SportSelectionModal from './SportSelectionModal';
import PositionSelectionModal from './PositionSelectionModal';

function ReflectionStartFlow({ onComplete }) {
    const [sport, setSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [step, setStep] = useState(() => (!sport ? 'sport' : 'done'));

    function requiresPosition(selectedSport) {
        return ['soccer', 'football', 'baseball', 'iceHockey', 'lacrosse'].includes(selectedSport);
    }

    const handleSportSelect = (selectedSport) => {
        setSport(selectedSport);
        localStorage.setItem('selectedSport', selectedSport);

        if (requiresPosition(selectedSport)) {
            setStep('position');
        } else {
            setStep('done');
            onComplete(selectedSport, '');
            window.location.reload(); // 🔥 Force reload clean
        }
    };

    const handlePositionSelect = (selectedPosition) => {
        localStorage.setItem('selectedPosition', selectedPosition);
        setStep('done');
        onComplete(sport, selectedPosition);
        window.location.reload(); // 🔥 Force reload clean
    };

    if (step === 'sport') {
        return <SportSelectionModal onSelect={handleSportSelect} />;
    }

    if (step === 'position') {
        return <PositionSelectionModal onSelect={handlePositionSelect} sport={sport} />;
    }

    return null;
}

export default ReflectionStartFlow;