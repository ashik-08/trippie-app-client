import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
    children: [
      {
        index: true,
        element: <h1>Hello Children</h1>,
      },
    ],
  },
]);
