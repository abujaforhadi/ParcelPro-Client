import React, { useContext } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink, Outlet } from "react-router"; 
import { AuthContext } from "../Auth/AuthProvider";

const DashBoard = () => {
  const { isAdmin, isCustomer, isDeliveryman } = useContext(AuthContext);
  // console.log(isAdmin,isCustomer,isDeliveryman);

  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="w-1/4 ">
        <Sidebar>
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            {/* Admin-specific menu */}
            {isAdmin && (
              <>
                <MenuItem component={<NavLink to="allparcels" />}>All Parcels</MenuItem>
                <MenuItem component={<NavLink to="users" />}>All Users</MenuItem>
                <MenuItem component={<NavLink to="alldeliverymen" />}>All Delivery Men</MenuItem>
                <MenuItem component={<NavLink to="statistics" />}>Statistics</MenuItem>
              </>
            )}

            {/* Customer-specific menu */}
            {isCustomer && (
              <>
                <MenuItem component={<NavLink to="bookparcel" />}>Book a Parcel</MenuItem>
                <MenuItem component={<NavLink to="myparcels" />}>My Parcels</MenuItem>
                <MenuItem component={<NavLink to="myprofile" />}>My Profile</MenuItem>
              </>
            )}

            {/* Deliveryman-specific menu */}
            {isDeliveryman && (
              <>
                <MenuItem component={<NavLink to="mydeliverylist" />}>My Delivery List</MenuItem>
                <MenuItem component={<NavLink to="myreviews" />}>My Reviews</MenuItem>
                <MenuItem component={<NavLink to="profile" />}>Profile</MenuItem>
              </>
            )}

            {/* Common menu */}
          </Menu>
        </Sidebar>
      </div>

      {/* Main Content Section */}
      <div className="w-3/4 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
