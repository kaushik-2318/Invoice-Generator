import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/register" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
