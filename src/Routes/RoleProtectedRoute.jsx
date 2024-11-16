import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingState/LoadingSpinner";
import useGetRole from "../hooks/useGetRole";
import { AuthContext } from "../Provider/AuthProvider";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const [userRole, isLoading] = useGetRole();
  const location = useLocation();

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  if (user?.email && allowedRoles.includes(userRole)) {
    return children;
  }

  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

RoleProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoleProtectedRoute;
