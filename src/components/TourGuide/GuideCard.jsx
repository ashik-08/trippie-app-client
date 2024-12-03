import PropTypes from "prop-types";
import { useState } from "react";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { GrUserExpert } from "react-icons/gr";
import { IoLanguage } from "react-icons/io5";
import { Link } from "react-router-dom";

const GuideCard = ({ guide }) => {
  const [showFullBio, setShowFullBio] = useState(false);
  const { _id, profileImage, guideName, area, languages, expertise, bio } =
    guide;

  const toggleBio = () => {
    setShowFullBio(!showFullBio);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      <figure className="relative">
        <img
          className="w-full h-52 object-cover"
          src={profileImage}
          alt={`${guideName}'s profile`}
        />
        <figcaption className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-4 w-full">
          <h2 className="text-xl font-bold">{guideName}</h2>
          <p className="text-sm">{area.join(", ")}</p>
        </figcaption>
      </figure>
      <div className="text-gray-800 p-4 space-y-3">
        <p className="inline-flex items-center gap-2">
          <IoLanguage />
          {languages.join(", ")}
        </p>
        <p className="inline-flex items-center gap-2">
          <GrUserExpert />
          {expertise.join(", ")}
        </p>
        <p className="flex items-baseline gap-2">
          <FaPersonCircleCheck className="flex-shrink-0" />
          <span>
            {showFullBio ? bio : `${bio.substring(0, 70)}...`}
            <button
              onClick={toggleBio}
              className="text-secondary-base text-sm ml-1"
            >
              {showFullBio ? "See less" : "See more"}
            </button>
          </span>
        </p>
        <div className="flex justify-center pt-4 pb-2">
          <Link
            to={`/tour-guide/${_id}`}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary-base transition duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

GuideCard.propTypes = {
  guide: PropTypes.object,
};

export default GuideCard;
