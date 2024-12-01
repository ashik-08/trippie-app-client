import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  const {
    _id,
    images,
    tourName,
    tourType,
    destinations,
    shortDescription,
    pricePerPerson,
    duration,
    agencyName,
  } = tour;

  return (
    <div className="relative flex flex-col h-full shadow-md rounded-lg overflow-hidden transition-all duration-500 hover:scale-105">
      <img
        src={images[0]}
        alt="Tour Image"
        className="w-full h-60 object-cover"
      />
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-gray-900 transition-colors">
            {tourName}
          </h3>
          <p className="mt-1 text-sm text-gray-600 capitalize">{tourType}</p>
          <p className="mt-1.5 text-sm text-gray-600">
            {destinations.join(", ")}
          </p>
          <p className="mt-2 text-sm text-gray-700">{shortDescription}</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-bold text-red-500">
            BDT {pricePerPerson}{" "}
            <span className="text-gray-600 text-xs">/person</span>
          </p>
          <p className="text-sm text-gray-500">get away for {duration}</p>
        </div>
      </div>
      {/* Details Button */}
      <Link to={`/join-tour/${_id}`} className="px-5 pb-3">
        <button className="w-full py-2 rounded-md text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 transition-all duration-300">
          See Details
        </button>
      </Link>
      <div className="bg-gray-100 text-center py-1.5">
        <p className="text-sm text-gray-600">
          Organizer @{" "}
          <span className="text-secondary-base font-semibold">
            {agencyName}
          </span>
        </p>
      </div>
    </div>
  );
};

TourCard.propTypes = {
  tour: PropTypes.object,
};

export default TourCard;
