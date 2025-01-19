import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeliveryList = () => {
  const { userDB } = useContext(AuthContext);
  console.log(userDB);
  const loggedInDeliveryManId = userDB._id;
  const [parcels, setParcels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/allparcels");
        const assignedParcels = response.data.filter(
          (parcel) => parcel.deliveryMenId === loggedInDeliveryManId
        );
        setParcels(assignedParcels);
      } catch (err) {
        setError("Failed to load parcels.");
        toast.error("Error loading parcels!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchParcels();
  }, [loggedInDeliveryManId]);

  const handleStatusChange = async (parcelId, newStatus) => {
    try {
      setIsLoading(true);

      // Update the parcel status
      await axios.put(`http://localhost:3000/updateparcel/${parcelId}`, {
        status: newStatus,
        deliveryMenId: loggedInDeliveryManId,
      });

      // If status is "Delivered", increment parcelsDelivered
      if (newStatus === "Delivered") {
        await axios.patch(`http://localhost:3000/userupdate/${userDB._id}`, {
          parcelsDelivered: (userDB.parcelsDelivered || 0) + 1,
        });

        toast.success("Parcel delivered! Parcel count updated.");
      }

      // Update the local state
      setParcels((prevParcels) =>
        prevParcels.map((parcel) =>
          parcel._id === parcelId ? { ...parcel, status: newStatus } : parcel
        )
      );
      toast.success(`Status updated to ${newStatus}!`);
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status!");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (parcelId, newStatus) => {
    setModalData({ parcelId, newStatus });
  };

  const closeModal = () => {
    setModalData(null);
  };

  const confirmStatusChange = () => {
    if (modalData) {
      handleStatusChange(modalData.parcelId, modalData.newStatus);
    }
    closeModal();
  };

  const handleViewLocation = (location) => {
    window.open(
      `https://www.google.com/maps?q=${location.lat},${location.lng}`,
      "_blank"
    );
    toast.info("Opening location...");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 font-bold";
      case "Cancelled":
        return "text-red-600 font-bold";
      case "In Progress":
        return "text-yellow-600 font-bold";
      default:
        return "text-gray-600 font-bold";
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="mb-4 text-2xl font-semibold leading-tight">My Delivery List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full ">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3">Booked User’s Name</th>
              <th className="p-3">Receiver's Name</th>
              <th className="p-3">Booked User’s Phone</th>
              <th className="p-3">Requested Delivery Date</th>
              <th className="p-3">Approx. Delivery Date</th>
              <th className="p-3">Receiver's Phone</th>
              <th className="p-3">Receiver's Address</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3">{parcel.name}</td>
                <td className="p-3">{parcel.receiverName}</td>
                <td className="p-3">{parcel.phoneNumber}</td>
                <td className="p-3">{parcel.requestedDeliveryDate}</td>
                <td className="p-3">{parcel.approximateDeliveryDate}</td>
                <td className="p-3">{parcel.receiverPhoneNumber}</td>
                <td className="p-3">{parcel.deliveryAddress}</td>
                <td className={`p-3 ${getStatusColor(parcel.status)}`}>
                  {parcel.status}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleViewLocation(parcel.location)}
                    className="px-3 py-1 m-1 font-semibold rounded-md bg-cyan-600 text-white hover:bg-cyan-700"
                    disabled={parcel.status === "Delivered"}
                  >
                    View Location
                  </button>
                  <button
                    onClick={() => openModal(parcel._id, "Cancelled")}
                    className="px-3 py-1 m-1 font-semibold rounded-md bg-red-600 text-white hover:bg-red-700"
                    disabled={parcel.status === "Delivered"}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => openModal(parcel._id, "Delivered")}
                    className="px-3 py-1 m-1 font-semibold rounded-md bg-green-600 text-white hover:bg-green-700"
                    disabled={parcel.status === "Delivered"}
                  >
                    Deliver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
            <p className="mb-6">
              Are you sure you want to change the status to <strong>{modalData.newStatus}</strong>?
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 mr-2 font-semibold text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryList;
