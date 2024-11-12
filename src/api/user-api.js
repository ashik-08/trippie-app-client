import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

// issue a token upon successful login
export const issueToken = async (loggedInUser) => {
  const response = await axiosInstance.post("/jwt", loggedInUser);
  const data = await response?.data;
  return data;
};

// revoke issued token upon successful logout
export const revokeToken = async (loggedInUser) => {
  const response = await axiosInstance.post("/logout", loggedInUser);
  const data = await response?.data;
  return data;
};

// add a new user
export const addUser = async (user) => {
  const response = await axiosInstance.post("/users", user);
  //   const data = await response?.data;
  return response;
};
