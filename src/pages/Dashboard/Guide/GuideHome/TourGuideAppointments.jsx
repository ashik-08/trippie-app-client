import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  deleteAppointment,
  updateAppointmentStatus,
} from "../../../../api/appointment-api";
import { getTourGuide } from "../../../../api/guide-api";
import LoadingSpinner from "../../../../components/LoadingState/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";

const TourGuideAppointments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-appointments"],
    queryFn: async () => await getTourGuide(user?.email),
  });

  const allAppointments = data?.appointments || [];

  const deleteAppointmentMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => queryClient.invalidateQueries(["all-appointments"]),
  });

  const updateAppointmentStatusMutation = useMutation({
    mutationFn: ({ appointmentId, status }) =>
      updateAppointmentStatus(appointmentId, status),
    onSuccess: () => queryClient.invalidateQueries(["all-appointments"]),
  });

  if (isLoading) return <LoadingSpinner />;

  const handleAppointmentDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting Appointment...");
        try {
          await deleteAppointmentMutation.mutateAsync(id);
          toast.success("Appointment deleted successfully", { id: toastId });
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deleting the appointment", {
            id: toastId,
          });
        }
      }
    });
  };

  const handleAppointmentStatusChange = async (appointmentId, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Updating appointment status...");
        try {
          await updateAppointmentStatusMutation.mutateAsync({
            appointmentId,
            status,
          });
          toast.success("Appointment status updated successfully", {
            id: toastId,
          });
        } catch (error) {
          console.error(error);
          toast.error(
            "An error occurred while updating the appointment status",
            {
              id: toastId,
            }
          );
        }
      }
    });
  };

  const TABLE_HEAD = [
    "S/N",
    "Name",
    "Email",
    "Mobile",
    "People",
    "Start Date",
    "End Date",
    "Slot",
    "Duration",
    "Status",
    "Actions",
  ];

  return (
    <>
      {isError && (
        <div className="h-[40vh] content-center">
          <div className="p-10 max-w-3xl mx-auto border border-red-400 rounded-lg bg-red-100 text-red-600">
            <p className="text-lg font-semibold text-center">
              There was an error loading the appointments. Please try again
              later. 🙏
            </p>
          </div>
        </div>
      )}
      {!isLoading && !isError && allAppointments.length === 0 && (
        <div className="h-[40vh] content-center">
          <div className="p-10 max-w-3xl mx-auto border border-yellow-500 rounded-lg bg-yellow-100 text-yellow-700">
            <p className="text-lg font-semibold text-center">
              No appointments have been booked yet.
            </p>
          </div>
        </div>
      )}
      {!isError && allAppointments.length > 0 && (
        <Card className="h-full w-full p-4 mt-12">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-5 flex items-center justify-between gap-2">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Upcoming Tours Booking List
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all your bookings here.
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-auto px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allAppointments?.map((appointment, index) => {
                  const isLast = index === allAppointments.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={appointment.appointmentId}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {appointment.guestDetails.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {appointment.guestDetails.email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {appointment.guestDetails.mobile}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {appointment.guestDetails.partySize}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(appointment.startDate).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(appointment.endDate).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {appointment.slot}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {appointment.duration}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-center font-normal bg-primary-100/30 border border-primary-base px-1 py-0.5 rounded-lg"
                        >
                          {appointment.status}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {appointment.status === "pending" && (
                          <>
                            <Tooltip content="Accept Booking">
                              <IconButton
                                variant="text"
                                onClick={() =>
                                  handleAppointmentStatusChange(
                                    appointment.appointmentId,
                                    "accepted"
                                  )
                                }
                              >
                                <CheckIcon className="h-6 w-6 text-primary-600" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Reject Booking">
                              <IconButton
                                variant="text"
                                onClick={() =>
                                  handleAppointmentStatusChange(
                                    appointment.appointmentId,
                                    "rejected"
                                  )
                                }
                              >
                                <XMarkIcon className="h-6 w-6 text-red-500" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        {appointment.status !== "pending" && (
                          <Tooltip content="Delete Appointment">
                            <IconButton
                              variant="text"
                              onClick={() =>
                                handleAppointmentDelete(
                                  appointment.appointmentId
                                )
                              }
                            >
                              <TrashIcon className="h-5 w-5 text-red-500" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default TourGuideAppointments;
