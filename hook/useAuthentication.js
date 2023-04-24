import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../config/firebase';

const auth = getAuth(app);
export function useAuthentication() {
    const [user, setUser] = React.useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(undefined);
        });

        return unsubscribe;
    }, []);

    return { user };
}
