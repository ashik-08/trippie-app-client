import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosSecure } from "../../../hooks/axiosSecure";
import Container from "../Container/Container";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ bookingDetails, closeModal }) => {
  const { userEmail, type, details } = bookingDetails;
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Processing payment...");

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const {
        data: { clientSecret },
      } = await axiosSecure.post("/payment/create-payment-intent", {
        amount: parseInt(details.bookingAmount * 100),
        currency: "bdt",
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: e.target.fullName.value,
            email: userEmail,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message, { id: toastId });
        setIsProcessing(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          await axiosSecure.post("/payment/confirm-booking", {
            userEmail,
            type,
            details,
            paymentId: result?.paymentIntent?.id,
            amount: details.bookingAmount,
            currency: "bdt",
            status: result?.paymentIntent?.status,
          });

          toast.success("Payment successful and confirmed booking!", {
            id: toastId,
          });
          closeModal();
          setIsProcessing(false);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Payment failed! Please try again later.", { id: toastId });
      console.log(error);
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <Container>
      <section className="bg-white max-w-6xl mx-auto py-8 md:py-16 rounded-xl relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 text-3xl hover:text-gray-700"
        >
          &times;
        </button>
        <div className="mx-auto px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Your Payment Details
            </h2>

            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <form
                onSubmit={handleSubmit}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8"
              >
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Full name (as displayed on card)*
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Ashikur Rahman"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="card-number-input"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Card number*
                    </label>
                    <CardNumberElement
                      id="card-number-input"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      options={cardElementOptions}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="card-expiration-input"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Card expiry*
                    </label>
                    <CardExpiryElement
                      id="card-expiration-input"
                      type="text"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      options={cardElementOptions}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvc-input"
                      className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900"
                    >
                      CVC*
                    </label>
                    <CardCvcElement
                      type="number"
                      id="cvc-input"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      placeholder="••••"
                      required
                      options={cardElementOptions}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 transition-colors"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Pay now"}
                </button>
              </form>

              <div className="mt-6 grow sm:mt-8 lg:mt-0">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Booking Price
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        BDT {details.bookingAmount}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Booking Charge
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        BDT 0
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Extra Charge
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        BDT 0
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        BDT 0
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      BDT {details.bookingAmount}
                    </dd>
                  </dl>
                </div>

                <div className="mt-6 flex items-center justify-center gap-8">
                  <img
                    className="h-8 w-auto"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                    alt=""
                  />
                  <img
                    className="h-8 w-auto"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                    alt=""
                  />
                  <img
                    className="h-8 w-auto"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

PaymentForm.propTypes = {
  bookingDetails: PropTypes.shape({
    userEmail: PropTypes.string,
    type: PropTypes.string,
    details: PropTypes.object,
    bookingAmount: PropTypes.number,
  }),
  closeModal: PropTypes.func,
};

const PaymentFormWrapper = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default PaymentFormWrapper;
