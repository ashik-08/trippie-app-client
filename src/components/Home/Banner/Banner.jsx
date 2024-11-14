const Banner = () => {
  return (
    <section className="relative h-[85vh]">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <div className="bg-hero w-full h-full bg-cover bg-center bg-no-repeat blur-[2px]"></div>
        <div className="absolute lg:inset-20 xl:inset-36 2xl:inset-40 bg-white/10"></div>
      </div>

      {/* Content Layer */}
      <div className="text-center relative h-full flex flex-col justify-center items-center max-w-4xl mx-auto px-5 md:px-8">
        <div className="text-outerSpace uppercase md:space-y-1 lg:space-y-2 xl:space-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            unforgettable travel awaits the
          </h1>
          <h2 className="text-[44px] sm:text-5xl md:text-6xl font-extrabold">
            adventure
          </h2>
        </div>
        <p className="text-white text-lg md:text-xl mt-5">
          Experience the thrill of exploring the most fascinating destinations
          with our expertly curated travel packages.
        </p>
      </div>
    </section>
  );
};

export default Banner;
