import SuggestTwo from "../../../assets/home/saint_martin.jpg";
import SuggestOne from "../../../assets/home/suggest-1.jpg";
import Container from "../../Shared/Container/Container";

const Suggested = () => {
  return (
    <div className="w-full bg-gradient-to-bl from-[#B1D4DB66] to-[#B1D4DB26] py-14 md:py-20">
      <Container>
        {/* Title Section */}
        <div className="p-2">
          <h1 className="text-3xl md:text-4xl font-bold text-outerSpace uppercase">
            Suggested Places to Visit
          </h1>
          <h2 className="text-sm md:text-base text-gray-600 mt-2">
            Get special travel packages tailored for your needs.
          </h2>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 mt-10 p-2">
          {/* Left Image */}
          <div className="w-full lg:w-1/3">
            <img
              src={SuggestOne}
              alt="Suggested Place 1"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* Large Image */}
            <div>
              <img
                src={SuggestTwo}
                alt="Suggested Place 2"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Text Section */}
            <div className="flex flex-col md:flex-row items-start gap-5">
              <div className="md:w-1/3">
                <h3 className="text-3xl md:text-4xl font-semibold text-outerSpace">
                  ESCAPE
                </h3>
                <h3 className="text-3xl md:text-4xl font-semibold text-outerSpace">
                  TO PARADISE
                </h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-600 text-md md:text-lg leading-relaxed">
                  Discover the tropical beauty of Saint Martin, where pristine
                  beaches meet crystal-clear waters. Indulge in luxurious
                  resorts, savor world-class cuisine and explore the vibrant
                  culture of this island paradise. This 7-day getaway is your
                  perfect escape to tranquility and adventure.
                </p>
                <button className="mt-4 bg-primary-500 text-white font-medium px-6 py-3 rounded-md shadow-md hover:bg-primary-600 transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Suggested;
