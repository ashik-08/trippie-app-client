import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
  baseURL,
});

const axiosSecure = axios.create({
  baseURL,
  withCredentials: true,
});

// issue a token upon successful login
export const issueToken = async (loggedInUser) => {
  await axiosSecure.post("/auth/login", loggedInUser);
};

// revoke issued token upon successful logout
export const revokeToken = async (loggedInUser) => {
  await axiosSecure.post("/auth/logout", loggedInUser);
};

// add a new user
export const addUser = async (user) => {
  const response = await axiosInstance.post("/users", user);
  return response;
};
