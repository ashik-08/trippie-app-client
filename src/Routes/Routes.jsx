import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello MainLayout</h1>,
    children: [
      {
        index: true,
        element: <h1>Hello Children</h1>,
      },
    ],
  },
]);
