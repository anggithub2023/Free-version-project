// src/components/ReflectionModal/ReflectionStartFlow.jsx

import React, { useState, useEffect } from 'react';
import SportSelectionModal from './SportSelectionModal';
import PositionSelectionModal from './PositionSelectionModal';

function ReflectionStartFlow({ onComplete }) {
    const [sport, setSport] = useState('');
    const [step, setStep] = useState('sport');

    useEffect(() => {
        const savedSport = localStorage.getItem('selectedSport') || '';
        const savedPosition = localStorage.getItem('selectedPosition') || '';

        if (!savedSport) {
            setStep('sport');
        } else if (requiresPosition(savedSport) && !savedPosition) {
            setSport(savedSport);
            setStep('position');
        } else {
            onComplete(savedSport, savedPosition);
        }
    }, [onComplete]);

    function requiresPosition(selectedSport) {
        return ['soccer', 'football', 'baseball', 'iceHockey', 'lacrosse'].includes(selectedSport);
    }

    const handleSportSelect = (selectedSport) => {
        setSport(selectedSport);
        localStorage.setItem('selectedSport', selectedSport);

        if (requiresPosition(selectedSport)) {
            setStep('position');
        } else {
            onComplete(selectedSport, '');
        }
    };

    const handlePositionSelect = (selectedPosition) => {
        setPosition(selectedPosition);
        localStorage.setItem('selectedPosition', selectedPosition);
        onComplete(sport, selectedPosition);
    };

    if (step === 'sport') {
        return <SportSelectionModal onSelect={handleSportSelect} />;
    }

    if (step === 'position') {
        return <PositionSelectionModal onSelect={handlePositionSelect} sport={sport} />;
    }

    return null; // If loading / fallback safeguard
}

export default ReflectionStartFlow;
