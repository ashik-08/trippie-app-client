import { Helmet } from "react-helmet-async";
import Banner from "../../components/Home/Banner/Banner";
import Newsletter from "../../components/Home/Newsletter/Newsletter";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Trippie - Home</title>
      </Helmet>
      <Banner />
      <Newsletter />
    </>
  );
};

export default HomePage;
