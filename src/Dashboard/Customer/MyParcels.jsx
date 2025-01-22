import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Import ShadCN components
import { toast } from "react-toastify";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const [parcels, setParcels] = useState([]);
  const [filter, setFilter] = useState("all");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedParcelId, setSelectedParcelId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await axios.get("https://parcelpro-server.vercel.app/myparcels", {
          params: { email: user.email },
        });
        setParcels(response.data);
      } catch (error) {
        console.error("Failed to fetch parcels:", error);
      }
    };

    fetchParcels();
  }, [user.email]);

  const filteredParcels = filter === "all" ? parcels : parcels.filter(parcel => parcel.status === filter);

  const openCancelModal = (id) => {
    setSelectedParcelId(id);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    try {
      const response = await axios.patch(`https://parcelpro-server.vercel.app/parcelcancel/${selectedParcelId}`, { status: "Canceled" });
      if (response.status === 200) {
        setParcels(prev =>
          prev.map(parcel => (parcel._id === selectedParcelId ? { ...parcel, status: "Canceled" } : parcel))
        );
        toast.success("Parcel Canceled successfully.");
        setCancelModalOpen(false); 
      }
    } catch (error) {
      console.error("Failed to cancel parcel:", error);
      toast.error("Failed to cancel parcel.");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        deliveryManId: selectedParcel.deliveryMenId,
        giverName: user.displayName,
        giverImage: user.photoURL,
        rating: rating,
        feedback: feedback,
      };

      const response = await axios.post("https://parcelpro-server.vercel.app/reviews", reviewData);
      if (response.status === 200) {
        setModalOpen(false);
        toast.success("Review submitted successfully");
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 ">
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
            <option value="Pending">Pending</option>
            <option value="On The Way">On The Way</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Parcels Table using ShadCN components */}
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Tracking ID</TableHead>
            <TableHead>Parcel Type</TableHead>
            <TableHead>Requested Delivery Date</TableHead>
            <TableHead>Approx Delivery Date</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Delivery Men ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParcels.map(parcel => (
            <TableRow key={parcel._id}>
              <TableCell>{parcel._id}</TableCell>
              <TableCell>{parcel.parcelType}</TableCell>
              <TableCell>{parcel.requestedDeliveryDate}</TableCell>
              <TableCell>{parcel.approximateDeliveryDate || "N/A"}</TableCell>
              <TableCell>{new Date(parcel.bookingDate).toLocaleDateString()}</TableCell>
              <TableCell>{parcel.deliveryMenId || "N/A"}</TableCell>
              <TableCell>{parcel.status}</TableCell>
              <TableCell>
                {parcel.status === "Pending" ? (
                  <>
                    <button
                      className="px-3 text-center py-1 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                      onClick={() => openCancelModal(parcel._id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 mr-2 text-center py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={() => navigate(`/dashboard/updateParcel/${parcel._id}`, { state: { parcel } })}
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <button className="px-3 mr-2 text-center py-1 bg-gray-500 text-white rounded-md" disabled>
                      Cancel
                    </button>
                    <button className="px-3 mr-2 text-center py-1 bg-gray-500 text-white rounded-md" disabled>
                      Update
                    </button>
                  </>
                )}
                {parcel.status === "Delivered" && (
                  <button
                    className="px-3 text-center py-1 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                    onClick={() => {
                      setSelectedParcel(parcel);
                      setModalOpen(true);
                    }}
                  >
                    Review
                  </button>
                )}
                <button
                  className={`px-3 mr-2 text-center py-1 rounded-md ${parcel.status === "Delivered" || parcel.status === "Canceled"
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                  disabled={parcel.status === "Delivered" || parcel.status === "Canceled"}
                >
                  Pay
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

      {/* Cancel Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to cancel this parcel?</h2>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-2"
                onClick={() => setCancelModalOpen(false)} // Close modal without doing anything
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleConfirmCancel} // Proceed with cancellation
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
