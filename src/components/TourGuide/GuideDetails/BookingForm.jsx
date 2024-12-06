import moment from "moment-timezone";
import PropTypes from "prop-types";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useForm } from "react-hook-form";
import "./calender.css";

const BookingForm = ({
  submitForm,
  selectedSlot,
  setSelectedSlot,
  selectedRange,
  setSelectedRange,
  subscriptionEndDate,
  disabledDates,
  isSlotDisabled,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="xl:border-l-2 xl:pl-8 xl:max-w-[440px]">
        <h2 className="text-2xl font-semibold mb-2">Book Your Tour Guide</h2>
        <p className="text-gray-700 mb-5">
          Please select your desired dates and fill in your details to book this
          guide for your customized tour.
        </p>
        <div className="md:flex md:gap-x-8 md:justify-around xl:flex-col lg:items-center xl:items-start lg:gap-x-14">
          <div>
            <DateRangePicker
              ranges={[selectedRange]}
              onChange={(ranges) => setSelectedRange(ranges.selection)}
              minDate={new Date()}
              maxDate={subscriptionEndDate}
              rangeColors={["#3b82f6"]}
              className="w-full overflow-auto mb-4"
              disabledDates={disabledDates}
            />
          </div>
          <form onSubmit={handleSubmit(submitForm)}>
            <h2 className="text-lg lg:text-xl font-semibold mb-2">
              Booking Details Form
            </h2>
            <div className="mb-2">
              <label className="block font-medium mb-0.5">Select Slot</label>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {["morning", "afternoon", "night", "full day"].map((slot) => (
                  <div key={slot} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={slot}
                      className={`w-4 h-4 text-secondary-base rounded ${
                        isSlotDisabled(
                          moment(selectedRange.startDate),
                          moment(selectedRange.endDate),
                          slot
                        )
                          ? "bg-gray-300 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      checked={selectedSlot === slot}
                      onChange={() => setSelectedSlot(slot)}
                      disabled={isSlotDisabled(
                        moment(selectedRange.startDate),
                        moment(selectedRange.endDate),
                        slot
                      )}
                    />
                    <label htmlFor={slot} className="mt-0.5">
                      {slot.charAt(0).toUpperCase() + slot.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 h-fit">
              <span>
                <label>Name</label>
                <input
                  className="mt-0.5 text-sm text-gray-800 w-full p-2 rounded-md bg-gray-100 outline-1 outline-blue-gray-500"
                  type="text"
                  placeholder="Amit Kumar"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </span>
              <span>
                <label>Party size</label>
                <input
                  className="mt-0.5 text-sm text-gray-800 w-full p-2 rounded-md bg-gray-100 outline-1 outline-blue-gray-500"
                  type="number"
                  placeholder="3"
                  {...register("partySize", {
                    required: "Party size is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Party size must be at least 1",
                    },
                  })}
                />
                {errors.partySize && (
                  <p className="text-red-500 text-sm">
                    {errors.partySize.message}
                  </p>
                )}
              </span>
              <span>
                <label>Email</label>
                <input
                  className="mt-0.5 text-sm text-gray-800 w-full p-2 rounded-md bg-gray-100 outline-1 outline-blue-gray-500"
                  type="email"
                  placeholder="amit14@gmail.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </span>
              <span>
                <label>Mobile</label>
                <input
                  className="mt-0.5 text-sm text-gray-800 w-full p-2 rounded-md bg-gray-100 outline-1 outline-blue-gray-500"
                  type="tel"
                  placeholder="01745318965"
                  {...register("mobile", {
                    required: "Mobile number is required",
                  })}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm">
                    {errors.mobile.message}
                  </p>
                )}
              </span>
              <button
                type="submit"
                className="mt-2 col-span-full w-2/5 sm:w-[30%] md:w-2/5 lg:w-[30%] mx-auto bg-secondary-base text-white py-3 rounded-lg font-medium hover:bg-secondary-700 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

BookingForm.propTypes = {
  submitForm: PropTypes.func,
  selectedSlot: PropTypes.string,
  setSelectedSlot: PropTypes.func,
  selectedRange: PropTypes.object,
  setSelectedRange: PropTypes.func,
  subscriptionEndDate: PropTypes.instanceOf(Date),
  disabledDates: PropTypes.array,
  isSlotDisabled: PropTypes.func,
};

export default BookingForm;
