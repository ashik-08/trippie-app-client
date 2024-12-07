import { Helmet } from "react-helmet-async";
import Banner from "../../components/Shared/Banner/Banner";

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>Trippie - About Us</title>
      </Helmet>
      <Banner
        hero="bg-about"
        title="Where every tour feels"
        boldTitle="extraordinary"
        para="With a focus on variety, we offer diverse brands and exceptional support to ensure your journey is seamless. Experience maximum freedom and flexibility every step of the way."
      />
    </>
  );
};

export default AboutUsPage;
