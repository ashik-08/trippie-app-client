import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllTourGuides } from "../../api/guide-api";
import useDebounce from "../../hooks/useDebounce";
import Container from "../Shared/Container/Container";
import GuideCard from "./GuideCard";
import Search from "./Search";
import EmptyState from "./States/EmptyState";
import ErrorState from "./States/ErrorState";
import NoData from "./States/NoData";
import NoResults from "./States/NoResults";

const TourGuideBoard = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 1500);

  const {
    data: allGuides = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-guides", { search: debouncedSearch }],
    queryFn: () => getAllTourGuides({ search: debouncedSearch }),
  });

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const renderGuide = () => {
    if (isLoading) {
      return (
        <>
          <EmptyState />
          <EmptyState />
          <EmptyState />
          <EmptyState />
        </>
      );
    }

    if (isError) {
      return (
        <ErrorState>Failed to load guides. Please try again later.</ErrorState>
      );
    }

    if (!isLoading && !isError && allGuides?.length === 0 && !searchText) {
      return <NoData />;
    }

    if (!isLoading && !isError && allGuides?.length === 0 && !!searchText) {
      return <NoResults searchText={debouncedSearch} />;
    }

    return allGuides?.map((guide) => (
      <GuideCard key={guide._id} guide={guide} />
    ));
  };

  return (
    <Container>
      <div className="my-20 md:my-24 lg:my-28 xl:my-32 p-2">
        <h1 className="text-center text-outerSpace text-3xl md:text-4xl font-bold uppercase">
          Find a Tour Guide
        </h1>
        <p className="max-w-3xl mx-auto px-2 text-center text-sm md:text-base text-gray-500 mt-3 font-medium italic">
          Discover top-rated tour guides who will make your trip unforgettable.
          Choose the guide that fits your needs and start your adventure today!
        </p>
        <div className="flex justify-end items-center mt-8">
          <Search value={searchText} onSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 md:mt-10">
          {renderGuide()}
        </div>
      </div>
    </Container>
  );
};

export default TourGuideBoard;
