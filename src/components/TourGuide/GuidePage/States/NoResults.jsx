import PropTypes from "prop-types";

const NoResults = ({ searchText }) => {
  return (
    <div className="col-span-full text-center pt-10">
      <p className="text-xl text-gray-500">
        {searchText && `No guides found matching "${searchText}"`}
      </p>
      <p className="mt-2 text-gray-400">
        Try adjusting your search to find what you&apos;re looking for.
      </p>
    </div>
  );
};

NoResults.propTypes = {
  searchText: PropTypes.string,
};

export default NoResults;
