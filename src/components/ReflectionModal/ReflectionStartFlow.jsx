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
        }
    };

    const handlePositionSelect = (selectedPosition) => {
        localStorage.setItem('selectedPosition', selectedPosition);
        setStep('done');
        onComplete(sport, selectedPosition);
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