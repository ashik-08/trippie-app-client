import { createBrowserRouter, Outlet } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
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
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardHomeRedirect />,
      },
      // admin related routes
      {
        path: "admin-home",
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <h1>Hello Admin</h1>
          </RoleProtectedRoute>
        ),
      },
      // user related routes
      {
        path: "user-home",
        element: (
          <RoleProtectedRoute allowedRoles={["user"]}>
            <h1>Hello User</h1>
          </RoleProtectedRoute>
        ),
      },
      // Add other role-specific routes here
    ],
  },
]);
