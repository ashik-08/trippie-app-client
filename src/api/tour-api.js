import { axiosSecure } from "../hooks/axiosSecure";
import axiosInstance from "./axiosInstance";

// add a new tour
export const addTour = async (tourData) => {
  const { data } = await axiosSecure.post("/tours", tourData);
  return data;
};

// get a tour by id
export const getTour = async (tourId) => {
  const { data } = await axiosInstance.get(`/tours/${tourId}`);
  return data;
};

// get all tours
export const getAllTours = async ({ search, sortOrder, selectedType }) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (sortOrder) params.append("sortOrder", sortOrder);
  if (selectedType) params.append("selectedType", selectedType);

  const { data } = await axiosInstance.get(`/tours?${params.toString()}`);
  return data;
};

// get all tours by agent email
export const getTours = async (email) => {
  const { data } = await axiosSecure.get(`/tours?email=${email}`);
  return data;
};

// delete a tour by id
export const deleteTour = async (tourId) => {
  const { data } = await axiosSecure.delete(`/tours/${tourId}`);
  return data;
};

// update a tour by id
export const updateTour = async (tourId, tourData) => {
  const { data } = await axiosSecure.put(`/tours/${tourId}`, tourData);
  return data;
};

// update a tour status by id
export const updateTourStatus = async (tourId, status) => {
  const { data } = await axiosSecure.put(`/tours/status/${tourId}`, { status });
  return data;
};
