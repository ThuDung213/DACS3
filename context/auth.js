import { useRouter, useSegments } from "expo-router";
import React from "react";
import { useAuthentication } from "../hook/useAuthentication";
import { initializeApp } from "firebase/app";
import { auth } from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";

export const AuthContext = React.createContext(null);


// This hook can be used to access the user info.
export function useAuth() {
    return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute() {
    const segments = useSegments();
    const router = useRouter();
    const { user } = useAuthentication();

    React.useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)";

        if (!user && !inAuthGroup) {
            // Redirect away from the sign-in page.
            router.replace("/sign-in");
        } else if (user && inAuthGroup) {
            router.replace("/menu/home")
        }
    }, [user, segments]);
}

export function Provider(props) {
    const [user, setAuth] = React.useState(null);

    useProtectedRoute(user);

    const signIn = async (auth, email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Signed in!");
            const user = userCredential.user;
            console.log(error);
        } catch (error) {
            console.log(error);
        }
    };

    const signUp = async (auth, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Account created!');
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setAuth(null);
            // router.replace('/sign-in');
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut: handleSignOut,
                user,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
