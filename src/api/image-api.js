import axios from "axios";

export const uploadImage = async (formData) => {
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/ashikur-rahman/image/upload",
    formData
  );

  if (response.status !== 200) {
    throw new Error("Failed to upload image to Cloudinary");
  }
  return response.data.secure_url;
};
