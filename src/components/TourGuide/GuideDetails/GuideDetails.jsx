import PropTypes from "prop-types";
import { FaPeoplePulling, FaPhone } from "react-icons/fa6";
import { GrUserExpert } from "react-icons/gr";
import { IoLanguage, IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const GuideDetails = ({ guide }) => {
  const {
    guideName,
    profileImage,
    bio,
    email,
    mobile,
    area,
    languages,
    expertise,
    tourSizeLimitations,
    description,
    experience,
    pricing,
    paymentMethods,
  } = guide;

  return (
    <>
      <div className="flex-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <img
            className="w-40 h-40 rounded-full object-cover lg:mr-5 mb-4 lg:mb-0"
            src={profileImage}
            alt={`${guideName}'s profile`}
          />
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold mb-2">{guideName}</h2>
            <p className="text-gray-800 max-w-2xl px-3 sm:px-6 md:px-4 lg:px-0">
              {bio}
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-3 lg:ml-1">
          <p className="flex items-center gap-3">
            <MdEmail /> {email}
          </p>
          <p className="flex items-center gap-3">
            <FaPhone /> {mobile}
          </p>
          <p className="flex items-center gap-3">
            <IoLocation /> {area.join(", ")}
          </p>
          <p className="flex items-center gap-3">
            <IoLanguage /> {languages.join(", ")}
          </p>
          <p className="flex items-center gap-3">
            <GrUserExpert /> {expertise.join(", ")}
          </p>
          <p className="flex items-center gap-3">
            <FaPeoplePulling /> {tourSizeLimitations} people max
          </p>
        </div>
        <div className="mt-5 space-y-3">
          <div>
            <h2 className="text-xl font-semibold mb-1">Description</h2>
            <p className="text-gray-800 ml-1">{description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">Experience</h2>
            <p className="text-gray-800 ml-1">{experience}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">Pricing</h2>
            <p className="text-gray-800 ml-1">{pricing}</p>
            <p className="ml-1">I accept {paymentMethods.join(", ")}.</p>
          </div>
        </div>
      </div>
    </>
  );
};

GuideDetails.propTypes = {
  guide: PropTypes.object.isRequired,
};

export default GuideDetails;
