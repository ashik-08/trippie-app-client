import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getTour } from "../../api/tour-api";
import LoadingSpinner from "../../components/LoadingState/LoadingSpinner";
import Container from "../../components/Shared/Container/Container";
import PaymentFormWrapper from "../../components/Shared/Payment/PaymentForm";
import useAuth from "../../hooks/useAuth";

const TourDetails = () => {
  const { tourId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [personCount, setPersonCount] = useState(0);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const {
    data: { tour, agency } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tourDetails", tourId],
    queryFn: async () => await getTour(tourId),
    enabled: !!tourId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const handleBooking = () => {
    const participantData = getValues();
    if (
      !participantData.name ||
      !participantData.email ||
      !participantData.phone
    ) {
      toast.error("Please provide booking details before payment");
      return;
    }
    if (!user?.email) {
      navigate("/login");
    } else {
      setOpenPaymentModal(true);
    }
  };

  const handleReset = () => {
    reset();
    setPersonCount(0);
  };

  const handleIncrement = () => {
    const availableSlots = tour.maxGroupSize - tour.bookedCount;
    if (personCount < availableSlots) {
      setPersonCount(personCount + 1);
    } else {
      toast.error("Maximum available slots reached!");
    }
  };

  const handleDecrement = () => {
    if (personCount > 0) {
      setPersonCount(personCount - 1);
    } else {
      toast.error("Cannot be less than zero!");
    }
  };

  const calculateTotalPrice = () => {
    return personCount * Number(tour?.pricePerPerson);
  };

  const totalPrice = calculateTotalPrice();
  const bookingCharge = 0;
  const payNow = 0.1;
  const willDueAmount = Math.round(totalPrice * (1 - payNow));
  const bookingAmount = Math.round(totalPrice * payNow);

  const participantData = getValues();

  const bookingDetails = {
    userEmail: user?.email,
    type: "tour",
    details: {
      tourId,
      totalParticipant: personCount,
      participantData,
      totalPrice,
      bookingAmount,
      dueAmount: willDueAmount,
    },
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="pt-[12%] flex justify-center items-center">
        <div className="p-10 max-w-3xl mx-auto border border-red-400 rounded-lg bg-red-100 text-red-600">
          <p className="text-lg font-semibold">
            There was an error loading the tour details. Please try again later.
            🙏
          </p>
        </div>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Trippie - Tour Details</title>
      </Helmet>
      <section className="py-20 md:py-24 lg:py-28 xl:py-32 text-outerSpace">
        <Container>
          <div>
            {/* Tour Image Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div className="sm:col-span-3">
                <img
                  src={tour.images[0]}
                  alt="Tour Image 1"
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                {tour.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Tour Image ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>

            {/* Tour Information */}
            <div className="mt-8">
              <h1 className="text-primary-500 text-2xl md:text-3xl font-semibold">
                {tour.tourName}
              </h1>
              <p className="mt-1 ml-1 text-gray-700">
                {tour.tourType} | {tour.destinations.join(", ")}
              </p>
              <p className="mt-2 ml-1 text-gray-700">{tour.shortDescription}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Start Date:</span>{" "}
                  {new Date(tour.startDate).toLocaleDateString()}
                </p>
                {" | "}
                <p className="text-gray-700">
                  <span className="font-semibold">End Date:</span>{" "}
                  {new Date(tour.endDate).toLocaleDateString()}
                </p>
                {" | "}
                <p className="text-gray-700">
                  <span className="font-semibold">Duration:</span>{" "}
                  {tour.duration}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Max People:</span>{" "}
                  {tour.maxGroupSize} people&apos;s
                </p>
                {" | "}
                <p className="text-gray-700">
                  <span className="font-semibold">Min Age Requirement:</span>{" "}
                  {tour.minAge} years
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 items-center">
                <p className="text-red-500 text-xl font-semibold">
                  Price: BDT {tour.pricePerPerson}{" "}
                  <span className="text-gray-700 text-sm font-medium">
                    /person
                  </span>
                </p>
                {" | "}
                <p className="text-gray-700">
                  <span className="font-semibold">Available Slots:</span>{" "}
                  {tour.maxGroupSize - tour.bookedCount} persons
                </p>
              </div>
            </div>
          </div>
          {/* Content Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-7 gap-6 mt-12">
            {/* Left Side Container */}
            <div className="md:col-span-2 xl:col-span-5">
              {/* Itinerary Info */}
              <div className="flex justify-between bg-primary-300/30 px-5 py-2 rounded-md">
                <p className="xl:text-lg font-medium">Itinerary</p>
              </div>

              {/* Itinerary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {tour.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="shadow-md border rounded-md p-3 md:p-4 lg:p-6"
                  >
                    <h2 className="text-xl font-semibold text-primary-500">
                      Day {day.day}
                    </h2>
                    <ul className="list-disc list-inside mt-3 text-gray-700">
                      {day.activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                    <p className="text-gray-600 mt-2">
                      <span className="text-gray-700 font-medium">Meals: </span>
                      {day.meals.join(", ")}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <span className="text-gray-700 font-medium">
                        Accommodation:{" "}
                      </span>
                      {day.accommodation}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <span className="text-gray-700 font-medium">
                        Transportation:{" "}
                      </span>
                      {day.transport.transportType}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <span className="text-gray-700 font-medium">
                        Pick-up Location:{" "}
                      </span>
                      {day.transport.pickUpLocation}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <span className="text-gray-700 font-medium">
                        Pick-up Time:{" "}
                      </span>
                      {new Date(day.transport.pickUpTime).toLocaleString()}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <span className="text-gray-700 font-medium">
                        Drop-off Location:{" "}
                      </span>
                      {day.transport.dropOffLocation}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <span className="text-gray-700 font-medium">
                        Drop-off Time:{" "}
                      </span>
                      {new Date(day.transport.dropOffTime).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Container */}
            <form
              onSubmit={handleSubmit(handleBooking)}
              className="md:sticky md:top-20 xl:col-span-2 md:self-start"
            >
              {/* Person Count Counter */}
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">
                  Select Number of People
                </h2>
                <p className="text-gray-600 mt-1">
                  Use the buttons below to select the number of people for the
                  tour to join with you.
                </p>
                <div className="flex items-center justify-between mt-4 border border-gray-300 rounded-xl px-6 py-2">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 rounded-lg px-3 py-1 hover:bg-gray-400 transition-colors"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold">{personCount}</span>
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 rounded-lg px-3 py-1 hover:bg-gray-400 transition-colors"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>

              {personCount > 0 && (
                <>
                  {/* Booking Details */}
                  <div className="border shadow-md rounded-lg p-4">
                    <h2 className="text-2xl font-semibold">Booking Details</h2>
                    <div className="mt-4">
                      {/* Participant Details */}
                      <div>
                        <label htmlFor="name" className="block text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          className={`w-full border ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          } rounded-md p-2 mt-2`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-700 mt-4"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          className={`w-full border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          } rounded-md p-2 mt-2`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-gray-700 mt-4"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          maxLength={11}
                          id="phone"
                          name="phone"
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^01[0-9]{9}$/,
                              message: "Invalid phone number",
                            },
                          })}
                          className={`w-full border ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          } rounded-md p-2 mt-2`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="personCount"
                          className="block text-gray-700 mt-4"
                        >
                          Total Participants
                        </label>
                        <input
                          type="number"
                          id="personCount"
                          name="personCount"
                          value={personCount}
                          disabled
                          className="w-full border border-gray-300 rounded-md p-2 mt-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="border shadow-md rounded-lg p-4 mt-6">
                    <h2 className="text-2xl font-semibold">Pricing Summary</h2>
                    <div className="mt-4 space-y-1">
                      <p className="flex justify-between">
                        <span className="font-semibold">Total Price:</span>
                        <span className="text-gray-700">BDT {totalPrice}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Booking Charge:</span>
                        <span className="text-gray-700">
                          BDT {bookingCharge}
                        </span>
                      </p>
                      <hr />
                      <p className="flex justify-between">
                        <span className="font-semibold">In Total:</span>
                        <span className="text-gray-700">BDT {totalPrice}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">90% Will be Due:</span>
                        <span className="text-red-500">
                          BDT {willDueAmount}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">10% for Booking:</span>
                        <span className="text-gray-700">
                          BDT {bookingAmount}
                        </span>
                      </p>
                      <hr />
                      <p className="flex justify-between">
                        <span className="font-semibold">Pay Now:</span>
                        <span className="text-gray-700">
                          BDT {bookingAmount}
                        </span>
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="w-full hover:bg-secondary-base bg-primary-500 transition-colors text-white py-2 px-4 rounded-md mt-6"
                    >
                      Book & Pay BDT {bookingAmount}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full bg-gray-500 hover:bg-gray-600 transition-colors text-white py-2 px-4 rounded-md mt-2"
                    >
                      Reset
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 p-2 md:p-4 xl:p-8">
            <h2 className="text-2xl font-semibold">Inclusions</h2>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {tour.inclusions.map((inclusion, index) => (
                <li key={index}>{inclusion}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Exclusions</h2>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {tour.exclusions.map((exclusion, index) => (
                <li key={index}>{exclusion}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Tour Highlights</h2>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {tour.tourHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Important Notes</h2>
            <ol className="list-decimal list-inside mt-2 text-gray-700">
              {tour.importantNotes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ol>

            <h2 className="text-2xl font-semibold mt-6">Contact Info</h2>
            <p className="text-gray-700 mt-2">{tour.contactInfo[0]}</p>
            <p className="text-gray-700 mt-2">{tour.contactInfo[1]}</p>

            {/* Agency Details */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold">Agency Details</h2>
              <div className="flex items-center mt-4">
                <img
                  src={agency.logo}
                  alt="Agency Logo"
                  className="w-16 h-16 object-cover rounded-full shadow-md"
                />
                <div className="ml-4">
                  <h3 className="text-secondary-base text-xl font-semibold">
                    {agency.agencyName}
                  </h3>
                  <p className="text-gray-700">
                    {agency.email} | {agency.mobile}
                  </p>
                  <p className="text-gray-700">
                    {agency.address}, {agency.city}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mt-5 max-w-4xl">
                {agency.description}
              </p>
              <h3 className="text-xl font-semibold mt-8">Follow Us On</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                {agency.website && (
                  <a
                    href={agency.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    Website
                  </a>
                )}
                {agency.socialMedia.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Payment Modal */}
      {openPaymentModal && (
        <section className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <PaymentFormWrapper
              bookingDetails={bookingDetails}
              closeModal={() => setOpenPaymentModal(false)}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default TourDetails;
