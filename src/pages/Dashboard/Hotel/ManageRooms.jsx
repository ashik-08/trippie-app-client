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
import { deleteRoom, deleteRoomNumber, getRooms } from "../../../api/room-api";
import LoadingSpinner from "../../../components/LoadingState/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const ManageRooms = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: allRooms = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-rooms"],
    queryFn: async () => await getRooms(user?.email),
  });

  const deleteRoomMutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => queryClient.invalidateQueries(["all-rooms"]),
  });

  const deleteRoomNumberMutation = useMutation({
    mutationFn: ({ roomId, roomNumber }) =>
      deleteRoomNumber(roomId, roomNumber),
    onSuccess: () => queryClient.invalidateQueries(["all-rooms"]),
  });

  if (isLoading) return <LoadingSpinner />;

  const handleRoomDelete = async (id) => {
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
        const toastId = toast.loading("Deleting Room...");
        try {
          await deleteRoomMutation.mutateAsync(id);
          toast.success("Room deleted successfully", { id: toastId });
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deleting the room", {
            id: toastId,
          });
        }
      }
    });
  };

  const handleRoomNumberDelete = async (roomId, roomNumber) => {
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
        const toastId = toast.loading("Deleting Room Number...");
        try {
          await deleteRoomNumberMutation.mutateAsync({ roomId, roomNumber });
          toast.success("Room number deleted successfully", { id: toastId });
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deleting the room number", {
            id: toastId,
          });
        }
      }
    });
  };

  const TABLE_HEAD = [
    "Image",
    "Name",
    "Room Numbers",
    "Type",
    "Max Guests",
    "Facilities",
    "Price",
    "Edit",
    "Delete",
  ];

  return (
    <>
      <Helmet>
        <title>Trippie - Manage Rooms</title>
      </Helmet>
      <h1 className="text-2xl lg:text-3xl font-medium mb-8">Manage Rooms</h1>
      {/* <!-- Error State --> */}
      {isError && (
        <div className="h-[50vh] content-center">
          <div className="p-10 max-w-3xl mx-auto border border-red-400 rounded-lg bg-red-100 text-red-600">
            <p className="text-lg font-semibold text-center">
              There was an error loading the rooms. Please try again later. 🙏
            </p>
          </div>
        </div>
      )}
      {/* <!-- No Data Found --> */}
      {!isLoading && !isError && allRooms.length === 0 && (
        <div className="h-[50vh] content-center">
          <div className="p-10 max-w-3xl mx-auto border border-yellow-500 rounded-lg bg-yellow-100 text-yellow-700">
            <p className="text-lg font-semibold text-center">
              No rooms are added to manage. Please add some room first. 🙏
            </p>
          </div>
        </div>
      )}
      {!isLoading && !isError && allRooms.length > 0 && (
        <Card className="h-full w-full p-4">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-2">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Added Rooms List
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about added rooms
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link to="/dashboard/add-room">
                  <Button className="flex items-center gap-3" size="md">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                    Room
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
                {allRooms?.map((room, index) => {
                  const isLast = index === allRooms.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={room._id}>
                      <td className={classes}>
                        <Avatar
                          src={room.images[0]}
                          alt={room.name}
                          size="lg"
                        />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {room.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="grid grid-cols-3 gap-2">
                          {room.roomDetails.map((detail, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-evenly px-1.5 border rounded-md shadow-sm"
                            >
                              <Typography
                                variant="paragraph"
                                color="blue-gray"
                                className="font-medium"
                              >
                                {detail.roomNumber}
                              </Typography>
                              <Tooltip content="Delete Room Number">
                                <IconButton
                                  variant="text"
                                  onClick={() =>
                                    handleRoomNumberDelete(
                                      room._id,
                                      detail.roomNumber
                                    )
                                  }
                                >
                                  <TrashIcon className="h-7 w-7 text-red-500 border p-1 rounded" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {room.type}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {room.maxGuests}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {room.facilities.join(", ")}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="paragraph"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          ${room.pricePerNight}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Link
                          to={{
                            pathname: "/dashboard/add-room",
                            search: `?roomId=${room?._id}`,
                          }}
                        >
                          <Tooltip content="Edit Room">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-5" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Delete Room">
                          <IconButton
                            variant="text"
                            onClick={() => handleRoomDelete(room._id)}
                          >
                            <TrashIcon className="h-5 w-5 text-red-500" />
                          </IconButton>
                        </Tooltip>
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

export default ManageRooms;
