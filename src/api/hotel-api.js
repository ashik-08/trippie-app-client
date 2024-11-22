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
