import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTourGuide } from "../../../api/guide-api";
import { uploadImage } from "../../../api/image-api";
import {
  addService,
  getService,
  updateService,
} from "../../../api/service-api";
import { getSubscriptionStatus } from "../../../api/subscription-api";
import LoadingSpinner from "../../../components/LoadingState/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import "./calenderStyles.css";

const AddService = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const [existingServices, setExistingServices] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [images, setImages] = useState([]);
  const [initialImages, setInitialImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [initialFormData, setInitialFormData] = useState({});
  const [formData, setFormData] = useState({
    tourName: "",
    tourType: "",
    location: "",
    guestType: "",
    tourOverview: "",
    difficulty: "",
    price: "",
    idealTime: "",
    tourHighlights: "",
    specialAspects: "",
    duration: "",
    // availabilityDateRange: {
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     slot: "",
    //   },
    // availabilityStartDate: "",
    // availabilityEndDate: "",
    // slot: "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchSubscriptionStatusAndServiceData = async () => {
      try {
        const subscriptionResponse = await getSubscriptionStatus(user?.email);
        if (isMounted && subscriptionResponse?.status !== "active") {
          toast.error(
            "Your subscription is inactive. Please subscribe or renew to add services."
          );
          navigate("/dashboard/tour-guide-home");
          return;
        }

        if (subscriptionResponse.status === "active") {
          setSubscriptionEndDate(
            moment(subscriptionResponse.validityEnd).toDate()
          );
        }

        if (serviceId) {
          try {
            const serviceData = await getService(serviceId);
            if (serviceData) {
              const initialData = {
                tourName: serviceData.tourName,
                tourType: serviceData.tourType,
                location: serviceData.location,
                guestType: serviceData.guestType,
                tourOverview: serviceData.tourOverview,
                difficulty: serviceData.difficulty.join("; "),
                price: serviceData.price,
                idealTime: serviceData.idealTime,
                tourHighlights: serviceData.tourHighlights.join("; "),
                specialAspects: serviceData.specialAspects,
                duration: serviceData.duration,
                slot: serviceData.slot,
                // availabilityStartDate: moment(
                //   serviceData.availabilityDateRange.startDate
                // ).toDate(),
                // availabilityEndDate: moment(
                //   serviceData.availabilityDateRange.endDate
                // ).toDate(),
                // slot: serviceData.slot,
              };
              setFormData(initialData);
              setInitialFormData(initialData);
              setInitialImages(serviceData.images);
              setExistingImages(serviceData.images);
              setDateRange([
                {
                  startDate: moment(serviceData.availabilityStartDate).toDate(),
                  endDate: moment(serviceData.availabilityEndDate).toDate(),
                  key: "selection",
                },
              ]);
            }
          } catch (error) {
            console.error(error);
            toast.error("Failed to fetch previous service data");
          }
        }

        // Mock data for existing services
        // const mockServices = [
        //   {
        //     availabilityDateRange: {
        //       startDate: "2024-12-05", // Actual date
        //       endDate: "2024-12-08", // Actual date
        //       slot: "morning", // Morning slot
        //     },
        //   },
        //   {
        //     availabilityDateRange: {
        //       startDate: "2024-12-10", // Actual date
        //       endDate: "2024-12-10", // Actual date
        //       slot: "full day", // Full day slot
        //     },
        //   },
        // ];

        // Fetch existing services of the tour guide
        const existingServicesResponse = await getServicesByGuide(user?.email);
        if (isMounted) {
          setExistingServices(existingServicesResponse);

          // Set booked dates
          const bookedDates = existingServicesResponse.flatMap((service) => {
            const serviceStartDate = moment(
              service.availabilityDateRange.startDate
            );
            const serviceEndDate = moment(
              service.availabilityDateRange.endDate
            );
            const dates = [];
            for (
              let date = serviceStartDate;
              date.isSameOrBefore(serviceEndDate);
              date.add(1, "days")
            ) {
              //   dates.push(date.toDate());
              dates.push({
                date: date.toDate(),
                slot: service.availabilityDateRange.slot,
              });
            }
            return dates;
          });

          // Filter out dates with slot "full day"
          const disabledDates = bookedDates
            .filter((date) => date.slot === "full day")
            .map((date) => date.date);

          setBookedDates(bookedDates);
          setDisabledDates(disabledDates);
        }
      } catch (error) {
        console.error(
          "Failed to fetch subscription status or service data",
          error
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (user?.email) {
      fetchSubscriptionStatusAndServiceData();
    }

    return () => {
      isMounted = false;
    };
  }, [user?.email, navigate, serviceId]);

  if (loading) {
    return <LoadingSpinner />;
  }

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

  //   const isAvailable = (startDate, endDate, slot) => {
  //     for (const service of existingServices) {
  //       const serviceStartDate = moment(service.availabilityDateRange.startDate);
  //       const serviceEndDate = moment(service.availabilityDateRange.endDate);

  //       if (
  //         (startDate.isBetween(serviceStartDate, serviceEndDate, null, "[]") ||
  //           endDate.isBetween(serviceStartDate, serviceEndDate, null, "[]")) &&
  //         (service.slot === "full day" ||
  //           slot === "full day" ||
  //           service.slot === slot)
  //       ) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   };

  // const isAvailable = (startDate, endDate, slot) => {
  //     const start = moment(startDate);
  //     const end = moment(endDate);

  //     for (let date = start; date.isSameOrBefore(end); date.add(1, "days")) {
  //       const bookedSlot = bookedDates.find(
  //         (bookedDate) =>
  //           moment(bookedDate.date).isSame(date, "day") && bookedDate.slot === slot
  //       );
  //       if (bookedSlot) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   };

  const isAvailable = (startDate, endDate, slot) => {
    const start = moment(startDate);
    const end = moment(endDate);

    for (let date = start; date.isSameOrBefore(end); date.add(1, "days")) {
      const bookedSlot = bookedDates.find(
        (bookedDate) =>
          moment(bookedDate.date).isSame(date, "day") &&
          (bookedDate.slot === slot ||
            bookedDate.slot === "full day" ||
            slot === "full day")
      );
      if (bookedSlot) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");

    // Check if a slot is selected
    if (!formData.slot) {
      toast.error("Please select a time slot", { id: toastId });
      return;
    }

    // Check if at least 3 images are uploaded
    if (images.length + existingImages.length < 3) {
      toast.error("Please upload at least 3 images", { id: toastId });
      return;
    }

    // Check if the availability date range is valid
    const startDate = moment(formData.availabilityStartDate);
    const endDate = moment(formData.availabilityEndDate);
    const slot = formData.slot;

    if (!isAvailable(startDate, endDate, slot)) {
      toast.error("The selected date range and slot are already booked", {
        id: toastId,
      });
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

    const imageUrls = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "trippie");
      formData.append("folder", "trippie-all-image/services");

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

    const guideData = await getTourGuide(user?.email);
    if (!guideData) {
      toast.error("Failed to get guide data", { id: toastId });
      return;
    }

    const allImageUrls = [...existingImages, ...imageUrls];

    const serviceData = {
      ...formData,
      difficulty: formData.difficulty.split("; "),
      tourHighlights: formData.tourHighlights.split("; "),
      //   availabilityDateRange: {
      //     startDate: formData.availabilityStartDate,
      //     endDate: formData.availabilityEndDate,
      //     slot: formData.slot,
      //   },
      images: allImageUrls,
      guideId: guideData._id,
      guideName: guideData.guideName,
      guideEmail: user?.email,
    };

    try {
      if (serviceId) {
        await updateService(serviceId, serviceData);
        toast.success("Service updated successfully!", { id: toastId });
      } else {
        await addService(serviceData);
        console.log(serviceData);

        toast.success("Service added successfully!", { id: toastId });
      }
      navigate("/dashboard/manage-services");
    } catch (error) {
      console.error("Failed to add service", error);
      toast.error("Failed to add service. Please try again later.", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Trippie - {serviceId ? "Edit Service" : "Add Service"}</title>
      </Helmet>
      <h1 className="text-2xl lg:text-3xl font-medium mb-8">
        {serviceId ? "Edit Service" : "Add Service"}
      </h1>
      <div className="bg-white px-5 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 rounded-xl drop-shadow-sm">
        <h2 className="text-center text-outerSpace font-medium text-2xl lg:text-3xl mb-5">
          {serviceId ? "Edit Service" : "Add Service"}
        </h2>
        <p className="max-w-5xl mx-auto text-center text-blue-gray-500 md:text-lg mb-6">
          Please fill out the form below to {serviceId ? "edit" : "add"} your
          service. Ensure all fields are filled correctly.
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5"
        >
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Tour Name</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="tourName"
              placeholder="Historic City Walk"
              value={formData.tourName}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Tour Type</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="tourType"
              placeholder="Cultural Food Tour"
              value={formData.tourType}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Location</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="location"
              placeholder="Dim Pahar, Bandarban"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Guest Type</p>
            <select
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="guestType"
              value={formData.guestType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Guest</option>
              <option value="couple">Couple</option>
              <option value="family">Family</option>
              <option value="friends">Friends</option>
              <option value="public">Public</option>
            </select>
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Tour Overview
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="tourOverview"
              rows={3}
              placeholder="A brief description of what the tour involves, highlighting key experiences."
              value={formData.tourOverview}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Difficulty{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *semicolon separated
              </span>
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="difficulty"
              placeholder="Easy walk, moderate hike, challenging trek"
              value={formData.difficulty}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Price{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *amount in BDT
              </span>
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="number"
              name="price"
              placeholder="3500"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Ideal Time</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="idealTime"
              placeholder="Best at November to February"
              value={formData.idealTime}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Tour Highlights{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *semicolon separated
              </span>
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="tourHighlights"
              rows={3}
              placeholder="Separate highlights with semicolons"
              value={formData.tourHighlights}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Special Aspects
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="specialAspects"
              rows={3}
              placeholder="Explain the historical, cultural, natural, or architectural significance of the location."
              value={formData.specialAspects}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Available Between
            </p>
            <DateRangePicker
              ranges={dateRange}
              onChange={(item) => {
                setDateRange([item.selection]);
                setFormData((prevData) => ({
                  ...prevData,
                  availabilityStartDate: item.selection.startDate,
                  availabilityEndDate: item.selection.endDate,
                }));
              }}
              minDate={new Date()}
              maxDate={subscriptionEndDate}
              disabledDates={disabledDates}
              rangeColors={["#3b82f6"]}
              className="w-full overflow-auto"
            />
          </span>
          {/* slot dropdown */}
          {/* <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium my-color">
              Slot
            </p>
            <select
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="slot"
              value={formData.slot}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Slot</option>
              <option
                value="morning"
                disabled={
                  !isAvailable(
                    moment(formData.availabilityStartDate),
                    moment(formData.availabilityEndDate),
                    "morning"
                  )
                }
              >
                Morning
              </option>
              <option
                value="afternoon"
                disabled={
                  !isAvailable(
                    moment(formData.availabilityStartDate),
                    moment(formData.availabilityEndDate),
                    "afternoon"
                  )
                }
              >
                Afternoon
              </option>
              <option
                value="night"
                disabled={
                  !isAvailable(
                    moment(formData.availabilityStartDate),
                    moment(formData.availabilityEndDate),
                    "night"
                  )
                }
              >
                Night
              </option>
              <option
                value="full day"
                disabled={
                  !isAvailable(
                    moment(formData.availabilityStartDate),
                    moment(formData.availabilityEndDate),
                    "full day"
                  )
                }
              >
                Full Day
              </option>
            </select>
          </span> */}
          {/* slot checkbox */}
          {/* <span className="space-y-2">
  <p className="text-outerSpace md:text-lg font-medium my-color">Slot</p>
  <div className="flex flex-wrap gap-4">
    {["morning", "afternoon", "night", "full day"].map((slot) => (
      <label
        key={slot}
        className={`flex items-center space-x-2 p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500 cursor-pointer ${
          !isAvailable(
            moment(formData.availabilityStartDate),
            moment(formData.availabilityEndDate),
            slot
          )
            ? "bg-gray-300 cursor-not-allowed"
            : ""
        }`}
      >
        <input
          type="checkbox"
          name="slot"
          value={slot}
          checked={formData.slot === slot}
          onChange={(e) => {
            if (e.target.checked) {
              setFormData((prevData) => ({
                ...prevData,
                slot: slot,
              }));
            } else {
              setFormData((prevData) => ({
                ...prevData,
                slot: "",
              }));
            }
          }}
          disabled={
            !isAvailable(
              moment(formData.availabilityStartDate),
              moment(formData.availabilityEndDate),
              slot
            )
          }
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span
          className={`${
            !isAvailable(
              moment(formData.availabilityStartDate),
              moment(formData.availabilityEndDate),
              slot
            )
              ? "text-gray-500"
              : ""
          }`}
        >
          {slot.charAt(0).toUpperCase() + slot.slice(1)}
        </span>
      </label>
    ))}
  </div>
            </span> */}
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Time Slot</p>
            <div className="flex flex-wrap gap-4">
              {["morning", "afternoon", "night", "full day"].map((slot) => (
                <label
                  key={slot}
                  className={`text-base flex items-center space-x-2 p-3 rounded-md bg-gray-100 cursor-pointer ${
                    !isAvailable(
                      formData.availabilityStartDate,
                      formData.availabilityEndDate,
                      slot
                    )
                      ? "bg-gray-300 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    name="slot"
                    value={slot}
                    checked={formData.slot === slot}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prevData) => ({
                          ...prevData,
                          slot: slot,
                        }));
                      } else {
                        setFormData((prevData) => ({
                          ...prevData,
                          slot: "",
                        }));
                      }
                    }}
                    disabled={
                      !isAvailable(
                        formData.availabilityStartDate,
                        formData.availabilityEndDate,
                        slot
                      )
                    }
                    className="form-checkbox h-4 w-4 text-secondary-base rounded"
                  />
                  <span
                    className={`${
                      !isAvailable(
                        formData.availabilityStartDate,
                        formData.availabilityEndDate,
                        slot
                      )
                        ? "text-gray-500"
                        : ""
                    }`}
                  >
                    {slot.charAt(0).toUpperCase() + slot.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Duration</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="duration"
              placeholder="2 days, 3 hours"
              value={formData.duration}
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
                    alt={`Service Image ${index + 1}`}
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
              {serviceId ? "Update Service" : "Add Service"}
            </button>
          </span>
        </form>
      </div>
    </>
  );
};

export default AddService;
