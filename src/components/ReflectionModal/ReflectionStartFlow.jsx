// src/components/ReflectionModal/ReflectionStartFlow.jsx
import React, { useState } from 'react';
import SportSelectionModal from './SportSelectionModal';
import PositionSelectionModal from './PositionSelectionModal';

function ReflectionStartFlow({ onComplete }) {
    const [sport, setSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [position, setPosition] = useState(() => localStorage.getItem('selectedPosition') || '');
    const [step, setStep] = useState(() => {
        if (!sport) return 'sport';
        if (sport && !position && requiresPosition(sport)) return 'position';
        return 'done';
    });

    function requiresPosition(sport) {
        return ['soccer', 'football', 'baseball', 'iceHockey', 'lacrosse'].includes(sport);
    }

    const handleSportSelect = (selectedSport) => {
        setSport(selectedSport);
        localStorage.setItem('selectedSport', selectedSport);

        if (requiresPosition(selectedSport)) {
            setStep('position');
        } else {
            setStep('done');
            onComplete(selectedSport, ''); // No position needed
        }
    };

    const handlePositionSelect = (selectedPosition) => {
        setPosition(selectedPosition);
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

    return null; // Already completed selection
}

export default ReflectionStartFlow;