import Home from "../pages/Home";
import Category from "../pages/Category";
import ProductDetails from "../pages/ProductDetails";
import Search from "../pages/Search";
import Cart from "../pages/Cart";
import Success from "../pages/Success";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/register";
import Customer from "../pages/Customer";
import Order from "../pages/Order";
import Order_details from "../pages/Order_details";
import { CheckLogged, CheckNotLogged } from "../shared/Authrequired";
const publicRoutes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/Category-:id",
    element: Category,
  },
  {
    path: "/ProductDetails-:id",
    element: ProductDetails,
  },
  {
    path: "/Search",
    element: Search,
  },
  {
    path: "/Cart",
    element: Cart,
  },
  {
    path: "/Order-:id",
    element: CheckNotLogged(Order),
  },
  {
    path: "/OrderDetails-:id",
    element: CheckNotLogged(Order_details),
  },
  {
    path: "/Success",
    element: Success,
  },
  {
    path: "/Login",
    element: CheckLogged(Login),
  },
  {
    path: "/Customer",
    element: CheckNotLogged(Customer),
  },
  {
    path: "/Register",
    element: CheckLogged(Register),
  },
  {
    path: "/*",
    element: NotFound,
  },
];
export default publicRoutes;
