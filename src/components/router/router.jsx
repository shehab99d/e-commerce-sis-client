import { createBrowserRouter } from "react-router";
import rootLayout from "../layouts/rootLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Contract from "../pages/Contract/Contract";
import FAQ from "../pages/FAQ/FAQ";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/Login/Login";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: rootLayout,
    children:[
        {
            index: true,
            Component: Home
        },
        {
          path: 'about',
          Component: About
        },
        {
          path: 'services',
          Component: Services
        },
        {
          path: 'contact',
          Component: Contract
        },
        {
          path: 'faq',
          Component: FAQ
        },
        {
          path: 'shop',
          Component: Shop
        },
        {
          path: 'login',
          Component: Login
        }
    ]
  },
]);