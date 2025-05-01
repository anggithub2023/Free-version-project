// src/hooks/useAnonymousUser.js
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function useAnonymousUser() {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        let uid = localStorage.getItem('userId');
        if (!uid) {
            uid = uuidv4();
            localStorage.setItem('userId', uid);
        }
        setUserId(uid);
    }, []);

    return userId;
}