import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true until Firebase responds

    const createUser = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);
        // ↑ Don't touch loading here — onAuthStateChanged handles it

    const loginUser = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const googleLogin = () =>
        signInWithPopup(auth, googleProvider);

    const logOut = () =>
        signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // ← the ONE place loading becomes false
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,          // this is authLoading from useRole's perspective
        createUser,
        loginUser,
        googleLogin,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;