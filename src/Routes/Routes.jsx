import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AgencyProfile from "../pages/Dashboard/Agency/AgencyProfile";
import CreateTour from "../pages/Dashboard/Agency/CreateTour";
import ManageTours from "../pages/Dashboard/Agency/ManageTours";
import AddRoom from "../pages/Dashboard/Hotel/AddRoom";
import HotelProfile from "../pages/Dashboard/Hotel/HotelProfile";
import ManageRooms from "../pages/Dashboard/Hotel/ManageRooms";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import HotelDetails from "../pages/HotelPage/HotelDetails";
import HotelPage from "../pages/HotelPage/HotelPage";
import JoinTourPage from "../pages/JoinTourPage/JoinTourPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardHomeRedirect from "./DashboardHomeRedirect";
import PrivateRoute from "./PrivateRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "hotel/list",
        element: <HotelPage />,
      },
      {
        path: "hotel/details/:hotelId",
        element: <HotelDetails />,
      },
      {
        path: "join-tour",
        element: <JoinTourPage />,
      },
    ],
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardHomeRedirect />,
      },
      // hotel-manager related routes
      {
        path: "add-room",
        element: (
          <RoleProtectedRoute allowedRoles={["hotel-manager"]}>
            <AddRoom />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "manage-rooms",
        element: (
          <RoleProtectedRoute allowedRoles={["hotel-manager"]}>
            <ManageRooms />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "hotel-profile",
        element: (
          <RoleProtectedRoute allowedRoles={["hotel-manager"]}>
            <HotelProfile />
          </RoleProtectedRoute>
        ),
      },
      // admin related routes
      {
        path: "manage-users",
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <ManageUsers />
          </RoleProtectedRoute>
        ),
      },
      // tour-agency related routes
      {
        path: "create-tour",
        element: (
          <RoleProtectedRoute allowedRoles={["tour-agent"]}>
            <CreateTour />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "manage-tours",
        element: (
          <RoleProtectedRoute allowedRoles={["tour-agent"]}>
            <ManageTours />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "tour-agency-profile",
        element: (
          <RoleProtectedRoute allowedRoles={["tour-agent"]}>
            <AgencyProfile />
          </RoleProtectedRoute>
        ),
      },
      // Add other role-specific routes here
    ],
  },
]);
