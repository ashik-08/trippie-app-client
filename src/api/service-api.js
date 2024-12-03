import { axiosSecure } from "../hooks/axiosSecure";

// add service
export const addService = async (serviceData) => {
  const { data } = await axiosSecure.post(`/services`, serviceData);
  return data;
};

// get service by id
export const getService = async (id) => {
  const { data } = await axiosSecure.get(`/services/${id}`);
  return data;
};

// get all services by email
export const getAllServicesByEmail = async (email) => {
  const { data } = await axiosSecure.get(`/services/email/${email}`);
  return data;
};

// update service by id
export const updateService = async (id, serviceData) => {
  const { data } = await axiosSecure.put(`/services/${id}`, serviceData);
  return data;
};

// delete service by id
export const deleteService = async (id) => {
  const { data } = await axiosSecure.delete(`/services/${id}`);
  return data;
};
