import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTourAgency } from "../../../api/agency-api";
import { uploadImage } from "../../../api/image-api";
import { addTour, getTour, updateTour } from "../../../api/tour-api";
import useAuth from "../../../hooks/useAuth";
import TourTypeDropdown from "./TourTypeDropdown";

const CreateTour = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get("tourId");
  const [images, setImages] = useState([]);
  const [initialImages, setInitialImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [initialFormData, setInitialFormData] = useState({});
  const [formData, setFormData] = useState({
    tourName: "",
    tourType: "",
    destinations: [""],
    shortDescription: "",
    startDate: "",
    endDate: "",
    maxGroupSize: "",
    minAge: "",
    pricePerPerson: "",
    inclusions: "",
    exclusions: "",
    itinerary: [
      {
        day: 1,
        activities: "",
        meals: [],
        accommodation: "",
        transport: {
          transportType: "",
          pickUpLocation: "",
          dropOffLocation: "",
          pickUpTime: "",
          dropOffTime: "",
        },
      },
    ],
    tourHighlights: "",
    importantNotes: "",
    meetingPoint: "",
    contactInfo: "",
  });

  useEffect(() => {
    const fetchTourData = async () => {
      if (tourId) {
        try {
          const tourData = await getTour(tourId);
          if (tourData) {
            const initialData = {
              tourName: tourData.tourName,
              tourType: tourData.tourType,
              destinations: tourData.destinations,
              shortDescription: tourData.shortDescription,
              startDate: moment(tourData.startDate).format("YYYY-MM-DDTHH:mm"),
              endDate: moment(tourData.endDate).format("YYYY-MM-DDTHH:mm"),
              maxGroupSize: tourData.maxGroupSize,
              minAge: tourData.minAge,
              pricePerPerson: tourData.pricePerPerson,
              inclusions: tourData.inclusions,
              exclusions: tourData.exclusions,
              itinerary: tourData.itinerary,
              tourHighlights: tourData.tourHighlights,
              importantNotes: tourData.importantNotes,
              meetingPoint: tourData.meetingPoint,
              contactInfo: tourData.contactInfo,
            };
            setFormData(initialData);
            setInitialFormData(initialData);
            setInitialImages(tourData.images);
            setExistingImages(tourData.images);
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch previous tour data");
        }
      }
    };

    fetchTourData();
  }, [tourId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveNewImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleAddDestination = () => {
    setFormData((prevData) => ({
      ...prevData,
      destinations: [...prevData.destinations, ""],
    }));
  };

  const handleRemoveDestination = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      destinations: prevData.destinations.filter((_, i) => i !== index),
    }));
  };

  const handleDestinationChange = (index, value) => {
    const newDestinations = [...formData.destinations];
    newDestinations[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      destinations: newDestinations,
    }));
  };

  const handleAddItineraryDay = () => {
    setFormData((prevData) => ({
      ...prevData,
      itinerary: [
        ...prevData.itinerary,
        {
          day: prevData.itinerary.length + 1,
          activities: "",
          meals: [],
          accommodation: "",
          transport: {
            transportType: "",
            pickUpLocation: "",
            dropOffLocation: "",
            pickUpTime: "",
            dropOffTime: "",
          },
        },
      ],
    }));
  };

  const handleRemoveItineraryDay = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      itinerary: prevData.itinerary.filter((_, i) => i !== index),
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...formData.itinerary];
    if (field === "transport") {
      newItinerary[index].transport = value;
    } else {
      newItinerary[index][field] = value;
    }
    setFormData((prevData) => ({
      ...prevData,
      itinerary: newItinerary,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");

    if (images.length + existingImages.length < 3) {
      toast.error("Please upload at least 3 images", { id: toastId });
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

    // Convert dates to Bangladesh time zone
    const startDate = moment.tz(formData.startDate, "Asia/Dhaka").toDate();
    const endDate = moment.tz(formData.endDate, "Asia/Dhaka").toDate();
    const durationInDays = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );
    const duration = `${durationInDays} days`;

    // Upload images to Cloudinary and get their URLs
    const imageUrls = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "trippie");
      formData.append("folder", "trippie-all-image/tours");

      try {
        const imageUrl = await uploadImage(formData);
        imageUrls.push(imageUrl);
      } catch (error) {
        toast.error("Failed to upload images. Please try again later", {
          id: toastId,
        });
        throw error;
      }
    }

    const agencyData = await getTourAgency(user?.email);
    if (!agencyData) {
      toast.error("Failed to get agency data", { id: toastId });
      return;
    }

    const allImageUrls = [...existingImages, ...imageUrls];

    // Prepare tour data to be sent to the server
    const tourData = {
      ...formData,
      startDate,
      endDate,
      duration,
      images: allImageUrls,
      agencyId: agencyData._id,
      agencyName: agencyData.agencyName,
      agencyEmail: agencyData.email,
      agencyMobile: agencyData.mobile,
      agent: user?.email,
    };

    try {
      if (tourId) {
        await updateTour(tourId, tourData);
        toast.success("Tour updated successfully!", { id: toastId });
      } else {
        await addTour(tourData);
        toast.success("Tour created successfully!", { id: toastId });
      }
      navigate("/dashboard/manage-tours");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save tour", { id: toastId });
    }
  };

  return (
    <>
      <Helmet>
        <title>Trippie - {tourId ? "Edit Tour" : "Create Tour"}</title>
      </Helmet>
      <h1 className="text-2xl lg:text-3xl font-medium mb-8">
        {tourId ? "Edit Tour" : "Create Tour"}
      </h1>
      <div className="bg-white px-5 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 rounded-xl drop-shadow-sm">
        <h2 className="text-center text-outerSpace font-medium text-2xl lg:text-3xl mb-5">
          {tourId ? "Edit Tour" : "Create a New Tour"}
        </h2>
        <p className="max-w-5xl mx-auto text-center text-blue-gray-500 md:text-lg mb-6">
          Please fill out the form below to {tourId ? "edit" : "create"} a tour.
          Ensure all fields are filled correctly.
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5"
        >
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">Tour Name</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="tourName"
              placeholder="Enter tour name"
              value={formData.tourName}
              onChange={handleInputChange}
              required
            />
          </span>
          <TourTypeDropdown
            value={formData.tourType}
            onChange={handleInputChange}
          />
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Destinations
            </p>
            {formData.destinations.map((destination, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
                  type="text"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) =>
                    handleDestinationChange(index, e.target.value)
                  }
                  required
                />
                {formData.destinations.length > 1 && (
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-2"
                    onClick={() => handleRemoveDestination(index)}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="bg-primary-base hover:bg-primary-500 transition-colors text-white md:text-lg font-semibold px-3 py-2.5 rounded-md"
              onClick={handleAddDestination}
            >
              Add Destination
            </button>
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Short Description
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="shortDescription"
              placeholder="Enter short description"
              value={formData.shortDescription}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Start Date and Time
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              End Date and Time
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Maximum Group Size
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="number"
              name="maxGroupSize"
              placeholder="Enter maximum group size"
              value={formData.maxGroupSize}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Minimum Age Requirement
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="number"
              name="minAge"
              placeholder="Enter minimum age requirement"
              value={formData.minAge}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Price per Person
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="number"
              name="pricePerPerson"
              placeholder="Enter price per person"
              value={formData.pricePerPerson}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">Inclusions</p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="inclusions"
              placeholder="Enter inclusions"
              value={formData.inclusions}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">Exclusions</p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="exclusions"
              placeholder="Enter exclusions"
              value={formData.exclusions}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2 xl:col-span-full">
            <p className="text-outerSpace md:text-lg font-semibold">
              Itinerary
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
              {formData.itinerary.map((day, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <p className="text-outerSpace md:text-lg font-medium">
                    Day {day.day}
                  </p>
                  <textarea
                    className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
                    name="activities"
                    placeholder="Enter activities"
                    value={day.activities}
                    onChange={(e) =>
                      handleItineraryChange(index, "activities", e.target.value)
                    }
                    required
                  />
                  <input
                    className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
                    type="text"
                    name="accommodation"
                    placeholder="Enter accommodation details"
                    value={day.accommodation}
                    onChange={(e) =>
                      handleItineraryChange(
                        index,
                        "accommodation",
                        e.target.value
                      )
                    }
                    required
                  />
                  <div className="flex items-center space-x-2 flex-wrap">
                    <label className="text-outerSpace md:text-lg font-medium">
                      Meals:
                    </label>
                    <label className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        name="meals"
                        value="Breakfast"
                        checked={day.meals.includes("Breakfast")}
                        onChange={(e) =>
                          handleItineraryChange(
                            index,
                            "meals",
                            e.target.checked
                              ? [...day.meals, e.target.value]
                              : day.meals.filter(
                                  (meal) => meal !== e.target.value
                                )
                          )
                        }
                      />
                      <span>Breakfast</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        name="meals"
                        value="Lunch"
                        checked={day.meals.includes("Lunch")}
                        onChange={(e) =>
                          handleItineraryChange(
                            index,
                            "meals",
                            e.target.checked
                              ? [...day.meals, e.target.value]
                              : day.meals.filter(
                                  (meal) => meal !== e.target.value
                                )
                          )
                        }
                      />
                      <span>Lunch</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        name="meals"
                        value="Dinner"
                        checked={day.meals.includes("Dinner")}
                        onChange={(e) =>
                          handleItineraryChange(
                            index,
                            "meals",
                            e.target.checked
                              ? [...day.meals, e.target.value]
                              : day.meals.filter(
                                  (meal) => meal !== e.target.value
                                )
                          )
                        }
                      />
                      <span>Dinner</span>
                    </label>
                  </div>
                  <p className="text-outerSpace md:text-lg font-medium">
                    Transport Information:
                  </p>
                  <input
                    className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
                    type="text"
                    name="transportType"
                    placeholder="Enter transport type"
                    value={day.transport.transportType}
                    onChange={(e) =>
                      handleItineraryChange(index, "transport", {
                        ...day.transport,
                        transportType: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
                    type="text"
                    name="pickUpLocation"
                    placeholder="Enter pickup location"
                    value={day.transport.pickUpLocation}
                    onChange={(e) =>
                      handleItineraryChange(index, "transport", {
                        ...day.transport,
                        pickUpLocation: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
                    type="datetime-local"
                    name="pickUpTime"
                    value={moment(day.transport.pickUpTime).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                    onChange={(e) =>
                      handleItineraryChange(index, "transport", {
                        ...day.transport,
                        pickUpTime: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
                    type="text"
                    name="dropOffLocation"
                    placeholder="Enter dropOff location"
                    value={day.transport.dropOffLocation}
                    onChange={(e) =>
                      handleItineraryChange(index, "transport", {
                        ...day.transport,
                        dropOffLocation: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
                    type="datetime-local"
                    name="dropOffTime"
                    value={moment(day.transport.dropOffTime).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                    onChange={(e) =>
                      handleItineraryChange(index, "transport", {
                        ...day.transport,
                        dropOffTime: e.target.value,
                      })
                    }
                    required
                  />
                  {formData.itinerary.length > 1 && (
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded-md p-2"
                      onClick={() => handleRemoveItineraryDay(index)}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="bg-primary-base hover:bg-primary-500 transition-colors text-white md:text-lg font-semibold px-3 py-2 rounded-md"
              onClick={handleAddItineraryDay}
            >
              Add Day
            </button>
          </span>

          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Tour Highlights
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="tourHighlights"
              placeholder="Enter tour highlights"
              value={formData.tourHighlights}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Important Notes
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="importantNotes"
              placeholder="Enter important notes"
              value={formData.importantNotes}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Meeting Point
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="meetingPoint"
              placeholder="Enter meeting point"
              value={formData.meetingPoint}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Contact Information
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="contactInfo"
              placeholder="Enter contact information"
              value={formData.contactInfo}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-3 md:col-span-2 2xl:col-span-full">
            <p className="text-outerSpace md:text-lg font-medium">
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
              className="bg-primary-base hover:bg-primary-500 transition-colors text-white text-xl font-semibold px-5 py-2.5 rounded-lg"
              type="submit"
            >
              {tourId ? "Update Tour" : "Create Tour"}
            </button>
          </span>
        </form>
      </div>
    </>
  );
};

export default CreateTour;
