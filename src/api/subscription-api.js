import { axiosSecure } from "../hooks/axiosSecure";

export const getSubscriptionStatus = async (email) => {
  const { data } = await axiosSecure.get("/subscription/status", {
    params: { email },
  });
  return data;
};
