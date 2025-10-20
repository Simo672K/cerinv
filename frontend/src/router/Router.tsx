import Home from "@/pages/Home";
import Signin from "@/pages/Signin";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

export default Router;
