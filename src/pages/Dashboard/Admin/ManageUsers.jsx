import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { axiosSecure } from "../../../hooks/axiosSecure";

const ManageUsers = () => {
  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  const TABLE_HEAD = ["", "Image", "Name", "Email", "Role", "Change Role"];

  const handleRoleUpdate = (id, newRole) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change role!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Updating User Role...");
        // update user role to the database
        try {
          const response = await axiosSecure.patch(`/users/${id}`, { newRole });
          if (response.data.modifiedCount > 0) {
            toast.success("User Role Updated Successfully.", { id: toastId });
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while updating user role.", {
            id: toastId,
          });
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Trippie - Manage Users</title>
      </Helmet>
      <section>
        {/* TABLE CARD */}
        <Card className="h-full w-full p-4">
          {/* TABLE HEADER */}
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <Typography variant="h4" color="blue-gray">
              Total Users List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all users
            </Typography>
          </CardHeader>
          {/* TABLE BODY */}
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
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
                {allUsers?.map(({ _id, photo, name, email, role }, index) => {
                  const isLast = index === allUsers?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>{index + 1}</td>
                      <td className={classes}>
                        <Avatar src={photo} alt={name} size="md" />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {" "}
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="paragraph" className="font-medium">
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="w-fit px-3 py-1 bg-opacity-80 rounded-md font-medium border border-head"
                        >
                          {" "}
                          {role}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <select
                          className="w-24 px-2 py-1 rounded outline outline-1 outline-primary-base"
                          onChange={(e) =>
                            handleRoleUpdate(_id, e.target.value)
                          }
                          defaultValue={"default"}
                        >
                          <option disabled value="default">
                            {role}
                          </option>
                          {role === "user" && (
                            <>
                              <option value="hotel-manager">
                                hotel-manager
                              </option>
                            </>
                          )}
                          {role === "hotel-manager" && (
                            <>
                              <option value="user">user</option>
                            </>
                          )}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </section>
    </>
  );
};

export default ManageUsers;
