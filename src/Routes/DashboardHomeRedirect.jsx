import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingState/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useGetRole from "../hooks/useGetRole";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const DashboardHomeRedirect = () => {
  const { loading } = useAuth();
  const [userRole, isLoading] = useGetRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoading) {
      if (userRole === "admin") {
        navigate("/dashboard/manage-users");
      } else if (userRole === "hotel-manager") {
        navigate("/dashboard/manage-rooms");
      } else if (userRole === "tour-agent") {
        navigate("/dashboard/manage-tours");
      } else if (userRole === "tour-guide") {
        navigate("/dashboard/tour-guide-home");
      } else if (userRole === "user") {
        return <ErrorPage />;
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
