import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const [parcels, setParcels] = useState([]);
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  // Fetch parcels on component mount
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await axios.get("http://localhost:3000/myparcels", {
          params: { email: user.email },
        });
        console.log(response.data);
        setParcels(response.data);
      } catch (error) {
        console.error("Failed to fetch parcels:", error);
      }
    };

    fetchParcels();
  }, [user.email]);

  // Filter parcels based on the status selected
  const filteredParcels = filter === "all" ? parcels : parcels.filter(parcel => parcel.status === filter);

  // Cancel parcel booking
  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const response = await axios.patch(`http://localhost:3000/parcels/${id}`, { status: "canceled" });
        if (response.status === 200) {
          setParcels(prev =>
            prev.map(parcel => (parcel._id === id ? { ...parcel, status: "canceled" } : parcel))
          );
        }
      } catch (error) {
        console.error("Failed to cancel parcel:", error);
      }
    }
  };

  // Handle review submission
  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        deliveryManId: selectedParcel.deliveryMenId, // Delivery Man ID
        giverName: user.displayName, // User's Name
        giverImage: user.photoURL, // User's Image
        rating: rating, // Rating
        feedback: feedback, // Feedback Text
      };
  
      const response = await axios.post("http://localhost:3000/reviews", reviewData);
      if (response.status === 200) {
        setModalOpen(false);
        alert("Review submitted successfully");
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Parcels</h1>
      
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">Filter by Status: </label>
        <select
          id="statusFilter"
          className="border p-2 rounded-md"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="on the way">On The Way</option>
          <option value="delivered">Delivered</option>
          <option value="returned">Returned</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Parcels Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Parcel Type</th>
            <th className="border p-2">Requested Delivery Date</th>
            <th className="border p-2">Approx Delivery Date</th>
            <th className="border p-2">Booking Date</th>
            <th className="border p-2">Delivery Men ID</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParcels.map(parcel => (
            <tr key={parcel._id}>
              <td className="border p-2">{parcel.parcelType}</td>
              <td className="border p-2">{parcel.requestedDeliveryDate}</td>
              <td className="border p-2">{parcel.approxDeliveryDate || "N/A"}</td>
              <td className="border p-2">{new Date(parcel.bookingDate).toLocaleDateString()}</td>
              <td className="border p-2">{parcel.deliveryMenId || "N/A"}</td>
              <td className="border p-2">{parcel.status}</td>
              <td className="border p-2">
                {parcel.status === "pending" ? (
                  <>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                      onClick={() => handleCancel(parcel._id)}
                    >
                      Cancel
                    </button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <button className="px-3 py-1 bg-gray-500 text-white rounded-md mr-2" disabled>
                      Cancel
                    </button>
                    <button className="px-3 py-1 bg-gray-500 text-white rounded-md" disabled>
                      Update
                    </button>
                  </>
                )}
                {parcel.status === "Delivered" && (
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                    onClick={() => {
                      setSelectedParcel(parcel);
                      setModalOpen(true);
                    }}
                  >
                    Review
                  </button>
                )}
                <button className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Give Review</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-sm font-semibold">User's Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  className="w-full border p-2 rounded-md"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">User's Image</label>
                <input
                  type="text"
                  value={user.photoURL}
                  className="w-full border p-2 rounded-md"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Rating</label>
                <input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="1"
                  max="5"
                  className="w-full border p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full border p-2 rounded-md"
                  rows="4"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Delivery Men ID</label>
                <input
                  type="text"
                  value={selectedParcel.deliveryMenId || "N/A"}
                  className="w-full border p-2 rounded-md"
                  readOnly
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 ml-2"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
