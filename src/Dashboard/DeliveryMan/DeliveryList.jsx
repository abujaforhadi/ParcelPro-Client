import React, { useState, useEffect } from "react";
import axios from "axios";

const DeliveryList = ({ loggedInDeliveryManId }) => {
  const [parcels, setParcels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchParcels();
  }, [loggedInDeliveryManId]);

  const handleStatusChange = async (parcelId, newStatus) => {
    const confirmation = window.confirm(
      `Are you sure you want to change the status to ${newStatus}?`
    );
    if (!confirmation) return;

    try {
      setIsLoading(true);
      await axios.put(`http://localhost:3000/updateparcel/${parcelId}`, {
        status: newStatus,
      });

      setParcels((prevParcels) =>
        prevParcels.map((parcel) =>
          parcel._id === parcelId ? { ...parcel, status: newStatus } : parcel
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewLocation = (location) => {
    // Open the location in Google Maps or another service
    window.open(
      `https://www.google.com/maps?q=${location.lat},${location.lng}`,
      "_blank"
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
// console.log(parcels);
  return (
    <div>
      <h1>My Delivery List</h1>
      <table>
        <thead>
          <tr>
            <th>Booked User’s Name</th>
            <th>Receiver's Name</th>
            <th>Booked User’s Phone</th>
            <th>Requested Delivery Date</th>
            <th>Approximate Delivery Date</th>
            <th>Receiver's Phone</th>
            <th>Receiver's Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id} >
              <td>{parcel.name}</td>
              

              <td>{parcel.receiverName}</td>
              <td>{parcel.phoneNumber}</td>
              <td>{parcel.requestedDeliveryDate}</td>
              <td>{parcel.approximateDeliveryDate}</td>
              <td>{parcel.receiverPhoneNumber}</td>
              <td>{parcel.deliveryAddress}</td>
              <td>
                <button
                  onClick={() => handleViewLocation(parcel.location)}
                  className="view-location-btn"
                >
                  View Location
                </button>
                <button
                  onClick={() => handleStatusChange(parcel._id, "Cancelled")}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatusChange(parcel._id, "Delivered")}
                  className="deliver-btn"
                >
                  Deliver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList;
