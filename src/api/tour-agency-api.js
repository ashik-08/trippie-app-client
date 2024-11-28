import { axiosSecure } from "../hooks/axiosSecure";

// Fetch Tour Agency details by Tour Agent email
export const getTourAgency = async (email) => {
  const { data } = await axiosSecure.get(`/tour-agencies/${email}`);
  return data;
};

// Add a new Tour Agency
export const addTourAgency = async (agencyData) => {
  const { data } = await axiosSecure.post("/tour-agencies", agencyData);
  return data;
};

// Update Tour Agency details
export const updateTourAgency = async (id, agencyData) => {
  const { data } = await axiosSecure.put(`/tour-agencies/${id}`, agencyData);
  return data;
};
