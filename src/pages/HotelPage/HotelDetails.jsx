import { Helmet } from "react-helmet-async";
import { FaBed } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import Container from "../../components/Shared/Container/Container";

const HotelDetails = () => {
  return (
    <>
      <Helmet>
        <title>Trippie - Hotel Details</title>
      </Helmet>
      <div className="py-20 md:py-24 lg:py-28 xl:py-32 text-outerSpace">
        <Container>
          {/* <!-- Hotel Image Grid Layout --> */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="col-span-3">
              <img
                src="https://via.placeholder.com/600x400"
                alt="Hotel Image 1"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <img
                src="https://via.placeholder.com/600x400"
                alt="Hotel Image 2"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <img
                src="https://via.placeholder.com/600x400"
                alt="Hotel Image 3"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <img
                src="https://via.placeholder.com/600x400"
                alt="Hotel Image 4"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <img
                src="https://via.placeholder.com/600x400"
                alt="Hotel Image 5"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* <!-- Hotel Information --> */}
          <div className="mt-10">
            <h1 className="text-secondary-base text-2xl md:text-3xl font-semibold">
              Sayeman Beach Resort
            </h1>
            <p className="mt-1 ml-1 text-gray-700">
              5 Star | Kolatoli, Cox's Bazar
            </p>
            <h2 className="mt-3 text-secondary-base text-xl font-semibold">
              Facilities
            </h2>
            <p className="mt-1 ml-1 font-medium">
              Free Wi-Fi, Pool, Spa, Gym, Restaurant, Parking
            </p>
          </div>

          {/* <!-- Content Container --> */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-7 gap-6 mt-12">
            {/* <!-- Left Side Container --> */}
            <div className="md:col-span-2 xl:col-span-5">
              {/* <!-- Room Details --> */}
              <div className="flex justify-between bg-secondary-400/30 px-5 py-2 rounded-md">
                <p className="text-xl font-medium">Room Details</p>
                <p className="text-xl font-medium">For 2 Nights</p>
              </div>

              {/* <!-- Room Cards --> */}
              <div className="grid grid-cols-1 gap-6">
                {/* <!-- Room Card 1 --> */}
                <div className="grid xl:grid-cols-2 gap-4 xl:gap-6 shadow-md border rounded-md p-3 md:p-4 lg:p-6">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="https://via.placeholder.com/600x400"
                      alt="Room Image 1"
                      className="col-span-2 w-full h-52 object-cover rounded-lg"
                    />
                    <div className="flex gap-3">
                      <img
                        src="https://via.placeholder.com/600x400"
                        alt="Room Image 2"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <img
                        src="https://via.placeholder.com/600x400"
                        alt="Room Image 3"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="">
                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                      Deluxe Double Without Balcony
                    </h2>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaBed /> Bed: Double
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <MdPeople /> Max Guests: 2
                    </p>
                    <p className="text-gray-700 mt-3">Room Facilities:</p>
                    <p className="text-gray-700 mt-0.5">
                      AC, TV, House Keeping, Toiletries
                    </p>
                    <p className="text-red-500 text-sm mt-5">
                      Hurry Up! Only 9 Rooms Left
                    </p>
                    <p className="text-gray-700 text-xs font-medium text-right mt-4">
                      Starts from
                    </p>
                    <p className="text-secondary-700 text-lg font-bold text-right mt-0.5">
                      BDT 7,574/night
                    </p>
                    <h3 className="mt-4 mb-2 text-secondary-base font-medium">
                      Book Your Room
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        101
                      </span>
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        102
                      </span>
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        103
                      </span>
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        104
                      </span>
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        105
                      </span>
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        106
                      </span>
                    </div>
                  </div>
                </div>
                {/* <!-- Add additional room cards here --> */}
                {/* Room Card 2 */}
                <div className="grid xl:grid-cols-2 gap-4 xl:gap-6 shadow-md border rounded-md p-3 md:p-4 lg:p-6">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="https://via.placeholder.com/600x400"
                      alt="Room Image 1"
                      className="col-span-2 w-full h-52 object-cover rounded-lg"
                    />
                    <div className="flex gap-3">
                      <img
                        src="https://via.placeholder.com/600x400"
                        alt="Room Image 2"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <img
                        src="https://via.placeholder.com/600x400"
                        alt="Room Image 3"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="">
                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                      Premier Deluxe Mountain View Without Balcony
                    </h2>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaBed /> Bed: Double
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <MdPeople /> Max Guests: 2
                    </p>
                    <p className="text-gray-700 mt-3">Room Facilities:</p>
                    <p className="text-gray-700 mt-0.5">
                      AC, TV, Mini Bar, House Keeping, Toiletries
                    </p>
                    <p className="text-red-500 text-sm mt-5">
                      Hurry Up! Only 4 Rooms Left
                    </p>
                    <p className="text-gray-700 text-xs font-medium text-right mt-4">
                      Starts from
                    </p>
                    <p className="text-secondary-700 text-lg font-bold text-right mt-0.5">
                      BDT 10,940/night
                    </p>
                    <h3 className="mt-4 mb-2 text-secondary-base font-medium">
                      Book Your Room
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        702
                      </span>
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        703
                      </span>
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        704
                      </span>
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        904
                      </span>
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        910
                      </span>
                      <span className="px-3.5 py-1.5 bg-gray-200 rounded">
                        916
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Right Side Container --> */}
            <div className="md:sticky md:top-20 xl:col-span-2 md:self-start">
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
                    disabled
                    className="w-full border border-gray-300 rounded-md p-2 mt-2"
                  />
                  {/* <!-- Guest Details --> */}
                  <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-4">
                      Guest Details
                    </h2>
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 mt-2"
                      required
                    />
                    <label className="block text-gray-700 mt-4">Email</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-md p-2 mt-2"
                      required
                    />
                    <label className="block text-gray-700 mt-4">Phone</label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 rounded-md p-2 mt-2"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* <!-- Price Summary --> */}
              <div className="border shadow-md rounded-lg p-4 mt-6">
                <h2 className="text-2xl font-semibold">Pricing Summary</h2>
                <div className="mt-4 space-y-1">
                  <p className="flex justify-between">
                    <span className="font-semibold">Total Price:</span>
                    <span className="text-gray-700">BDT 7574</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Booking Charge:</span>
                    <span className="text-gray-700">BDT 0</span>
                  </p>
                  <hr />
                  <p className="flex justify-between">
                    <span className="font-semibold">In Total:</span>
                    <span className="text-gray-700">BDT 7574</span>
                  </p>
                  <p className="text-gray-700 text-right">-30%</p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Will Due Amount:</span>
                    <span className="text-red-500">BDT 5302</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Booking Amount:</span>
                    <span className="text-gray-700">BDT 2272</span>
                  </p>
                  <hr />
                  <p className="flex justify-between">
                    <span className="font-semibold">Total Payable:</span>
                    <span className="text-gray-700">BDT 2272</span>
                  </p>
                </div>
                <button
                  disabled
                  className="w-full bg-secondary-base hover:bg-primary-500 transition-colors text-white py-2 px-4 rounded-md mt-4"
                >
                  Make Payment
                </button>
              </div>
            </div>
          </div>

          {/* <!-- About Us & Hotel Policy --> */}
          <div className="max-w-5xl p-4">
            <div className="my-12">
              <h2 className="text-2xl font-semibold">About Us</h2>
              <p className="text-gray-700 mt-2">
                Ocean Paradise Hotel & Resort is an excellent choice for
                travelers visiting Cox's Bazar, offering a luxury environment
                alongside many helpful amenities designed to enhance your stay.
                Ocean Paradise Hotel & Resort offers guests an array of room
                amenities including a flat screen TV, air conditioning, and a
                refrigerator, and getting online is possible, as free internet
                access is available. The resort offers a concierge, a rooftop
                terrace, and room service, to make your visit even more
                pleasant. The property also features a pool and free breakfast.
                Guests arriving by vehicle have access to free parking. While in
                Cox's Bazar be sure to experience local shrimp favorites at
                Poushee Restaurant. Enjoy your stay in Cox's Bazar!
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Hotel Policy</h2>
              <p className="text-gray-700 mt-2">Check-in: 2:00 PM</p>
              <p className="text-gray-700 mt-2">Check-out: 12:00 PM</p>
              <p className="text-gray-700 mt-2">
                Cancellation Policy: Flexible
              </p>
              <p className="text-gray-700 mt-2">
                Payment Method: Cash, Card, Bkash
              </p>
              <p className="text-gray-700 mt-2">Children: Allowed</p>
              <p className="text-gray-700 mt-2">Pets: Not Allowed</p>
              <p className="text-gray-700 mt-2">
                Smoking: Not Allowed in Rooms
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HotelDetails;
