import { Helmet } from "react-helmet-async";
import Newsletter from "../../components/Home/Newsletter/Newsletter";
import Suggestion from "../../components/Home/Suggested/Suggested";
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
      <Newsletter />
    </>
  );
};

export default HomePage;
