import axiosInstance from "./axiosInstance";

export const createAppointment = async (appointmentData) => {
  const { data } = await axiosInstance.post("/appointments", appointmentData);
  return data;
};
