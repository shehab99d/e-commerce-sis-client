import { useEffect, useState } from "react";
import api from "../../API/Axios";
import useAuth from "../../hook/useAuth";
// import useAuth from "";

const useRole = () => {
    const { user } = useAuth();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            api.get(`/users/role/${user.email}`)
                .then(res => {
                    setRole(res.data.role);
                    setLoading(false);
                })
                .catch(() => {
                    setRole("user");
                    setLoading(false);
                });
        }
    }, [user]);

    return { role, loading };
};

export default useRole;
