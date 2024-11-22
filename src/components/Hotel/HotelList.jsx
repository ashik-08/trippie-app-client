import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { fetchHotels } from "../../api/hotel-api";
import LoadingSpinner from "../LoadingState/LoadingSpinner";
import Container from "../Shared/Container/Container";

const HotelList = () => {
  const [searchFormData, setSearchFormData] = useState({
    location: "",
    checkInDate: "",
    checkOutDate: "",
    rooms: "1",
    minPrice: "",
    maxPrice: "",
  });

  const [queryData, setQueryData] = useState({});
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [selectedStarRating, setSelectedStarRating] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchData = (e) => {
    const { name, value } = e.target;
    setSearchFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStarRatingChange = (e) => {
    const { id } = e.target;
    const starRating = parseInt(id.split("-")[0]);

    if (selectedStarRating === starRating) {
      setSelectedStarRating(null);
      setQueryData((prevData) => {
        // eslint-disable-next-line no-unused-vars
        const { starRating, ...rest } = prevData;
        return rest;
      });
    } else {
      setSelectedStarRating(starRating);
      setQueryData((prevData) => ({
        ...prevData,
        starRating,
      }));
    }

    setIsSearchEnabled(true);
    refetch();
  };

  const handlePriceRangeSubmit = (e) => {
    e.preventDefault();
    setQueryData((prevData) => ({
      ...prevData,
      minPrice: searchFormData.minPrice,
      maxPrice: searchFormData.maxPrice,
    }));
    setIsSearchEnabled(true);
    refetch();
  };

  const {
    data: allHotels = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allHotels", queryData],
    queryFn: async () => await fetchHotels(queryData),
    enabled: Object.keys(queryData).length === 0 || isSearchEnabled,
  });

  const handleOnSearchClick = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];

    if (
      searchFormData.checkInDate < currentDate ||
      searchFormData.checkOutDate < currentDate ||
      searchFormData.checkInDate > searchFormData.checkOutDate ||
      searchFormData.checkOutDate < searchFormData.checkInDate ||
      searchFormData.checkInDate === searchFormData.checkOutDate
    ) {
      toast.error("Invalid search date!");
      return;
    }
    setQueryData((prevData) => ({
      ...prevData,
      ...searchFormData,
    }));
    setIsSearchEnabled(true);
    setHasSearched(true);
    refetch();
  };

  const handleResetFilters = () => {
    setSearchFormData({
      location: "",
      checkInDate: "",
      checkOutDate: "",
      rooms: "1",
      minPrice: "",
      maxPrice: "",
    });
    setSelectedStarRating(null);
    setQueryData({});
    setIsSearchEnabled(true);
    setHasSearched(false);
    refetch();
  };

  return (
    <div className="my-20 md:my-24 lg:my-28 xl:my-32">
      <Container>
        {/* search field */}
        <div className="max-w-5xl mx-auto px-6 py-8 border rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Find Your Perfect Stay!
          </h1>
          <form
            onSubmit={handleOnSearchClick}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
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
                value={searchFormData.location}
                onChange={handleSearchData}
                required
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
                name="checkInDate"
                className="p-3 border rounded-lg"
                value={searchFormData.checkInDate}
                onChange={handleSearchData}
                required
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
                name="checkOutDate"
                className="p-3 border rounded-lg"
                value={searchFormData.checkOutDate}
                onChange={handleSearchData}
                required
              />
            </div>
            {/* <!-- Rooms & Guests --> */}
            <div className="flex flex-col">
              <label htmlFor="rooms" className="mb-2 text-gray-700 font-medium">
                Rooms & Guests
              </label>
              <select
                id="rooms"
                name="rooms"
                className="p-3 border rounded-lg"
                value={searchFormData.rooms}
                onChange={handleSearchData}
                required
              >
                <option value="1">1 Room, 2 Guests</option>
                <option value="2">2 Rooms, 4 Guests</option>
                <option value="3">3 Rooms, 6 Guests</option>
                <option value="4">4 Rooms, 8 Guests</option>
              </select>
            </div>
            {/* <!-- Search Button --> */}
            <div className="mt-6 text-center md:col-span-2">
              <button
                type="submit"
                className="bg-secondary-base hover:bg-primary-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* filter and hotel listing */}
        <div className="mt-20">
          <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-6">
            {/* <!-- Filters Section --> */}
            <form className="md:sticky md:top-20 h-max bg-white rounded-lg p-4 shadow-md border md:col-span-1 lg:col-span-2">
              <div className="flex justify-between items-center mb-5 border-b pb-2">
                <h2 className="font-semibold text-lg">Filters</h2>
                <button
                  onClick={handleResetFilters}
                  type="button"
                  className="mt-0.5 font-medium"
                >
                  Reset
                </button>
              </div>
              {/* star rating */}
              <div className="mb-5">
                <label className="block font-medium mb-2">Star Rating</label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="3-star"
                    className="w-4 h-4"
                    checked={selectedStarRating === 3}
                    onChange={handleStarRatingChange}
                  />
                  <label htmlFor="3-star" className="mt-0.5">
                    3 Star
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="4-star"
                    className="w-4 h-4"
                    checked={selectedStarRating === 4}
                    onChange={handleStarRatingChange}
                  />
                  <label htmlFor="4-star" className="mt-0.5">
                    4 Star
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="5-star"
                    className="w-4 h-4"
                    checked={selectedStarRating === 5}
                    onChange={handleStarRatingChange}
                  />
                  <label htmlFor="5-star" className="mt-0.5">
                    5 Star
                  </label>
                </div>
              </div>
              {/* price range */}
              <div className="mb-5">
                <label className="block font-medium mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    className="w-full px-2 py-1.5 border rounded-md"
                    placeholder="Min"
                    value={searchFormData.minPrice}
                    onChange={handleSearchData}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    name="maxPrice"
                    className="w-full px-2 py-1.5 border rounded-md"
                    placeholder="Max"
                    value={searchFormData.maxPrice}
                    onChange={handleSearchData}
                  />
                  <button
                    type="button"
                    className="bg-secondary-base hover:bg-primary-500 transition-colors text-white text-lg font-semibold py-2 px-2 rounded"
                    onClick={handlePriceRangeSubmit}
                  >
                    <MdOutlineArrowForwardIos className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>

            {/* <!-- Hotel Cards Section --> */}
            <div className="md:col-span-2 lg:col-span-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* <!-- Initial Search Message --> */}
              {!hasSearched && (
                <div className="col-span-full">
                  <div className="p-10 max-w-3xl mx-auto border border-blue-400 rounded-lg bg-blue-100 text-blue-600">
                    <p className="text-lg font-semibold">
                      Please use the search form above to find hotels with
                      available rooms. Please do not try to book a room without
                      a valid search. Thank you! 🙏
                    </p>
                  </div>
                </div>
              )}

              {/* <!-- Loading Spinner --> */}
              {isLoading && (
                <div className="col-span-full">
                  <LoadingSpinner />
                </div>
              )}

              {/* <!-- Error Message --> */}
              {isError && (
                <div className="flex justify-center items-center col-span-full">
                  <div className="p-10 max-w-3xl mx-auto border border-red-400 rounded-lg bg-red-100 text-red-600">
                    <p className="text-lg font-semibold">
                      There was an error loading the hotels. Please try again
                      later. 🙏
                    </p>
                  </div>
                </div>
              )}

              {/* <!-- No Data Found --> */}
              {!isLoading && !isError && allHotels.length === 0 && (
                <div className="flex justify-center items-center col-span-full">
                  <div className="p-10 max-w-3xl mx-auto border border-yellow-500 rounded-lg bg-yellow-100 text-yellow-700">
                    <p className="text-lg font-semibold">
                      No hotels available at the moment. Please try again later.
                      🙏
                    </p>
                  </div>
                </div>
              )}

              {/* <!-- Hotel Cards Dynamic --> */}
              {!isLoading &&
                !isError &&
                allHotels.length > 0 &&
                allHotels.map((hotel) => (
                  <div
                    key={hotel.hotelId}
                    className="flex flex-col bg-secondary-200/10 border shadow-lg rounded-lg overflow-hidden hover:scale-105 transition duration-300"
                  >
                    {/* <!-- Image Section --> */}
                    <img
                      src={hotel.images[0]}
                      alt="Hotel Image"
                      className="w-full h-60 object-cover"
                    />
                    {/* <!-- Content Section --> */}
                    <div className="p-4 md:p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-1.5">
                        <h2 className="text-gray-800 text-xl font-bold">
                          {hotel.name}
                        </h2>
                        <span className="text-secondary-base font-bold">
                          {hotel.starRating} Star
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {hotel.smallLocation}, {hotel.city}
                      </p>
                      <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                        {hotel.facilities?.map((facility, index) => (
                          <span key={index}>{facility}</span>
                        ))}
                      </div>
                      <p className="text-gray-700 text-xs font-medium mt-auto">
                        Starts from
                      </p>
                      <div className="text-red-500 text-lg font-bold mb-4">
                        BDT {hotel.minRoomPrice}
                        <span className="text-gray-600 text-sm ml-3">
                          for 1 night, per room
                        </span>
                      </div>
                      <Link
                        to={{
                          pathname: `/hotel/details/${hotel.hotelId}`,
                          search: `?checkInDate=${searchFormData?.checkInDate}&checkOutDate=${searchFormData?.checkOutDate}`,
                        }}
                        className="w-full text-center bg-secondary-base hover:bg-primary-500 transition-colors text-white font-semibold py-2 px-4 rounded"
                      >
                        Select
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HotelList;
