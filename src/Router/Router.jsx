import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import Page404 from "../Pages/Page404";
import DashBoard from "../Dashboard/Admin/DashBoard";
import AdminHome from "../Dashboard/Admin/AdminHome";

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
                element: <DashBoard />,
                children: [
                    {
                        path: "adminhome", 
                        element: <AdminHome />
                    }
                ]
            }
        ],
        errorElement: <Page404 />
    }
]);

export default router;
