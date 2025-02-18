import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router"; // Fixed import
import { AuthContext } from "../Auth/AuthProvider";
import {
  FaHome,
  FaUsers,
  FaBox,
  FaSignOutAlt,
  FaTruck,
  FaChartBar,
  FaClipboardList,
  FaStar,
  FaUser,
  FaTasks,
  FaShippingFast,
} from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

const DashBoard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAdmin, isCustomer, isDeliveryman, logout } = useContext(AuthContext);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [];

  if (isAdmin) {
    menuItems.push(
      { path: "statistics", label: "Statistics", icon: <FaChartBar /> },
      { path: "allparcels", label: "Manage Parcel", icon: <FaBox /> },
      { path: "users", label: "Manage Users", icon: <FaUsers /> },
      { path: "alldeliverymen", label: "Manage DeliveryMen", icon: <FaTruck /> },
    );
  } else if (isDeliveryman) {
    menuItems.push(
      { path: "mydeliverylist", label: "My Orders", icon: <FaClipboardList /> },
      { path: "myreviews", label: "My Reviews", icon: <FaStar /> },
      { path: "profile", label: "Profile", icon: <FaUser /> }
    );
  } else {
    menuItems.push(
      { path: "bookparcel", label: "My Delivery List", icon: <FaTasks /> },
      { path: "myparcels", label: "My Parcels", icon: <FaShippingFast /> },
      { path: "myprofile", label: "Profile", icon: <FaUser /> }
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-500 text-white p-4 transition-all ${isCollapsed ? "w-16" : "w-60"}`}>
        <button onClick={toggleSidebar} className="text-2xl mb-4">
          <IoMdMenu />
        </button>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${isActive ? "bg-blue-700" : "hover:bg-blue-600"}`
              }
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-2 mt-4 p-2 bg-red-500 hover:bg-red-600 rounded"
        >
          <FaSignOutAlt />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
