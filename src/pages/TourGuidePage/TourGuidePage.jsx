import { Helmet } from "react-helmet-async";
import Banner from "../../components/Shared/Banner/Banner";
import TourGuideBoard from "../../components/TourGuide/TourGuideBoard";

const TourGuidePage = () => {
  return (
    <>
      <Helmet>
        <title>Trippie - Tour Guide</title>
      </Helmet>
      <Banner
        hero="bg-guide"
        title="Connect with the Perfect Tour Guide"
        boldTitle="Today!"
        para="Explore top-rated tour guides who can make your journey special. Find the guide that suits your interests and book your next adventure easily!"
      />
      <TourGuideBoard />
    </>
  );
};

export default TourGuidePage;
