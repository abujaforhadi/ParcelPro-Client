import React, { useState, useEffect } from "react";
import axios from "axios";

const AllDeliveryMen = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const response = await axios.get("https://parcelpro-server.vercel.app/users");
        const allUsers = response.data;
        const deliveryMenData = allUsers.filter((user) => user.role === "deliveryman");
    
        // Fetch all reviews
        const reviewResponse = await axios.get("https://parcelpro-server.vercel.app/allreview");
        const allReviews = reviewResponse.data.reviews;  // Access the reviews array directly
        console.log("All Reviews:", allReviews);  // Check the structure
    
        // Calculate average review for each delivery man
        const updatedDeliveryMen = deliveryMenData.map((man) => {
          // Filter reviews that match the delivery man
          const reviewsForMan = allReviews.filter((review) => review.deliveryManId === man._id);
          
          // Calculate total score and average rating
          const totalScore = reviewsForMan.reduce((acc, review) => acc + review.rating, 0);
          const averageReview = reviewsForMan.length > 0 ? (totalScore / reviewsForMan.length).toFixed(2) : "N/A";
          
          return { ...man, averageReview };
        });
    
        setDeliveryMen(updatedDeliveryMen);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    fetchData();
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
                <td className="border border-gray-300 px-4 py-2">{man.displayName}</td>
                <td className="border border-gray-300 px-4 py-2">{man.contact}</td>
                <td className="border border-gray-300 px-4 py-2">{man.parcelsDelivered || 0}</td>
                <td className="border border-gray-300 px-4 py-2">{man.averageReview}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-gray-300 px-4 py-2" colSpan="4">
                No delivery men found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllDeliveryMen;
