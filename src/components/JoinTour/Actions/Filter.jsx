import PropTypes from "prop-types";
import { tourTypes } from "../../../data/tourTypes";
import ArrowIcon from "../../SVG/ArrowIcon";

const Filter = ({
  showFilterModal,
  toggleFilterModal,
  handleFilter,
  selectedType,
}) => {
  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-600 hover:text-gray-700 focus:text-gray-800 transition-all"
        onClick={toggleFilterModal}
      >
        Filter
        <ArrowIcon />
      </button>

      {showFilterModal && (
        <div className="absolute z-10 mt-2 left-3 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {tourTypes.map((type) => (
              <label
                key={type}
                className="inline-flex w-full cursor-pointer hover:bg-gray-50 items-center px-4 py-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary-500"
                  onChange={() => handleFilter(type)}
                  checked={selectedType === type}
                />
                <span className="ml-2">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Filter.propTypes = {
  showFilterModal: PropTypes.bool,
  toggleFilterModal: PropTypes.func,
  handleFilter: PropTypes.func,
  selectedType: PropTypes.string,
};

export default Filter;
