import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addHotel, getHotel, updateHotel } from "../../../api/hotel-api";
import { uploadImage } from "../../../api/image-api";
import useAuth from "../../../hooks/useAuth";

const HotelProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [initialImages, setInitialImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [initialFormData, setInitialFormData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    area: "",
    location: "",
    starRating: 2,
    facilities: "",
    minRoomPrice: 1,
    maxRoomPrice: 1,
    aboutUs: "",
    policy: "",
  });

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const hotelData = await getHotel(user?.email);
        if (hotelData) {
          const initialData = {
            id: hotelData._id,
            name: hotelData.name,
            city: hotelData.city,
            area: hotelData.area,
            location: hotelData.location,
            starRating: hotelData.starRating,
            facilities: hotelData.facilities.join("; "),
            minRoomPrice: hotelData.minRoomPrice,
            maxRoomPrice: hotelData.maxRoomPrice,
            aboutUs: hotelData.aboutUs,
            policy: hotelData.policy.join("; "),
          };
          setFormData(initialData);
          setInitialFormData(initialData);
          setInitialImages(hotelData.images);
          setExistingImages(hotelData.images);
          setIsUpdate(true);
        }
      } catch (error) {
        console.log(error);
        console.log("Hotel not found, creating new hotel profile.");
      }
    };

    if (user?.email) {
      fetchHotelData();
    }
  }, [user?.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveNewImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");

    if (images.length + existingImages.length < 5) {
      toast.error("Have to add minimum 5 images", { id: toastId });
      return;
    }

    // Check if any data has changed
    const isDataChanged =
      JSON.stringify(formData) !== JSON.stringify(initialFormData);
    const areImagesChanged =
      JSON.stringify(existingImages) !== JSON.stringify(initialImages) ||
      images.length > 0;

    if (!isDataChanged && !areImagesChanged) {
      toast.error("Please change a field before updating", { id: toastId });
      return;
    }

    // Upload new images to Cloudinary and get their URLs
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "trippie");
        formData.append("folder", "trippie-all-image/hotels");

        try {
          const secureUrl = await uploadImage(formData);
          return secureUrl;
        } catch (error) {
          toast.error("Failed to upload image. Please try again later");
          throw error;
        }
      })
    );

    // Combine existing image URLs with new image URLs
    const allImageUrls = [...existingImages, ...imageUrls];

    // Prepare hotel data to be sent to the server
    const hotelData = {
      ...formData,
      images: allImageUrls,
      facilities: formData.facilities.split("; "),
      policy: formData.policy.split("; "),
      manager: user?.email,
    };

    try {
      if (isUpdate) {
        await updateHotel(formData.id, hotelData);
        toast.success("Hotel profile updated successfully!", { id: toastId });
        navigate("/hotel/list");
      } else {
        await addHotel(hotelData);
        toast.success("Hotel profile created successfully!", { id: toastId });
        navigate("/hotel/list");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add hotel profile", { id: toastId });
    }
  };

  return (
    <>
      <Helmet>
        <title>Trippie - Hotel Profile</title>
      </Helmet>
      <h1 className="text-2xl lg:text-3xl font-medium mb-8">Hotel Profile</h1>
      <div className="bg-white px-5 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 rounded-xl drop-shadow-sm">
        <h2 className="text-center text-outerSpace font-medium text-2xl lg:text-3xl mb-5">
          {isUpdate ? "Update Hotel Profile" : "Create Hotel Profile"}
        </h2>
        <p className="max-w-5xl mx-auto text-center text-blue-gray-500 md:text-lg mb-6">
          Please fill out the form below to create or update the hotel profile.
          Ensure all fields are filled correctly and upload at least 5 images of
          the hotel.
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6"
        >
          <span className="space-y-3">
            <p className="text-outerSpace text-lg font-medium">Name</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="name"
              placeholder="Sayeman Beach Resort"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3">
            <p className="text-outerSpace text-lg font-medium">City</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="city"
              placeholder="Cox's Bazar"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3">
            <p className="text-outerSpace text-lg font-medium">Area</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="area"
              placeholder="Kolatoli Beach"
              value={formData.area}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3">
            <p className="text-outerSpace text-lg font-medium">Location</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="location"
              placeholder="Marine Drive Road, Kolatoli, Cox's Bazar, Bangladesh"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3">
            <p className="text-outerSpace text-lg font-medium">Star Rating</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="number"
              name="starRating"
              placeholder="3/4/5"
              min={2}
              value={formData.starRating}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3">
            <p className="text-outerSpace text-lg font-medium">
              Facilities (semicolon separated)
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="facilities"
              placeholder="Free Wi-Fi; Pool; Gym; Parking"
              value={formData.facilities}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3">
            <p className="text-outerSpace text-lg font-medium">
              Min Room Price
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="number"
              name="minRoomPrice"
              placeholder="Enter minimum room price"
              min={100}
              value={formData.minRoomPrice}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3">
            <p className="text-outerSpace text-lg font-medium">
              Max Room Price
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="number"
              name="maxRoomPrice"
              placeholder="Enter maximum room price"
              min={100}
              value={formData.maxRoomPrice}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3 md:col-span-2">
            <p className="text-outerSpace text-lg font-medium">
              Policy (semicolon separated)
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="policy"
              placeholder="Check-in Time: 12:00 PM; Check-out Time: 10:30 AM; Children: Allowed; Pets: Not Allowed; Smoking: Not Allowed in Rooms"
              value={formData.policy}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3 md:col-span-2">
            <p className="text-outerSpace text-lg font-medium">About Us</p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="aboutUs"
              placeholder="Enter hotel description"
              value={formData.aboutUs}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3 md:col-span-2 2xl:col-span-full">
            <p className="text-outerSpace text-lg font-medium">
              Images (add at least 5 images)(*max file size 10MB*)
            </p>
            <div className="flex flex-wrap gap-4">
              {existingImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
                >
                  <img
                    src={image}
                    alt={`Hotel Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => handleRemoveExistingImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => handleRemoveNewImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <div className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition duration-300">
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <FaPlus className="text-secondary-500 hover:text-secondary-700 transition duration-300 text-2xl hover:font-medium" />
              </div>
            </div>
          </span>
          <span className="mx-auto md:col-span-2 2xl:col-span-4 mt-6">
            <button
              className="bg-primary-base hover:bg-primary-500 transition-colors text-white text-xl font-semibold px-8 py-3 rounded-md"
              type="submit"
            >
              {isUpdate ? "Update Hotel" : "Create Hotel"}
            </button>
          </span>
        </form>
      </div>
    </>
  );
};

export default HotelProfile;
