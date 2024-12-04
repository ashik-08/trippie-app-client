import { axiosSecure } from "../hooks/axiosSecure";
import axiosInstance from "./axiosInstance";

// get all tour guides
export const getAllTourGuides = async ({ search }) => {
  const { data } = await axiosInstance.get(`/tour-guides?search=${search}`);
  return data;
};

// get guide by id and services by guide id
export const getGuideAndServices = async (id) => {
  const { data } = await axiosInstance.get(`/tour-guides/${id}`);
  return data;
};

// Fetch Tour Guide details by Tour Guide email
export const getTourGuide = async (email) => {
  const { data } = await axiosSecure.get(`/tour-guides/email/${email}`);
  return data;
};

// Add a new Tour Guide details
export const addTourGuide = async (guideData) => {
  const { data } = await axiosSecure.post("/tour-guides", guideData);
  return data;
};

// Update Tour Guide profile details
export const updateTourGuide = async (id, guideData) => {
  const { data } = await axiosSecure.put(`/tour-guides/${id}`, guideData);
  return data;
};
