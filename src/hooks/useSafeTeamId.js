// src/hooks/useSafeTeamId.js
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function useSafeTeamId() {
    const { teamId: paramTeamId } = useParams();
    const teamId = paramTeamId || localStorage.getItem('teamId');

    // Keep localStorage in sync when route param is present
    useEffect(() => {
        if (paramTeamId) {
            localStorage.setItem('teamId', paramTeamId);
        }
    }, [paramTeamId]);

    return teamId;
}