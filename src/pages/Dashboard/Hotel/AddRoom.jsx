import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getHotel } from "../../../api/hotel-api";
import { uploadImage } from "../../../api/image-api";
import { addRoom, fetchRoom, updateRoom } from "../../../api/room-api";
import useAuth from "../../../hooks/useAuth";

const AddRoom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [images, setImages] = useState([]);
  const [initialImages, setInitialImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [initialFormData, setInitialFormData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    bedType: "",
    maxGuests: 0,
    facilities: "",
    pricePerNight: 0,
    roomDetails: [],
  });

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await fetchRoom(roomId);
        if (roomData) {
          const initialData = {
            name: roomData.name,
            type: roomData.type,
            bedType: roomData.bedType,
            maxGuests: roomData.maxGuests,
            facilities: roomData.facilities.join("; "),
            pricePerNight: roomData.pricePerNight,
            roomDetails: roomData.roomDetails,
            hotelId: roomData.hotelId,
            hotelName: roomData.hotelName,
            hotelManager: roomData.hotelManager,
          };
          setFormData(initialData);
          setInitialFormData(initialData);
          setInitialImages(roomData.images);
          setExistingImages(roomData.images);
          setIsUpdate(true);
        }
      } catch (error) {
        console.log(error);
        console.log("Room not found, adding new room.");
      }
    };

    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoomDetailsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRoomDetails = formData.roomDetails.map((detail, i) =>
      i === index ? { ...detail, [name]: value } : detail
    );
    setFormData((prevData) => ({
      ...prevData,
      roomDetails: updatedRoomDetails,
    }));
  };

  const handleAddRoomDetail = () => {
    setFormData((prevData) => ({
      ...prevData,
      roomDetails: [
        ...prevData.roomDetails,
        { roomNumber: "", addedDate: "", availabilityDate: "" },
      ],
    }));
  };

  const handleRemoveRoomDetail = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      roomDetails: prevData.roomDetails.filter((_, i) => i !== index),
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

    // Fetch hotel data using manager's email
    let hotelData;
    if (!isUpdate) {
      try {
        hotelData = await getHotel(user?.email);
        if (!hotelData) {
          toast.error("Hotel not found. Please add a hotel first", {
            id: toastId,
          });
          return navigate("/dashboard/hotel-profile");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch hotel data. Try again later", {
          id: toastId,
        });
        return navigate("/");
      }
    }

    // Validate room details
    if (
      formData.roomDetails.length === 0 ||
      formData.roomDetails.some(
        (detail) =>
          !detail.roomNumber || !detail.addedDate || !detail.availabilityDate
      )
    ) {
      toast.error("Add minimum one room with all required fields", {
        id: toastId,
      });
      return;
    }

    if (images.length + existingImages.length < 3) {
      toast.error("Have to add minimum 3 images", { id: toastId });
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
        formData.append("folder", "trippie-all-image/rooms");

        try {
          const secureUrl = await uploadImage(formData);
          return secureUrl;
        } catch (error) {
          toast.error("Failed to upload image. Please try again later", {
            id: toastId,
          });
          throw error;
        }
      })
    );

    // Combine existing image URLs with new image URLs
    const allImageUrls = [...existingImages, ...imageUrls];

    // Prepare room data to be sent to the server
    const roomData = {
      ...formData,
      facilities: formData.facilities.split("; "),
      images: allImageUrls,
      hotelId: hotelData?._id,
      hotelName: hotelData?.name,
      hotelManager: hotelData?.manager,
    };

    try {
      if (isUpdate) {
        await updateRoom(roomId, roomData);
        toast.success("Room updated successfully!", { id: toastId });
        navigate("/dashboard/manage-rooms");
      } else {
        await addRoom(roomData);
        toast.success("Room created successfully!", { id: toastId });
        navigate("/dashboard/manage-rooms");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add room", { id: toastId });
    }
  };

  return (
    <>
      <Helmet>
        <title>Trippie - Add Room</title>
      </Helmet>
      <h1 className="text-2xl lg:text-3xl font-medium mb-8">
        {isUpdate ? "Edit Room" : "Add Room"}
      </h1>
      <div className="bg-white px-5 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 rounded-xl drop-shadow-sm">
        <h2 className="text-center text-outerSpace font-medium text-2xl lg:text-3xl mb-5">
          {isUpdate ? "Update Room" : "Create a Room"}
        </h2>
        <p className="max-w-5xl mx-auto text-center text-blue-gray-500 md:text-lg mb-6">
          Please fill out the form below to create or update room. Ensure all
          fields are filled correctly and upload at least 3 images of the room.
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6"
        >
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Room Name</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="name"
              placeholder="Deluxe Double Without Balcony"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Room Type</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="type"
              placeholder="Deluxe/Standard/Suite"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Bed Type</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="bedType"
              placeholder="Double/King/Queen"
              value={formData.bedType}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Max Guests</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="number"
              name="maxGuests"
              placeholder="Enter max guests"
              min={1}
              value={formData.maxGuests}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Price Per Night
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="number"
              name="pricePerNight"
              placeholder="Enter price per night"
              min={100}
              value={formData.pricePerNight}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 2xl:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Facilities{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *semicolon separated
              </span>
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="facilities"
              placeholder="AC; TV; House Keeping; Toiletries"
              value={formData.facilities}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3 md:col-span-2 2xl:col-span-full">
            <p className="text-outerSpace text-lg font-semibold">
              Room Details
            </p>
            {formData.roomDetails.map((detail, index) => (
              <div key={index} className="flex flex-col gap-3 mb-4">
                <div className="flex flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap gap-3">
                  <span className="space-y-1.5 w-full">
                    <p className="text-outerSpace font-medium">Room Number</p>
                    <input
                      className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
                      type="number"
                      name="roomNumber"
                      placeholder="Room Number"
                      value={detail.roomNumber}
                      onChange={(e) => handleRoomDetailsChange(index, e)}
                      required
                    />
                  </span>
                  <span className="space-y-1.5 w-full">
                    <p className="text-outerSpace font-medium">
                      Available from
                    </p>
                    <input
                      className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
                      type="date"
                      name="addedDate"
                      placeholder="Added Date"
                      value={detail.addedDate}
                      onChange={(e) => handleRoomDetailsChange(index, e)}
                      required
                    />
                  </span>
                  <span className="space-y-1.5 w-full">
                    <p className="text-outerSpace font-medium">
                      Available until
                    </p>
                    <input
                      className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
                      type="date"
                      name="availabilityDate"
                      placeholder="Availability Date"
                      value={detail.availabilityDate}
                      onChange={(e) => handleRoomDetailsChange(index, e)}
                      required
                    />
                  </span>
                  <button
                    type="button"
                    className="bg-red-500 text-white font-medium rounded-md px-3 py-3 self-end"
                    onClick={() => handleRemoveRoomDetail(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="bg-secondary-500 hover:bg-secondary-base transition duration-300 text-white font-medium rounded-md px-3 py-2.5"
              onClick={handleAddRoomDetail}
            >
              Add Room Detail
            </button>
          </span>
          <span className="space-y-3 md:col-span-2 2xl:col-span-full">
            <p className="text-outerSpace text-lg font-medium">
              Images{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *min 3 images of max file size 10MB
              </span>
            </p>
            <div className="flex flex-wrap gap-4">
              {existingImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
                >
                  <img
                    src={image}
                    alt={`Room Image ${index + 1}`}
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
              {isUpdate ? "Update Room" : "Create Room"}
            </button>
          </span>
        </form>
      </div>
    </>
  );
};

export default AddRoom;
