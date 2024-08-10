import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Home from "./pages/home";
import Details from "./pages/details";

const minhasTelas = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={minhasTelas} />
);
