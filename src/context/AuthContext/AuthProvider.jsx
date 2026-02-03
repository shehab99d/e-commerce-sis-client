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
// import { auth, googleProvider } from "../../firebase/firebase.config";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /* =========================
       AUTH FUNCTIONS
    ========================= */

    // SIGN UP
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // LOGIN
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // GOOGLE POPUP LOGIN
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // LOGOUT
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    /* =========================
       AUTH STATE OBSERVER
    ========================= */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe()
        };
    }, []);

    /* =========================
       CONTEXT VALUE
    ========================= */
    const authInfo = {
        user,
        loading,
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
