import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllTours } from "../../api/tour-api";
import useDebounce from "../../hooks/useDebounce";
import Container from "../Shared/Container/Container";
import Filter from "./Actions/Filter";
import Search from "./Actions/Search";
import Sort from "./Actions/Sort";
import EmptyState from "./States/EmptyState";
import ErrorState from "./States/ErrorState";
import NoData from "./States/NoData";
import NoResults from "./States/NoResults";
import TourCard from "./TourCard";

const JoinTourBoard = () => {
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const debouncedSearch = useDebounce(searchText, 1500);

  const toggleSortModal = () => {
    setShowSortModal(!showSortModal);
    setShowFilterModal(false);
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
    setShowSortModal(false);
  };

  const {
    data: allTours = [],
    isLoading,
    isError,
    // refetch,
  } = useQuery({
    queryKey: [
      "all-tours",
      { search: debouncedSearch, sortOrder, selectedType },
    ],
    queryFn: () =>
      getAllTours({ search: debouncedSearch, sortOrder, selectedType }),
  });

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order === sortOrder ? "" : order);
    setShowSortModal(false);
  };

  const handleFilter = (type) => {
    setSelectedType(type === selectedType ? "" : type);
    setShowFilterModal(false);
  };

  const isInitialLoad = !searchText && !sortOrder && !selectedType;

  const renderTour = () => {
    if (isLoading) {
      return (
        <>
          <EmptyState />
          <EmptyState />
          <EmptyState />
        </>
      );
    }

    if (isError) {
      return (
        <ErrorState>Failed to load tours. Please try again later.</ErrorState>
      );
    }

    if (!isLoading && !isError && allTours?.length === 0 && isInitialLoad) {
      return <NoData />;
    }

    if (!isLoading && !isError && allTours?.length === 0 && !isInitialLoad) {
      return <NoResults searchText={debouncedSearch} />;
    }

    return allTours?.map((tour) => <TourCard key={tour._id} tour={tour} />);
  };

  return (
    <Container>
      <div className="my-20 md:my-24 lg:my-28 xl:my-32 p-2">
        <h1 className="text-center text-outerSpace text-3xl md:text-4xl font-bold uppercase">
          Join a Tour
        </h1>
        <p className="max-w-3xl mx-auto px-2 text-center text-sm md:text-base text-gray-500 mt-3 font-medium italic">
          Explore the best tours curated by our expert tour agencies. Find your
          next adventure and join a tour today!
        </p>
        <div className="flex justify-between items-center mt-8">
          <div className="flex">
            <Sort
              showSortModal={showSortModal}
              toggleSortModal={toggleSortModal}
              handleSort={handleSort}
              currentSort={sortOrder}
            />
            <Filter
              showFilterModal={showFilterModal}
              toggleFilterModal={toggleFilterModal}
              handleFilter={handleFilter}
              selectedType={selectedType}
            />
          </div>
          <Search value={searchText} onSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 md:mt-10">
          {renderTour()}
        </div>
      </div>
    </Container>
  );
};

export default JoinTourBoard;
