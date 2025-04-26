// src/components/ReflectionModal/ReflectionStartFlow.jsx

import React, { useState } from 'react';
import SportSelectionModal from './SportSelectionModal';
import PositionSelectionModal from './PositionSelectionModal';

// List of sports that need an extra position selection
const sportsNeedingPosition = ['soccer', 'football', 'baseball', 'iceHockey', 'lacrosse'];

function ReflectionStartFlow({ onComplete }) {
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');

    const handleSportSelect = (sport) => {
        setSelectedSport(sport);
        if (!sportsNeedingPosition.includes(sport)) {
            // If no position needed, immediately save and complete
            saveAndComplete(sport, '');
        }
        // else: wait for position selection
    };

    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
        saveAndComplete(selectedSport, position);
    };

    const saveAndComplete = (sport, position) => {
        localStorage.setItem('selectedSport', sport);
        localStorage.setItem('selectedPosition', position || '');
        onComplete({ sport, position });
    };

    return (
        <>
            {/* Step 1: Sport selection */}
            {!selectedSport && (
                <SportSelectionModal onSelect={handleSportSelect} buttonLabel="Continue" />
            )}

            {/* Step 2: If sport requires a position, show position picker */}
            {selectedSport && sportsNeedingPosition.includes(selectedSport) && !selectedPosition && (
                <PositionSelectionModal sport={selectedSport} onSelect={handlePositionSelect} />
            )}
        </>
    );
}

export default ReflectionStartFlow;
