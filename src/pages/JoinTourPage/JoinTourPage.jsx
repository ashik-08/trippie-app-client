import { Helmet } from "react-helmet-async";
import JoinTourBoard from "../../components/JoinTour/JoinTourBoard";
import Banner from "../../components/Shared/Banner/Banner";

const JoinTourPage = () => {
  return (
    <>
      <Helmet>
        <title>Trippie - Join Tour</title>
      </Helmet>
      <Banner
        hero="bg-tour"
        title="Find the best relaxing Tour for you"
        boldTitle="With Us!"
        para="Choose from a variety of relaxing tours designed to help you unwind. Find the perfect trip and book your escape today!"
      />
      <JoinTourBoard />
    </>
  );
};

export default JoinTourPage;
