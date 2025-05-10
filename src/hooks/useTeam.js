// src/hooks/useTeam.js
import { useContext } from 'react';
import { TeamContext } from '../context/TeamContext';

export function useTeam() {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeam() must be used inside a <TeamProvider>');
    }
    return context;
}