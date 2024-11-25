import { axiosSecure } from "../hooks/axiosSecure";

// Fetch room details by room id
export const fetchRoom = async (id) => {
  const { data } = await axiosSecure.get(`/rooms/${id}`);
  return data;
};

// Add a new room
export const addRoom = async (roomData) => {
  const { data } = await axiosSecure.post("/rooms", roomData);
  return data;
};

// Update room details
export const updateRoom = async (id, roomData) => {
  const { data } = await axiosSecure.put(`/rooms/${id}`, roomData);
  return data;
};

// Get all rooms added by the hotel manager
export const getRooms = async (email) => {
  const { data } = await axiosSecure.get(`/rooms?email=${email}`);
  return data;
};

// Delete a specific room number
export const deleteRoomNumber = async (roomId, roomNumber) => {
  const { data } = await axiosSecure.delete(`/rooms/${roomId}/${roomNumber}`);
  return data;
};

// Delete an entire room type
export const deleteRoom = async (id) => {
  const { data } = await axiosSecure.delete(`/rooms/${id}`);
  return data;
};
