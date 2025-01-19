import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router"; 
import Loading from "../../Components/Loading";
import ParcelModal from "../../Components/ParcelModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchParcelsAndDeliveryMen = async () => {
      try {
        setIsLoading(true);

        const [parcelsResponse, usersResponse] = await Promise.all([
          axios.get("https://parcelpro-server.vercel.app/allparcels"),
          axios.get("https://parcelpro-server.vercel.app/users"),
        ]);

        setParcels(parcelsResponse.data);
        setDeliveryMen(
          usersResponse.data.filter((user) => user.role === "deliveryman")
        );
      } catch (err) {
        setError("Failed to fetch data.");
        toast.error("Failed to load data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchParcelsAndDeliveryMen();
  }, []);

  const handleAssign = async (parcelId, deliveryManId) => {
    if (!deliveryManId || !deliveryDate) {
      toast.warning("Please select a delivery man and date.");
      return;
    }

    try {
      setIsLoading(true);
      await axios.put(`https://parcelpro-server.vercel.app/updateparcel/${parcelId}`, {
        status: "On The Way",
        deliveryMenId: deliveryManId,
        approximateDeliveryDate: deliveryDate,
      });

      setParcels((prev) =>
        prev.map((parcel) =>
          parcel._id === parcelId
            ? { ...parcel, status: "On The Way", deliveryMenId, approximateDeliveryDate: deliveryDate }
            : parcel
        )
      );

      setSelectedParcel(null);
      toast.success("Parcel assigned successfully!");

      navigate("/"); // Navigate to the home page after successful assignment
    } catch (err) {
      console.error("Error assigning delivery man:", err);
      toast.error("Failed to assign parcel.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://parcelpro-server.vercel.app/allparcels", {
        params: { startDate: searchStartDate, endDate: searchEndDate },
      });
      setParcels(response.data);
    } catch (err) {
      setError("Search failed.");
      toast.error("Failed to search parcels.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-semibold mb-4">All Parcels</h1>

      {/* Search Bar */}
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          value={searchStartDate}
          onChange={(e) => setSearchStartDate(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="date"
          value={searchEndDate}
          onChange={(e) => setSearchEndDate(e.target.value)}
          className="border p-2 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">User’s Name</th>
              <th className="px-4 py-2">User’s Phone</th>
              <th className="px-4 py-2">Booking Date</th>
              <th className="px-4 py-2">Requested Delivery Date</th>
              <th className="px-4 py-2">Cost</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Manage</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="border-t">
                <td className="px-4 py-2">{parcel.name}</td>
                <td className="px-4 py-2">{parcel.phoneNumber}</td>
                <td className="px-4 py-2">{parcel.bookingDate}</td>
                <td className="px-4 py-2">{parcel.requestedDeliveryDate}</td>
                <td className="px-4 py-2">{parcel.price} Tk</td>
                <td className="px-4 py-2">{parcel.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedParcel(parcel)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedParcel && (
        <ParcelModal
          parcel={selectedParcel}
          deliveryMen={deliveryMen}
          deliveryDate={deliveryDate}
          setDeliveryDate={setDeliveryDate}
          onClose={() => setSelectedParcel(null)}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
};

export default AllParcels;
