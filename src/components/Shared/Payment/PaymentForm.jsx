import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Container from "../Container/Container";

const PaymentForm = ({ bookingCharge, bookingAmount, closeModal }) => {
  const [endDate, setEndDate] = useState(new Date());

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
              <form className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8">
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="full_name"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Full name (as displayed on card)*
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Bonnie Green"
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
                    <input
                      type="text"
                      id="card-number-input"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      placeholder="4444-4444-4545-4646"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="card-expiration-input"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Card expiration*
                    </label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="MM/yy"
                      showMonthYearPicker
                      id="card-expiration-input"
                      type="text"
                      placeholderText="MM/YY"
                      required
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvv-input"
                      className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900"
                    >
                      CVV*
                    </label>
                    <input
                      type="number"
                      id="cvv-input"
                      aria-describedby="helper-text-explanation"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      placeholder="••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 transition-colors"
                >
                  Pay now
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
                        BDT {bookingAmount}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Booking Charge
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        BDT {bookingCharge}
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
                      BDT {bookingAmount + bookingCharge}
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
  bookingAmount: PropTypes.number,
  bookingCharge: PropTypes.number,
  closeModal: PropTypes.func,
};

export default PaymentForm;
