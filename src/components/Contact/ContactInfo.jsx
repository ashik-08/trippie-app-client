import LocationIcon from "../SVG/LocationIcon";
import MailIcon from "../SVG/MailIcon";

const ContactInfo = () => {
  return (
    <div className="mb-12 flex flex-wrap justify-between lg:mb-0">
      <div className="mb-8 flex w-[330px] max-w-full">
        <div className="mr-6 text-[32px] text-secondary-500">
          <LocationIcon />
        </div>
        <div>
          <h5 className="mb-[18px] text-lg font-semibold text-dark">
            Our Location
          </h5>
          <p className="text-neutralBlack/70">
            House - 4/1, Road - 8/24, Banani, Block A, Mohakhali, Dhaka
          </p>
        </div>
      </div>
      <div className="mb-8 flex w-[330px] max-w-full">
        <div className="mr-6 text-[32px] text-secondary-500">
          <MailIcon />
        </div>
        <div>
          <h5 className="mb-[18px] text-lg font-semibold text-dark">
            How Can We Help?
          </h5>
          <p className="text-neutralBlack/70">
            trippie.info7@gmail.com
          </p>
          <p className="mt-1 text-neutralBlack/70">
            admin@trippie.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
