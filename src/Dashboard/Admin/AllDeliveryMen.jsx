import React, { useState, useEffect } from "react";
import axios from "axios";

const AllDeliveryMen = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((response) => {
      const allUsers = response.data;
      const deliveryMenData = allUsers.filter(user => user.role === "deliveryman");
      setDeliveryMen(deliveryMenData);
      console.log(deliveryMenData);
    }).catch(error => {
      console.error("Error fetching delivery men:", error);
    });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Delivery Men</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Delivery Man's Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
            <th className="border border-gray-300 px-4 py-2">Number of Parcels Delivered</th>
            <th className="border border-gray-300 px-4 py-2">Average Review</th>
          </tr>
        </thead>
        <tbody>
          {deliveryMen.length > 0 ? (
            deliveryMen.map((man) => (
              <tr key={man._id}>
                <td className="border border-gray-300 px-4 py-2">{man.displayName
                }</td>
                <td className="border border-gray-300 px-4 py-2">{man.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{man.parcelsDelivered || 0}</td>
                <td className="border border-gray-300 px-4 py-2">{man.averageReview || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-gray-300 px-4 py-2" colSpan="4">No delivery men found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllDeliveryMen;
