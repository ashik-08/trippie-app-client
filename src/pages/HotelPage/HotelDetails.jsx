import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaBed } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchHotelDetails } from "../../api/hotel-api";
import LoadingSpinner from "../../components/LoadingState/LoadingSpinner";
import Container from "../../components/Shared/Container/Container";
import PaymentFormWrapper from "../../components/Shared/Payment/PaymentForm";
import useAuth from "../../hooks/useAuth";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");

  const {
    data: { hotel, availableRooms = [] } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hotelDetails", { hotelId, checkInDate, checkOutDate }],
    queryFn: fetchHotelDetails,
    enabled: !!hotelId && !!checkInDate && !!checkOutDate,
  });

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const handleRoomClick = (roomCardId, roomNumber) => {
    setSelectedRooms((prevSelectedRooms) => {
      const isSelected = prevSelectedRooms.some(
        (selectedRoom) => selectedRoom.roomNumber === roomNumber
      );

      if (isSelected) {
        return prevSelectedRooms.filter(
          (selectedRoom) => selectedRoom.roomNumber !== roomNumber
        );
      } else {
        return [...prevSelectedRooms, { roomCardId, roomNumber }];
      }
    });
  };

  const handleRoomBooking = () => {
    const guestData = getValues();
    if (!guestData.name || !guestData.email || !guestData.phone) {
      toast.error("Please provide guest details before payment");
      return;
    }
    if (!user?.email) {
      navigate("/login");
    } else {
      setOpenPaymentModal(true);
    }
  };

  const handleReset = () => {
    setSelectedRooms([]);
    reset();
  };

  const calculateNightCount = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = Math.abs(checkOut - checkIn);
    const nightCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return nightCount;
  };

  const calculateTotalPrice = () => {
    return selectedRooms.reduce((total, selectedRoom) => {
      const hotelRoom = availableRooms.find(
        (room) => room._id === selectedRoom.roomCardId
      );
      return total + hotelRoom.pricePerNight;
    }, 0);
  };

  const totalPrice =
    calculateTotalPrice() * calculateNightCount(checkInDate, checkOutDate);
  const bookingCharge = 0;
  const payNow = 0.15;
  const willDueAmount = Math.round(totalPrice * (1 - payNow));
  const bookingAmount = Math.round(totalPrice * payNow);

  const guestData = getValues();

  const bookingDetails = {
    userEmail: user?.email,
    type: "hotel",
    details: {
      hotelId,
      selectedRooms,
      checkInDate,
      checkOutDate,
      guestData,
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
            There was an error loading the hotels. Please try again later. 🙏
          </p>
        </div>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Trippie - Hotel Details</title>
      </Helmet>
      <div className="py-20 md:py-24 lg:py-28 xl:py-32 text-outerSpace">
        <Container>
          <div>
            {/* <!-- Hotel Image Grid Layout --> */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div className="col-span-3">
                <img
                  src={hotel.images[0]}
                  alt="Hotel Image 1"
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-4">
                {hotel.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Hotel Image ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>

            {/* <!-- Hotel Information --> */}
            <div className="mt-10">
              <h1 className="text-secondary-base text-2xl md:text-3xl font-semibold">
                {hotel.name}
              </h1>
              <p className="mt-1 ml-1 text-gray-700">
                {hotel.starRating} Star | {hotel.location}
              </p>
              <h2 className="mt-3 text-secondary-base text-xl font-semibold">
                Facilities
              </h2>
              <p className="mt-2 ml-1 font-medium flex flex-wrap gap-x-3 gap-y-2">
                {hotel.facilities.map((facility, index) => (
                  <span
                    className="border-l-2 pl-3 first:border-0 first:pl-0"
                    key={index}
                  >
                    {facility}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* <!-- Content Container --> */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-7 gap-6 mt-12">
            {/* <!-- Left Side Container --> */}
            <div className="md:col-span-2 xl:col-span-5">
              {/* <!-- Room Details Info --> */}
              <div className="flex justify-between bg-secondary-400/30 px-5 py-2 rounded-md">
                <p className="text-xl font-medium">Room Details</p>
                <p className="text-xl font-medium">
                  For {calculateNightCount(checkInDate, checkOutDate)} Nights
                </p>
              </div>

              {/* <!-- Room Cards --> */}
              <div className="grid grid-cols-1 gap-6">
                {availableRooms.map((room) => {
                  // Only render the room card if there are available rooms
                  if (room.availableRoomCount === 0) {
                    return null;
                  }

                  return (
                    <div
                      key={room._id}
                      className="grid xl:grid-cols-2 gap-4 xl:gap-6 shadow-md border rounded-md p-3 md:p-4 lg:p-6"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <img
                          src={room.images[0]}
                          alt="Room Image 1"
                          className="col-span-2 w-full h-52 object-cover rounded-lg"
                        />
                        <div className="flex gap-3">
                          <img
                            src={room.images[1]}
                            alt="Room Image 2"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <img
                            src={room.images[2]}
                            alt="Room Image 3"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="">
                        <h2 className="mt-6 mb-3 text-xl font-semibold">
                          {room.name}
                        </h2>
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaBed /> Bed: {room.bedType}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <MdPeople /> Max Guests: {room.maxGuests}
                        </p>
                        <p className="text-gray-700 mt-3">Room Facilities:</p>
                        <p className="text-gray-700 mt-0.5">
                          {room.facilities.join(", ")}
                        </p>
                        <p className="text-red-500 text-sm mt-5">
                          Hurry Up! Only {room.availableRoomCount} Rooms Left
                        </p>
                        <p className="text-gray-700 text-xs font-medium text-right mt-5">
                          Starts from
                        </p>
                        <p className="text-secondary-700 text-lg font-bold text-right mt-1">
                          BDT {room.pricePerNight}/night
                        </p>
                        <h3 className="mt-5 mb-2 text-secondary-base font-medium">
                          Book Your Room
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {room.roomDetails.map((roomDetail) => (
                            <span
                              key={roomDetail.roomNumber}
                              className={`px-3.5 py-1.5 rounded cursor-pointer ${
                                selectedRooms.some(
                                  (selectedRoom) =>
                                    selectedRoom.roomNumber ===
                                    roomDetail.roomNumber
                                )
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
                              }`}
                              onClick={() =>
                                handleRoomClick(room._id, roomDetail.roomNumber)
                              }
                            >
                              {roomDetail.roomNumber}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* <!-- Right Side Container --> */}
            <form
              onSubmit={handleSubmit(handleRoomBooking)}
              className="md:sticky md:top-20 xl:col-span-2 md:self-start"
            >
              {/* <!-- Booking Details --> */}
              <div className="border shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-semibold">Booking Details</h2>
                <div className="mt-4">
                  {/* <!-- Booking Summary --> */}
                  <label htmlFor="checkIn" className="block text-gray-700">
                    Check-in Date
                  </label>
                  <input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    value={selectedRooms.length && checkInDate}
                    disabled
                    className="w-full border border-gray-300 rounded-md p-2 mt-2"
                  />
                  <label
                    htmlFor="checkOut"
                    className="block text-gray-700 mt-4"
                  >
                    Check-out Date
                  </label>
                  <input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    value={selectedRooms.length && checkOutDate}
                    disabled
                    className="w-full border border-gray-300 rounded-md p-2 mt-2"
                  />
                  <label htmlFor="rooms" className="block text-gray-700 mt-4">
                    Total Rooms
                  </label>
                  <input
                    id="rooms"
                    name="rooms"
                    type="number"
                    value={selectedRooms.length}
                    disabled
                    className="w-full border border-gray-300 rounded-md p-2 mt-2"
                  />
                  {/* <!-- Guest Details --> */}
                  <div className="mt-10">
                    <h3 className="text-2xl font-semibold mb-4">
                      Guest Details
                    </h3>
                    <div>
                      <label htmlFor="name" className="block text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        {...register("name", { required: "Name is required" })}
                        disabled={selectedRooms.length === 0}
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
                        disabled={selectedRooms.length === 0}
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
                        disabled={selectedRooms.length === 0}
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
                  </div>
                </div>
              </div>

              {/* <!-- Price Summary --> */}
              {selectedRooms.length > 0 && (
                <div className="border shadow-md rounded-lg p-4 mt-6">
                  <h2 className="text-2xl font-semibold">Pricing Summary</h2>
                  <div className="mt-4 space-y-1">
                    <p className="flex justify-between">
                      <span className="font-semibold">Total Price:</span>
                      <span className="text-gray-700">BDT {totalPrice}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Booking Charge:</span>
                      <span className="text-gray-700">BDT {bookingCharge}</span>
                    </p>
                    <hr />
                    <p className="flex justify-between">
                      <span className="font-semibold">In Total:</span>
                      <span className="text-gray-700">BDT {totalPrice}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">85% Will be Due:</span>
                      <span className="text-red-500">BDT {willDueAmount}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">15% for Booking:</span>
                      <span className="text-gray-700">BDT {bookingAmount}</span>
                    </p>
                    <hr />
                    <p className="flex justify-between">
                      <span className="font-semibold">Pay Now:</span>
                      <span className="text-gray-700">BDT {bookingAmount}</span>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-secondary-base hover:bg-primary-500 transition-colors text-white py-2 px-4 rounded-md mt-6"
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
              )}
            </form>
          </div>

          {/* About Us & Hotel Policy */}
          <div key={hotel._id} className="max-w-5xl p-4">
            <div className="my-12">
              <h2 className="text-2xl font-semibold">About Us</h2>
              <p className="text-gray-700 mt-2 ml-1">{hotel.aboutUs}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Hotel Policy</h2>
              <ul className="mt-2 ml-1 list-disc list-inside space-y-1.5">
                {hotel.policy.map((policyItem, index) => (
                  <li key={index} className="text-gray-700">
                    {policyItem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>

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

export default HotelDetails;
