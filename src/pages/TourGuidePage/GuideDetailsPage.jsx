import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { createAppointment } from "../../api/appointment-api";
import { getGuideAndServices } from "../../api/guide-api";
import LoadingSpinner from "../../components/LoadingState/LoadingSpinner";
import Container from "../../components/Shared/Container/Container";
import BookingForm from "../../components/TourGuide/GuideDetails/BookingForm";
import GuideDetails from "../../components/TourGuide/GuideDetails/GuideDetails";
import useAuth from "../../hooks/useAuth";

const GuideDetailsPage = () => {
  const { guideId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [bookedDates, setBookedDates] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const {
    data: { guide } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["guideDetails", guideId],
    queryFn: async () => await getGuideAndServices(guideId),
    enabled: !!guideId,
  });

  useEffect(() => {
    if (guide && guide?.subscriptionStatus === "active") {
      setSubscriptionEndDate(moment(guide?.subscriptionEndDate).toDate());
      const acceptedAppointments = guide?.appointments.filter(
        (appointment) => appointment.status === "accepted"
      );
      setBookedDates(acceptedAppointments || []);
      setDisabledDates(calculateDisabledDates(acceptedAppointments || []));
    }
  }, [guide]);

  // Calculate the disabled dates based on the full day appointments
  const calculateDisabledDates = (appointments) => {
    const disabledDates = [];
    appointments.forEach((appointment) => {
      if (
        appointment.slot === "full day" &&
        appointment.status === "accepted"
      ) {
        let currentDate = moment(appointment.startDate);
        const endDate = moment(appointment.endDate);
        while (currentDate <= endDate) {
          disabledDates.push(currentDate.toDate());
          currentDate = currentDate.add(1, "days");
        }
      }
    });
    return disabledDates;
  };

  // Check if the selected slot is disabled for the selected date range
  const isSlotDisabled = (startDate, endDate, slot) => {
    return bookedDates.some((appointment) => {
      const start = moment(appointment.startDate);
      const end = moment(appointment.endDate);
      const isDateRangeOverlap =
        startDate.isBetween(start, end, null, "[]") ||
        endDate.isBetween(start, end, null, "[]") ||
        start.isBetween(startDate, endDate, null, "[]") ||
        end.isBetween(startDate, endDate, null, "[]");

      if (slot === "full day") {
        return (
          isDateRangeOverlap &&
          (appointment.slot === "morning" ||
            appointment.slot === "afternoon" ||
            appointment.slot === "night" ||
            appointment.slot === "full day")
        );
      } else {
        return (
          isDateRangeOverlap &&
          (appointment.slot === slot || appointment.slot === "full day")
        );
      }
    });
  };

  const onSubmit = async (formData) => {
    if (!user?.email) {
      toast.error("Please login to book an appointment.");
      return;
    }

    if (!selectedRange.startDate || !selectedRange.endDate || !selectedSlot) {
      toast.error("Please select a valid date range and time slot.");
      return;
    }

    // Check if the selected date range is disabled
    const isDateRangeDisabled = disabledDates.some((disabledDate) => {
      return moment(disabledDate).isBetween(
        moment(selectedRange.startDate),
        moment(selectedRange.endDate),
        null,
        "[]"
      );
    });

    if (isDateRangeDisabled) {
      toast.error(
        "The selected date range is unavailable. Please choose a different range."
      );
      return;
    }

    // Check if the selected slot is disabled
    const isSelectedSlotDisabled = isSlotDisabled(
      moment(selectedRange.startDate),
      moment(selectedRange.endDate),
      selectedSlot
    );

    if (isSelectedSlotDisabled) {
      toast.error(
        "The selected time slot is unavailable. Please choose a different slot."
      );
      return;
    }

    const toastId = toast.loading("Booking in progress...");

    const duration =
      moment(selectedRange.endDate).diff(
        moment(selectedRange.startDate),
        "days"
      ) + 1;

    const appointmentData = {
      guideId: guideId,
      guideName: guide?.guideName,
      guideEmail: guide?.email,
      guideMobile: guide?.mobile,
      bookedBy: user?.email,
      startDate: selectedRange.startDate,
      endDate: selectedRange.endDate,
      slot: selectedSlot,
      duration: duration + " days",
      guestDetails: {
        ...formData,
      },
    };

    try {
      await createAppointment(appointmentData);
      toast.success(
        "Booking successful. Wait for confirmation email from Tour Guide!",
        { id: toastId }
      );
      navigate("/tour-guide");
    } catch (error) {
      console.error("Failed to create appointment", error);
      toast.error("Failed to create appointment. Please try again later.", {
        id: toastId,
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError)
    return (
      <div className="pt-[12%] flex justify-center items-center">
        <div className="p-10 max-w-3xl mx-auto border border-red-400 rounded-lg bg-red-100 text-red-600">
          <p className="text-lg font-semibold">
            There was an error loading the tour guide profile. Please try again
            later. 🙏
          </p>
        </div>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Trippie - Guide Details</title>
      </Helmet>
      <section className="py-20 md:py-24 lg:py-28 xl:py-32 text-outerSpace">
        <Container>
          <div className="p-2 flex flex-col xl:flex-row gap-x-8 gap-y-10">
            {/* Left Side - Guide Details */}
            <GuideDetails guide={guide} />

            {/* Right Side - Booking Form */}
            <BookingForm
              submitForm={onSubmit}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              subscriptionEndDate={subscriptionEndDate}
              disabledDates={disabledDates}
              isSlotDisabled={isSlotDisabled}
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default GuideDetailsPage;
