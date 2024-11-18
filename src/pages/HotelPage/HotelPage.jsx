import { Helmet } from "react-helmet-async";
import Banner from "../../components/Shared/Banner/Banner";

const HotelPage = () => {
  return (
    <>
      <Helmet>
        <title>Trippie - Hotel</title>
      </Helmet>
      <Banner
        hero="bg-hotel"
        title="Step Into a World of Comfort and"
        boldTitle="Luxury!"
        para="Discover unparalleled comfort and world-class hospitality at our carefully selected hotels. Your perfect getaway starts here—book your stay today!"
      />
    </>
  );
};

export default HotelPage;
