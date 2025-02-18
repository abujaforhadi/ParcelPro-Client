import React, { useContext } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink, Outlet } from "react-router"; // Corrected import for NavLink
import { AuthContext } from "../Auth/AuthProvider";

const DashBoard = () => {
  const { isAdmin, isCustomer, isDeliveryman } = useContext(AuthContext);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar Section */}
      <div className="md:w-64 w-full ">
        <Sidebar>
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                  fontWeight: "bold",
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
          </Menu>
        </Sidebar>
      </div>

      {/* Main Content Section */}
      <div className="md:flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
