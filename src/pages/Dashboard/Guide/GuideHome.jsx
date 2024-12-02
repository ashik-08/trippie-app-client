import { Helmet } from "react-helmet-async";
import SubscriptionCard from "./SubscriptionCard";

const GuideHome = () => {
  return (
    <>
      <Helmet>
        <title>Trippie - Tour Guide</title>
      </Helmet>
      <h1 className="text-2xl lg:text-3xl font-medium mb-8">Dashboard</h1>
      <SubscriptionCard />
    </>
  );
};

export default GuideHome;
