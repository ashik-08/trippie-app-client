import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import HotelDetails from "../pages/HotelPage/HotelDetails";
import HotelPage from "../pages/HotelPage/HotelPage";
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
            <h1>My booked services here</h1>
          </RoleProtectedRoute>
        ),
      },
      {
        path: "manage-rooms",
        element: (
          <RoleProtectedRoute allowedRoles={["hotel-manager"]}>
            <h1>Payment history here</h1>
          </RoleProtectedRoute>
        ),
      },
      {
        path: "hotel-profile",
        element: (
          <RoleProtectedRoute allowedRoles={["hotel-manager"]}>
            <h1>Payment history here</h1>
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
      // Add other role-specific routes here
    ],
  },
]);
