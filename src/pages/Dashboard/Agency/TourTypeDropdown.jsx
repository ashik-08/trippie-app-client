import PropTypes from "prop-types";
import { tourTypes } from "../../../data/tourTypes";

const TourTypeDropdown = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-outerSpace md:text-lg font-medium">
        Tour Type
      </label>
      <select
        className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
        name="tourType"
        value={value}
        onChange={onChange}
        required
      >
        <option value="">Select tour type</option>
        {tourTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

TourTypeDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default TourTypeDropdown;
