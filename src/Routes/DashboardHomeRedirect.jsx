import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingState/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useGetRole from "../hooks/useGetRole";

const DashboardHomeRedirect = () => {
  const { loading } = useAuth();
  const [userRole, isLoading] = useGetRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoading) {
      if (userRole === "admin") {
        navigate("/dashboard/admin-home");
      } else if (userRole === "user") {
        navigate("/dashboard/user-home");
      }
      // Add other roles here
    }
  }, [loading, isLoading, userRole, navigate]);

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  return null;
};

export default DashboardHomeRedirect;
