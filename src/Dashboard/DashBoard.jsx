import React, { useContext } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, Outlet } from "react-router"; 
import { AuthContext } from "../Auth/AuthProvider";

const DashBoard = () => {
  const { isAdmin, isCustomer, isDeliveryman } = useContext(AuthContext);

  return (
    <div className="flex">
      {/* Sidebar Section */}
      <div className="w-1/4 h-screen bg-gray-100">
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
                <MenuItem component={<Link to="adminhome" />}>Admin Home</MenuItem>
                <MenuItem component={<Link to="allparcels" />}>All Parcels</MenuItem>
                <MenuItem component={<Link to="users" />}>All Users</MenuItem>
                <MenuItem component={<Link to="alldeliverymen" />}>All Delivery Men</MenuItem>
                <MenuItem component={<Link to="statistics" />}>Statistics</MenuItem>
              </>
            )}

            {/* Customer-specific menu */}
            {isCustomer && (
              <>
                <MenuItem component={<Link to="bookparcel" />}>Book a Parcel</MenuItem>
                <MenuItem component={<Link to="myparcels" />}>My Parcels</MenuItem>
                <MenuItem component={<Link to="myprofile" />}>My Profile</MenuItem>
              </>
            )}

            {/* Deliveryman-specific menu */}
            {isDeliveryman && (
              <>
                <MenuItem component={<Link to="mydeliverylist" />}>My Delivery List</MenuItem>
                <MenuItem component={<Link to="myreviews" />}>My Reviews</MenuItem>
              </>
            )}

            {/* Common menu */}
            <MenuItem component={<Link to="history" />}>History</MenuItem>
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
