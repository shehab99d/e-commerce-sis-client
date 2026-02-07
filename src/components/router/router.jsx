import { createBrowserRouter } from "react-router";
import rootLayout from "../layouts/rootLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Contract from "../pages/Contract/Contract";
import FAQ from "../pages/FAQ/FAQ";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/Login/Login";
import Coverage from "../../Coverage/Coverage";
import AdminLayout from "../layouts/AdminLayout";
import AdminAddProduct from "../../AdminRoutes/AdminAddProduct ";
import AdminHome from "../pages/AdminHome.jsx/AdminHome";
import ManageProduct from "../../AdminRoutes/ManageProduct/ManageProduct";
import EditProduct from "../../AdminRoutes/EditProduct";
import EditBanner from "../../AdminRoutes/EditBanner";
import Editcard from "../../AdminRoutes/Editcard";
import ManageUsers from "../../AdminRoutes/ManageUsers";



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
          path: '/coverage',
          element: <Coverage></Coverage>
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
  {
    path: 'admin',
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: AdminHome
      },
      {
        path: 'add-product',
        Component: AdminAddProduct
      },
      {
        path: 'manage-products',
        Component: ManageProduct
      },
      {
        path: 'edit-product',
        Component: EditProduct
      },
      {
        path: 'edit-banner',
        Component: EditBanner
      },
      {
        path: 'edit-card',
        Component: Editcard
      },
      {
        path: 'manage-users',
        Component: ManageUsers
      }
    ]
  }
]);