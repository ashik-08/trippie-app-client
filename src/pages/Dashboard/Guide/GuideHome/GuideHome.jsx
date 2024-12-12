import { Helmet } from "react-helmet-async";
import SubscriptionCard from "./SubscriptionCard";
import TourGuideAppointments from "./TourGuideAppointments";

const GuideHome = () => {
  return (
    <>
      <Helmet>
        <title>Trippie - Guide Home</title>
      </Helmet>
      <h1 className="text-2xl lg:text-3xl font-medium mb-8">Dashboard</h1>
      <SubscriptionCard />
      <TourGuideAppointments />
    </>
  );
};

export default GuideHome;
