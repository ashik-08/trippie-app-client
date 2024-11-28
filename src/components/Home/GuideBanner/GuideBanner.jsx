import Img from "../../../assets/home/guide.jpg";
import Container from "../../Shared/Container/Container";

const GuideBanner = () => {
  return (
    <div className="bg-primary-base/10 py-20 text-center">
      <Container>
        <div className="p-2">
          <h1 className="text-3xl md:text-4xl font-bold uppercase">
            Unlock Exclusive Experiences with Our Tour Guides
          </h1>
          <p className="text-sm lg:text-base mt-2">
            Discover Hidden Gems with Personalized Tours
          </p>
          <img
            src={Img}
            alt="guide"
            className="my-8 xl:w-3/4 mx-auto rounded-lg"
          />
          <p className="text-sm text-gray-600 max-w-3xl mx-auto px-4">
            Uncover secret spots and local favorites with Trippie&apos;s
            exclusive network of knowledgeable tour guides. From
            off-the-beaten-path adventures to insider access, our guides
            specialize in creating custom experiences tailored to your
            interests. Step into a world of discovery unlike any other, only
            with Trippie.
          </p>
          <button className="bg-primary-base hover:bg-primary-500 font-medium text-white mt-7 px-4 py-2.5 rounded-lg transition-colors">
            Find Now
          </button>
        </div>
      </Container>
    </div>
  );
};

export default GuideBanner;
