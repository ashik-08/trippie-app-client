// import { Helmet } from "react-helmet-async";
// import SubscriptionCard from "./SubscriptionCard";

// const GuideHome = () => {
//   return (
//     <>
//       <Helmet>
//         <title>Trippie - Tour Guide</title>
//       </Helmet>
//       <h1 className="text-2xl lg:text-3xl font-medium mb-8">Dashboard</h1>
//       <SubscriptionCard
//         planName="Standard Plan"
//         price="200"
//         validityStart="2024-12-01"
//         validityEnd="2024-12-31"
//         status="active"
//         renewalReminder={true}
//       />
//     </>
//   );
// };

// export default GuideHome;

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
