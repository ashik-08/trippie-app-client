import { axiosSecure } from "../hooks/axiosSecure";
import axiosInstance from "./axiosInstance";

export const createAppointment = async (appointmentData) => {
  const { data } = await axiosInstance.post("/appointments", appointmentData);
  return data;
};

// update appointment status
export const updateAppointmentStatus = async (appointmentId, status) => {
  const { data } = await axiosSecure.put(`/appointments/${appointmentId}`, {
    status,
  });
  return data;
};

// delete appointment by id
export const deleteAppointment = async (appointmentId) => {
  const { data } = await axiosSecure.delete(`/appointments/${appointmentId}`);
  return data;
};
