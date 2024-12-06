import PropTypes from "prop-types";
import SearchIcon from "../../SVG/SearchIcon";

const Search = ({ value, onSearch }) => {
  return (
    <div className="flex items-center px-3 py-0.5 text-gray-400 group hover:ring-1 hover:ring-gray-300 focus-within:!ring-2 ring-inset focus-within:!ring-primary-500 rounded-md">
      <SearchIcon />
      <input
        className="block w-full appearance-none text-base text-gray-700 placeholder:text-gray-500 placeholder:text-sm sm:text-sm sm:leading-6 border-none focus:ring-0"
        placeholder="Find a guide by area..."
        type="text"
        value={value}
        onChange={onSearch}
      />
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func,
};

export default Search;
