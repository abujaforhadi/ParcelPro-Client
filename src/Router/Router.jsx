import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import Page404 from "../Pages/Page404";
import AllUsers from "../Dashboard/Admin/AllUsers";
import PrivateRouter from "./PrivateRouter";
import BookParcel from "../Dashboard/Customer/BookParcels";
import DashBoard from "../Dashboard/DashBoard";
import MyParcels from "../Dashboard/Customer/MyParcels";
import MyProfile from "../Dashboard/Customer/MyProfile";
import AllParcels from "../Dashboard/Admin/AllParcels";
import StatisticsPage from "../Dashboard/Admin/StatisticsPage";
import AdminRouter from "./AdminRouter";
import AllDeliveryMen from "../Dashboard/Admin/AllDeliveryMen";
import DeliveryList from "../Dashboard/DeliveryMan/DeliveryList";
import MyReviews from "../Dashboard/DeliveryMan/Myreviews";
import Profile from "../Dashboard/DeliveryMan/Profile";
import UpdateParcel from "../Dashboard/Customer/UpdateParcel";
import DeliveryManRouter from "./DeliveryManRouter";

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
                element: <PrivateRouter><DashBoard /></PrivateRouter>,
                children: [
                  
                    {
                        path: "statistics",
                        element: <AdminRouter><StatisticsPage /></AdminRouter>
                    },
                    {
                        path: "alldeliverymen",
                        element: <AdminRouter><AllDeliveryMen /></AdminRouter>
                    },
                    {
                        path: "users",
                        element: <AdminRouter><AllUsers /></AdminRouter>
                    },
                  
                    {
                        path: "allparcels",
                        element: <AdminRouter><AllParcels /></AdminRouter>
                    },
                  
                   
                    // Customer routes
                    {
                        path: "bookparcel",
                        element: <BookParcel />
                    },
                    {
                        path:"updateParcel/:id" ,
                        element:<UpdateParcel />

                    },
                    {
                        path: "myparcels",
                        element: <MyParcels />
                    },
                    {
                        path: "myprofile",
                        element: <MyProfile />
                    },
                    // delivery man routes
                    {
                        path: "mydeliverylist",
                        element: <DeliveryManRouter><DeliveryList /></DeliveryManRouter> 
                    },
                    {
                        path: "myreviews",
                        element: <DeliveryManRouter><MyReviews /></DeliveryManRouter> 
                    },
                    {
                        path: "profile",
                        element: <DeliveryManRouter><Profile /></DeliveryManRouter> 
                    },
                ]
            }
        ],
        errorElement: <Page404 />
    }
]);

export default router;
