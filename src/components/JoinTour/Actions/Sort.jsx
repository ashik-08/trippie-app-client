import PropTypes from "prop-types";
import ArrowIcon from "../../SVG/ArrowIcon";

const Sort = ({ showSortModal, toggleSortModal, handleSort, currentSort }) => {
  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-600 hover:text-gray-700 focus:text-gray-800 transition-all"
        onClick={toggleSortModal}
      >
        Sort
        <ArrowIcon />
      </button>

      {showSortModal && (
        <div className="absolute z-10 mt-2 left-3 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <span
              className={`cursor-pointer block px-4 py-2 text-sm text-gray-700 transition-all ${
                currentSort === "asc" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => handleSort("asc")}
            >
              Low to High {currentSort === "asc" && "✓"}
            </span>
            <span
              className={`cursor-pointer block px-4 py-2 text-sm text-gray-700 transition-all ${
                currentSort === "desc" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => handleSort("desc")}
            >
              High to Low {currentSort === "desc" && "✓"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

Sort.propTypes = {
  showSortModal: PropTypes.bool,
  toggleSortModal: PropTypes.func,
  handleSort: PropTypes.func,
  currentSort: PropTypes.string,
};

export default Sort;
