import { useQuery } from "@tanstack/react-query";
import { getUserRole } from "../api/user-api";
import useAuth from "./useAuth";

const useGetRole = () => {
  const { user } = useAuth();
  const {
    data: userRole,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => await getUserRole(user?.email),
  });
  return [userRole, isLoading, isError];
};

export default useGetRole;
