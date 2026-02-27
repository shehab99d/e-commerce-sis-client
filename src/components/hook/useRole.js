import { useEffect, useState } from "react";
import api from "../../API/Axios";
import useAuth from "../../hook/useAuth";

const useRole = () => {
    const { user, loading: authLoading } = useAuth(); // ← get auth loading state
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        // ⏳ Firebase hasn't resolved yet — wait, don't skip
        if (authLoading) return;

        // 🚪 User is definitively logged out
        if (!user?.email) {
            setRole(null);
            setRoleLoading(false); // ← critical: always exit loading state
            return;
        }

        // ✅ Auth is settled and user exists — safe to fetch
        setRoleLoading(true);

        api.get(`/users/role/${user.email}`)
            .then(res => {
                setRole(res.data.role ?? null);
            })
            .catch(() => {
                setRole(null); // ← don't silently assign "user" role, just null
            })
            .finally(() => {
                setRoleLoading(false);
            });

    }, [user?.email, authLoading]); // ← depend on primitives, not object reference

    // Combined: still loading if EITHER auth or role is unresolved
    const loading = authLoading || roleLoading;

    return { role, loading };
};

export default useRole;