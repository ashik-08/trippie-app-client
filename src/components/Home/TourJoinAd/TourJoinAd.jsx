import backImg from "../../../assets/home/custom-tour-bg.jpg";
import Container from "../../Shared/Container/Container";

const TourJoinAd = () => {
  return (
    <Container>
      <div className="flex justify-center items-center min-h-screen p-2">
        <div
          className="w-full bg-cover bg-center rounded-lg shadow-lg relative overflow-hidden"
          style={{ backgroundImage: `url(${backImg})`, height: "700px" }}
        >
          <div className="flex h-full">
            {/* Left Side */}
            <div className="w-1/2 pt-10 pl-8 text-outerSpace uppercase">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Create Your
              </h1>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Perfect Adventure
              </h1>
            </div>
            {/* Right Side */}
            <div className="w-full lg:w-1/2 flex flex-col text-white relative">
              <p className="absolute bottom-20 right-6 text-sm md:text-base 2xl:text-xl">
                Make your own vacation with family, friends. Join exciting
                journeys created by tour agents. Discover new destinations and
                make unforgettable memories together.
              </p>
              <div className="absolute bottom-8 lg:bottom-6 left-0 flex gap-4">
                <button className="px-3 py-1.5 lg:px-5 lg:py-2.5 bg-white/30 hover:bg-white/50 rounded-lg transition-colors">
                  Join Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TourJoinAd;
