import { createBrowserRouter } from "react-router";
import rootLayout from "../layouts/rootLayout";
import Home from "../pages/Home/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: rootLayout,
    children:[
        {
            index: true,
            Component: Home
        }
    ]
  },
]);