import { Helmet } from "react-helmet-async";
import Adventure from "../../components/Home/Adventure/Adventure";
import GuideBanner from "../../components/Home/GuideBanner/GuideBanner";
import Suggestion from "../../components/Home/Suggested/Suggested";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import TourJoinAd from "../../components/Home/TourJoinAd/TourJoinAd";
import VideoPlayer from "../../components/Home/VideoPlayer/VideoPlayer";
import Banner from "../../components/Shared/Banner/Banner";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Trippie - Home</title>
      </Helmet>
      <Banner
        hero="bg-home"
        title="Unforgettable Adventures Await Your"
        boldTitle="Next Escape!"
        para="Experience the thrill of exploring breathtaking destinations with our
          expertly designed travel packages. Adventure, relaxation, and
          memories—all in one journey!"
      />
      <Suggestion />
      <VideoPlayer />
      <GuideBanner />
      <TourJoinAd />
      <Testimonials />
      <Adventure />
      {/* <Newsletter /> */}
    </>
  );
};

export default HomePage;
