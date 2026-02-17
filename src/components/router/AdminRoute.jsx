import { Navigate } from "react-router-dom";
import useRole from "../hook/useRole";
import useAuth from "../../hook/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const { role, loading: roleLoading } = useRole();

    if (authLoading || roleLoading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    if (!user || role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
