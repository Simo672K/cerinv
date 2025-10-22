import Home from "@/pages/Home";
import Signin from "@/pages/Signin";
import DashboardTemplate from "@/templates/DashboardTemplate";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardTemplate />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

export default Router;
