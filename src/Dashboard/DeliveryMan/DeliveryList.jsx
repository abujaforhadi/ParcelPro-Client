import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "@/components/ui/table"; // Import custom Table component
import { Button } from "@/components/ui/button"; // ShadCN button component

const DeliveryList = () => {
  const { userDB } = useContext(AuthContext);
  const loggedInDeliveryManId = userDB._id;
  const [parcels, setParcels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://parcelpro-server.vercel.app/allparcels");
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
      await axios.put(`https://parcelpro-server.vercel.app/updateparcel/${parcelId}`, {
        status: newStatus,
        deliveryMenId: loggedInDeliveryManId,
      });

      // If status is "Delivered", increment parcelsDelivered
      if (newStatus === "Delivered") {
        await axios.patch(`https://parcelpro-server.vercel.app/userupdate/${userDB._id}`, {
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
      <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
        My Delivery List
      </h2>

      {/* Table Component with data and actions */}
      <Table>
        <thead>
          <tr className="text-sm font-medium text-gray-600 dark:text-gray-400">
            <th>Booked User’s Name</th>
            <th>Receiver's Name</th>
            <th>Booked User’s Phone</th>
            <th>Requested Delivery Date</th>
            <th>Approx. Delivery Date</th>
            <th>Receiver's Phone</th>
            <th>Receiver's Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id} className="text-sm text-gray-700 dark:text-gray-300">
              <td>{parcel.name}</td>
              <td>{parcel.receiverName}</td>
              <td>{parcel.phoneNumber}</td>
              <td>{parcel.requestedDeliveryDate}</td>
              <td>{parcel.approximateDeliveryDate}</td>
              <td>{parcel.receiverPhoneNumber}</td>
              <td>{parcel.deliveryAddress}</td>
              <td className={getStatusColor(parcel.status)}>{parcel.status}</td>
              <td className="space-x-2">
                <Button
                  onClick={() => handleViewLocation(parcel.location)}
                  disabled={parcel.status === "Delivered"}
                  variant="outline"
                  color="cyan"
                  size="sm"
                >
                  View Location
                </Button>
                <Button
                  onClick={() => openModal(parcel._id, "Cancelled")}
                  disabled={parcel.status === "Delivered"}
                  variant="destructive"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => openModal(parcel._id, "Delivered")}
                  disabled={parcel.status === "Delivered"}
                  variant="success"
                  size="sm"
                >
                  Deliver
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Action</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to change the status to <strong>{modalData.newStatus}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={closeModal}
                variant="outline"
                color="gray"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmStatusChange}
                variant="primary"
                size="sm"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryList;
