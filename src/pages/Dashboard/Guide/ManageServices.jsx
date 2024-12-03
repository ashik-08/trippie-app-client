import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
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
import { deleteService, getAllServicesByEmail } from "../../../api/service-api";
import LoadingSpinner from "../../../components/LoadingState/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const ManageServices = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: allServices = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-services"],
    queryFn: async () => await getAllServicesByEmail(user?.email),
  });

  const deleteServiceMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => queryClient.invalidateQueries(["all-services"]),
  });

  if (isLoading) return <LoadingSpinner />;

  const handleServiceDelete = async (id) => {
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
        const toastId = toast.loading("Deleting Service...");
        try {
          await deleteServiceMutation.mutateAsync(id);
          toast.success("Service deleted successfully", { id: toastId });
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deleting the service", {
            id: toastId,
          });
        }
      }
    });
  };

  const TABLE_HEAD = [
    "S/N",
    "Image",
    "Name",
    "Type",
    "Location",
    "Guest Type",
    "Book From",
    "Book Till",
    "Slot",
    "Duration",
    "Price",
    "Actions",
  ];

  return (
    <>
      <Helmet>
        <title>Trippie - Manage Services</title>
      </Helmet>
      <h1 className="text-2xl lg:text-3xl font-medium mb-8">Manage Services</h1>
      {isError && (
        <div className="h-[50vh] content-center">
          <div className="p-10 max-w-3xl mx-auto border border-red-400 rounded-lg bg-red-100 text-red-600">
            <p className="text-lg font-semibold text-center">
              There was an error loading the services. Please try again later.
              🙏
            </p>
          </div>
        </div>
      )}
      {!isLoading && !isError && allServices.length === 0 && (
        <div className="h-[50vh] content-center">
          <div className="p-10 max-w-3xl mx-auto border border-yellow-500 rounded-lg bg-yellow-100 text-yellow-700">
            <p className="text-lg font-semibold text-center">
              No services are added to manage. Please add some service first. 🙏
            </p>
          </div>
        </div>
      )}
      {!isError && allServices.length > 0 && (
        <Card className="h-full w-full p-4">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-2">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Added Services List
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about added services
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link to="/dashboard/add-service">
                  <Button className="flex items-center gap-3" size="md">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                    Service
                  </Button>
                </Link>
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
                {allServices?.map((service, index) => {
                  const isLast = index === allServices.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={service._id}>
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
                        <Avatar
                          src={service.images[0]}
                          alt={service.tourType}
                          size="md"
                        />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {service.tourName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {service.tourType}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {service.location}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal capitalize"
                        >
                          {service.guestType}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(
                            service.availabilityStartDate
                          ).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(
                            service.availabilityEndDate
                          ).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal capitalize"
                        >
                          {service.slot}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {service.duration}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="paragraph"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          BDT {service.price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <>
                          <Link
                            to={{
                              pathname: "/dashboard/add-service",
                              search: `?serviceId=${service?._id}`,
                            }}
                          >
                            <Tooltip content="Edit Service">
                              <IconButton variant="text">
                                <PencilIcon className="h-5 w-5 text-secondary-500" />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip content="Delete Service">
                            <IconButton
                              variant="text"
                              onClick={() => handleServiceDelete(service._id)}
                            >
                              <TrashIcon className="h-5 w-5 text-red-500" />
                            </IconButton>
                          </Tooltip>
                        </>
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

export default ManageServices;
