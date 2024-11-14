import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingState/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user?.email) {
    return children;
  }

  return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
