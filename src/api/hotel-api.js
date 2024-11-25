import { axiosSecure } from "../hooks/axiosSecure";
import axiosInstance from "./axiosInstance";

// Fetch hotels based on search criteria
export const fetchHotels = async (searchData) => {
  const params = new URLSearchParams(searchData).toString();
  const { data } = await axiosInstance.get(`/hotels?${params}`);
  return data;
};

// Fetch hotel details and available rooms
export const fetchHotelDetails = async ({ queryKey }) => {
  const [, { hotelId, checkInDate, checkOutDate }] = queryKey;
  const { data } = await axiosInstance.get(`/hotels/details/${hotelId}`, {
    params: { checkInDate, checkOutDate },
  });
  return data;
};

// Fetch hotel details by hotelManager email
export const getHotel = async (email) => {
  const { data } = await axiosSecure.get(`/hotels/${email}`);
  return data;
};

// Add a new hotel
export const addHotel = async (hotelData) => {
  const { data } = await axiosSecure.post("/hotels", hotelData);
  return data;
};

// Update hotel details
export const updateHotel = async (id, hotelData) => {
  const { data } = await axiosSecure.put(`/hotels/${id}`, hotelData);
  return data;
};
