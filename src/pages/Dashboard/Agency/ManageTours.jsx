import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteTour, getTours, updateTourStatus } from "../../../api/tour-api";
import LoadingSpinner from "../../../components/LoadingState/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const ManageTours = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: allTours = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-tours"],
    queryFn: async () => await getTours(user?.email),
  });

  const deleteTourMutation = useMutation({
    mutationFn: deleteTour,
    onSuccess: () => queryClient.invalidateQueries(["all-tours"]),
  });

  const updateTourStatusMutation = useMutation({
    mutationFn: ({ tourId, status }) => updateTourStatus(tourId, status),
    onSuccess: () => queryClient.invalidateQueries(["all-tours"]),
  });

  if (isLoading) return <LoadingSpinner />;

  const handleTourDelete = async (id) => {
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
        const toastId = toast.loading("Deleting Tour...");
        try {
          await deleteTourMutation.mutateAsync(id);
          toast.success("Tour deleted successfully", { id: toastId });
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deleting the tour", {
            id: toastId,
          });
        }
      }
    });
  };

  const handleStatusChange = async (tourId) => {
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
        const toastId = toast.loading("Updating tour status...");
        try {
          await updateTourStatusMutation.mutateAsync({
            tourId,
            status: "completed",
          });
          toast.success("Tour status updated successfully", { id: toastId });
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while updating the tour status", {
            id: toastId,
          });
        }
      }
    });
  };

  const TABLE_HEAD = [
    "#",
    "Name",
    "Type",
    "Location",
    "Start Date",
    "End Date",
    "Duration",
    "Max Group Size",
    "Price/Person",
    "Status",
    "Actions",
  ];

  return (
    <>
      <Helmet>
        <title>Trippie - Manage Tours</title>
      </Helmet>
      <h1 className="text-2xl lg:text-3xl font-medium mb-8">Manage Tours</h1>
      {isError && (
        <div className="h-[50vh] content-center">
          <div className="p-10 max-w-3xl mx-auto border border-red-400 rounded-lg bg-red-100 text-red-600">
            <p className="text-lg font-semibold text-center">
              There was an error loading the tours. Please try again later. 🙏
            </p>
          </div>
        </div>
      )}
      {!isLoading && !isError && allTours.length === 0 && (
        <div className="h-[50vh] content-center">
          <div className="p-10 max-w-3xl mx-auto border border-yellow-500 rounded-lg bg-yellow-100 text-yellow-700">
            <p className="text-lg font-semibold text-center">
              No tours are added to manage. Please add some tour first. 🙏
            </p>
          </div>
        </div>
      )}
      {!isError && allTours.length > 0 && (
        <Card className="h-full w-full p-4">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-2">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Added Tours List
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about added tours
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link to="/dashboard/create-tour">
                  <Button className="flex items-center gap-3" size="md">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                    Tour
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
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
                {allTours?.map((tour, index) => {
                  const isLast = index === allTours.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={tour._id}>
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
                          {tour.tourName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {tour.tourType}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {tour.destinations.join(", ")}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(tour.startDate).toLocaleString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(tour.endDate).toLocaleString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {tour.duration}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {tour.maxGroupSize}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="paragraph"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          BDT {tour.pricePerPerson}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal bg-primary-100/30 border border-primary-base p-1.5 rounded-md"
                        >
                          {tour.tourStatus}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {tour.tourStatus !== "completed" && (
                          <>
                            <Link
                              to={{
                                pathname: "/dashboard/create-tour",
                                search: `?tourId=${tour?._id}`,
                              }}
                            >
                              <Tooltip content="Edit Tour">
                                <IconButton variant="text">
                                  <PencilIcon className="h-5 w-5 text-secondary-500" />
                                </IconButton>
                              </Tooltip>
                            </Link>
                            <Tooltip content="Delete Tour">
                              <IconButton
                                variant="text"
                                onClick={() => handleTourDelete(tour._id)}
                              >
                                <TrashIcon className="h-5 w-5 text-red-500" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Mark as Completed">
                              <IconButton
                                variant="text"
                                onClick={() => handleStatusChange(tour._id)}
                              >
                                <CheckIcon className="h-6 w-6 text-primary-600" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        {tour.tourStatus === "completed" && (
                          <Tooltip content="Completed">
                            <IconButton variant="text" disabled>
                              <CheckIcon className="h-6 w-6 text-gray-500" />
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

export default ManageTours;
