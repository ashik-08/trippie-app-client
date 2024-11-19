import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import Container from "../../Shared/Container/Container";

const HotelList = () => {
  return (
    <div className="my-20 md:my-24 lg:my-28 xl:my-32">
      <Container>
        {/* search field */}
        <div className="max-w-5xl mx-auto px-6 py-8 border rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Find Your Perfect Stay!
          </h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* <!-- City Input --> */}
            <div className="flex flex-col">
              <label
                htmlFor="location"
                className="mb-2 text-gray-700 font-medium"
              >
                City
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="p-3 border rounded-lg"
                placeholder="Cox's Bazar, Bangladesh"
              />
            </div>
            {/* <!-- Check-in Date --> */}
            <div className="flex flex-col">
              <label
                htmlFor="check-in"
                className="mb-2 text-gray-700 font-medium"
              >
                Check-in Date
              </label>
              <input
                type="date"
                id="check-in"
                name="check-in"
                className="p-3 border rounded-lg"
              />
            </div>
            {/* <!-- Check-out Date --> */}
            <div className="flex flex-col">
              <label
                htmlFor="check-out"
                className="mb-2 text-gray-700 font-medium"
              >
                Check-out Date
              </label>
              <input
                type="date"
                id="check-out"
                name="check-out"
                className="p-3 border rounded-lg"
              />
            </div>
            {/* <!-- Rooms & Guests --> */}
            <div className="flex flex-col">
              <label htmlFor="rooms" className="mb-2 text-gray-700 font-medium">
                Rooms & Guests
              </label>
              <select id="rooms" name="rooms" className="p-3 border rounded-lg">
                <option value="1">1 Room, 2 Guests</option>
                <option value="2">2 Rooms, 4 Guests</option>
                <option value="3">3 Rooms, 6 Guests</option>
                <option value="4">4 Rooms, 8 Guests</option>
              </select>
            </div>
          </form>
          {/* <!-- Search Button --> */}
          <div className="mt-6 text-center">
            <button className="bg-secondary-base hover:bg-primary-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* filter and hotel listing */}
        <div className="mt-20">
          <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-6">
            {/* <!-- Filters Section --> */}
            <form className="md:sticky md:top-20 h-max bg-white rounded-lg p-4 shadow-md border md:col-span-1 lg:col-span-2">
              <div className="flex justify-between items-center mb-5 border-b pb-2">
                <h2 className="font-semibold text-lg">Filters</h2>
                <button type="reset" className="mt-0.5 font-medium">
                  Reset
                </button>
              </div>

              <div className="mb-5">
                <label className="block font-medium mb-2">Star Rating</label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="3-star" className="w-4 h-4" />
                  <label htmlFor="3-star" className="mt-0.5">
                    3 Star
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="4-star" className="w-4 h-4" />
                  <label htmlFor="4-star" className="mt-0.5">
                    4 Star
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="5-star" className="w-4 h-4" />
                  <label htmlFor="5-star" className="mt-0.5">
                    5 Star
                  </label>
                </div>
              </div>
              <div className="mb-5">
                <label className="block font-medium mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="min-price"
                    className="w-full px-2 py-1.5 border rounded-md"
                    placeholder="Min"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    id="max-price"
                    className="w-full px-2 py-1.5 border rounded-md"
                    placeholder="Max"
                  />
                  <button
                    type="submit"
                    className="bg-secondary-base hover:bg-primary-500 transition-colors text-white text-lg font-semibold py-2 px-2 rounded"
                  >
                    <MdOutlineArrowForwardIos className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>

            {/* <!-- Hotel Cards Section --> */}
            <div className="md:col-span-2 lg:col-span-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* <!-- Hotel Card 1 --> */}
              <div className="flex flex-col bg-secondary-200/10 border shadow-lg rounded-lg overflow-hidden hover:scale-105 transition duration-300">
                {/* <!-- Image Section --> */}
                <img
                  src="https://via.placeholder.com/600x400"
                  alt="Hotel Image"
                  className="w-full h-60 object-cover"
                />
                {/* <!-- Content Section --> */}
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-1.5">
                    <h2 className="text-gray-800 text-xl font-bold">
                      Sayeman Beach Resort
                    </h2>
                    <span className="text-secondary-base font-bold">
                      5 Star
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Kolatoli, Cox's Bazar
                  </p>
                  <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                    <span>🌴 Garden</span>
                    <span>♿ Accessibility</span>
                    <span>❄️ Air Conditioning</span>
                    <span>❄️ Air Conditioning</span>
                    <span>🌴 Garden</span>
                    <span>♿ Accessibility</span>
                  </div>
                  <p className="text-gray-700 text-xs font-medium mt-auto">
                    Starts from
                  </p>
                  <div className="text-red-500 text-lg font-bold mb-4">
                    BDT 7,574
                    <span className="text-gray-600 text-sm ml-3">
                      for 1 night, per room
                    </span>
                  </div>
                  <Link
                    to="/hotels/details"
                    className="w-full text-center bg-secondary-base hover:bg-primary-500 transition-colors text-white font-semibold py-2 px-4 rounded"
                  >
                    Select
                  </Link>
                </div>
              </div>
              {/* <!-- Hotel Card 2 --> */}
              <div className="flex flex-col bg-secondary-200/10 border shadow-lg rounded-lg overflow-hidden hover:scale-105 transition duration-300">
                {/* <!-- Image Section --> */}
                <img
                  src="https://via.placeholder.com/600x400"
                  alt="Hotel Image"
                  className="w-full h-60 object-cover"
                />
                {/* <!-- Content Section --> */}
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-1.5">
                    <h2 className="text-gray-800 text-xl font-bold">
                      DERA Resort & Spa
                    </h2>
                    <span className="text-secondary-base font-bold">
                      4 Star
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Ukhia, Cox's Bazar
                  </p>
                  <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                    <span>♿ Accessibility</span>
                    <span>❄️ Air Conditioning</span>
                    <span>❄️ Spa</span>
                    <span>❄️ Swimming Pool</span>
                  </div>
                  <p className="text-gray-700 text-xs font-medium mt-auto">
                    Starts from
                  </p>
                  <div className="text-red-500 text-lg font-bold mb-4">
                    BDT 5,464
                    <span className="text-gray-600 text-sm ml-3">
                      for 1 night, per room
                    </span>
                  </div>
                  <Link
                    to="/hotels/details"
                    className="w-full text-center bg-secondary-base hover:bg-primary-500 transition-colors text-white font-semibold py-2 px-4 rounded"
                  >
                    Select
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HotelList;
