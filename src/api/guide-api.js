import { axiosSecure } from "../hooks/axiosSecure";

// Fetch Tour Guide details by Tour Guide email
export const getTourGuide = async (email) => {
  const { data } = await axiosSecure.get(`/tour-guide/${email}`);
  return data;
};

// Add a new Tour Guide details
export const addTourGuide = async (guideData) => {
  const { data } = await axiosSecure.post("/tour-guide", guideData);
  return data;
};

// Update Tour Guide profile details
export const updateTourGuide = async (id, guideData) => {
  const { data } = await axiosSecure.put(`/tour-guide/${id}`, guideData);
  return data;
};
