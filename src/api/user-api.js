import axios from "axios";
import { axiosSecure } from "../hooks/axiosSecure";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
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

// fetch user role
export const getUserRole = async (email) => {
  const response = await axiosSecure.get(`/users/role?email=${email}`);
  return response?.data?.role;
};
