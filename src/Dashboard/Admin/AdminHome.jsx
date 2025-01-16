import React from "react";
import StatisticsPage from "./StatisticsPage";

const AdminHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg">Use the sidebar to navigate through admin tools and features.</p>
      <StatisticsPage/>
    </div>
  );
};

export default AdminHome;
