import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { useState } from "react";
import { getSubscriptionStatus } from "../../../api/subscription-api";
import PaymentFormWrapper from "../../../components/Shared/Payment/PaymentForm";
import useAuth from "../../../hooks/useAuth";

const SubscriptionCard = () => {
  const { user } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const { data: subscription = {}, isLoading } = useQuery({
    queryKey: ["subscriptionStatus", user?.email],
    queryFn: async () => await getSubscriptionStatus(user?.email),
    enabled: !!user?.email,
  });

  const handleSubscribe = (type) => {
    setPaymentDetails({
      userEmail: user?.email,
      type,
      details: {
        bookingAmount: 200,
      },
    });
    setShowPaymentModal(true);
  };

  if (isLoading) {
    return <span className="loading loading-bars loading-md"></span>;
  }

  const isActive = subscription?.status === "active";
  const validityStart = subscription?.validityStart
    ? moment(subscription.validityStart).tz("Asia/Dhaka").format("MMM DD, YYYY")
    : null;
  const validityEnd = subscription?.validityEnd
    ? moment(subscription.validityEnd).tz("Asia/Dhaka").format("MMM DD, YYYY")
    : null;
  const remainingDays = subscription?.validityEnd
    ? moment(subscription.validityEnd)
        .tz("Asia/Dhaka")
        .diff(moment().tz("Asia/Dhaka"), "days")
    : null;

  return (
    <div className="max-w-md rounded-xl overflow-hidden shadow-lg bg-white p-4 sm:p-6 lg:p-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-outerSpace">
          Trippie Subscription
        </h2>
        <p className="text-lg text-gray-700 mt-1.5">Standard Plan</p>
      </div>
      <div className="flex justify-center my-5">
        <span className="text-5xl font-semibold text-secondary-base">
          200Tk
        </span>
        <span className="text-lg text-gray-700 font-medium">/month</span>
      </div>
      <div className="text-center">
        <span
          className={`inline-block px-8 py-1.5 rounded-full ${
            isActive ? "bg-primary-500" : "bg-red-500"
          } text-white`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
      {isActive && (
        <>
          <div className="mt-4 text-center">
            <p className="text-lg font-medium text-gray-700">
              <span className="text-sm">Valid from</span> {validityStart}{" "}
              <span className="text-sm">until</span> {validityEnd}
            </p>
            <p className="text-lg font-medium text-gray-700 italic">
              {remainingDays} days remaining
            </p>
          </div>
          {remainingDays && remainingDays <= 5 && (
            <div className="mt-4 text-center">
              <button
                className="bg-yellow-300 text-yellow-900 border border-yellow-300 py-2 px-8 rounded-full hover:bg-yellow-400 transition-colors"
                onClick={() => handleSubscribe("renew")}
              >
                Renew Now
              </button>
            </div>
          )}
        </>
      )}
      {!isActive && (
        <div className="mt-4 text-center">
          <button
            className="bg-secondary-base text-white border border-secondary-base py-2 px-8 rounded-full hover:bg-secondary-700 transition-colors"
            onClick={() => handleSubscribe("subscribe")}
          >
            Subscribe Now
          </button>
        </div>
      )}
      {showPaymentModal && (
        <section className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <PaymentFormWrapper
              bookingDetails={paymentDetails}
              closeModal={() => setShowPaymentModal(false)}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default SubscriptionCard;
