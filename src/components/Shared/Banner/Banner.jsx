import PropTypes from "prop-types";

const Banner = ({ title, boldTitle, para, hero }) => {
  return (
    <section className="relative h-[85vh]">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <div
          className={`${hero} w-full h-full bg-cover bg-center bg-no-repeat blur-[2px]`}
        ></div>
        <div className="absolute lg:inset-20 xl:inset-36 2xl:inset-40 bg-white/10"></div>
      </div>

      {/* Content Layer */}
      <div className="text-center relative h-full flex flex-col justify-center items-center max-w-4xl mx-auto px-5 md:px-8">
        <div className="text-gray-100 uppercase md:space-y-1 lg:space-y-2 xl:space-y-3 px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            {/* unforgettable travel awaits the */}
            {title}
          </h1>
          <h2 className="text-[44px] sm:text-5xl md:text-6xl font-extrabold">
            {/* adventure */}
            {boldTitle}
          </h2>
        </div>
        <p className="text-blue-gray-100 text-lg md:text-xl mt-5 px-6 sm:px-10 md:px-12">
          {/* Experience the thrill of exploring the most fascinating destinations
          with our expertly curated travel packages. */}
          {para}
        </p>
      </div>
    </section>
  );
};

Banner.propTypes = {
  title: PropTypes.string,
  boldTitle: PropTypes.string,
  para: PropTypes.string,
  hero: PropTypes.string,
};

export default Banner;
