import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import Page404 from "../Pages/Page404";
import AdminHome from "../Dashboard/Admin/AdminHome";
import AllUsers from "../Dashboard/Admin/AllUsers";
import PrivateRouter from "./PrivateRouter";
import BookParcel from "../Dashboard/Customer/BookParcels";
import DashBoard from "../Dashboard/DashBoard";
import MyParcels from "../Dashboard/Customer/MyParcels";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Registration />
            },
            {
                path: "/dashboard",
                element: <PrivateRouter><DashBoard /></PrivateRouter> ,
                children: [
                    {
                        path: "adminhome", 
                        element: <AdminHome />
                    },
                    {
                        path: "users", 
                        element: <AllUsers />
                    },

                    // customer
                    {
                        path: "bookparcel", 
                        element: <BookParcel />
                    },
                    {
                        path: "myparcels", 
                        element: <MyParcels />
                    }
                ]
            }
        ],
        errorElement: <Page404 />
    }
]);

export default router;
