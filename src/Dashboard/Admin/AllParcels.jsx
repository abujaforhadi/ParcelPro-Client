import React, { useState, useEffect } from "react";
import axios from "axios";

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  useEffect(() => {
    // Fetch parcels data
    axios.get("http://localhost:3000/allparcels").then((response) => {
      setParcels(response.data);
    });

    // Fetch delivery men
    axios.get("http://localhost:3000/deliverymen").then((response) => {
      setDeliveryMen(response.data);
    });
  }, []);

  const handleAssign = (parcelId, deliveryManId) => {
    axios
      .put(`http://localhost:3000/updateparcel/${parcelId}`, {
        status: "On The Way",
        deliveryMenId: deliveryManId,
        approximateDeliveryDate: deliveryDate,
      })
      .then((response) => {
        setParcels(
          parcels.map((parcel) =>
            parcel._id === parcelId
              ? { ...parcel, status: "On The Way", deliveryMenId, approximateDeliveryDate: deliveryDate }
              : parcel
          )
        );
      })
      .catch((error) => {
        console.error("Error assigning delivery man:", error);
      });
  };

  const handleSearch = () => {
    axios
      .get("http://localhost:3000/allparcels", {
        params: {
          startDate: searchStartDate,
          endDate: searchEndDate,
        },
      })
      .then((response) => {
        setParcels(response.data);
      });
  };

  return (
    <div>
      <h1>All Parcels</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="date"
          value={searchStartDate}
          onChange={(e) => setSearchStartDate(e.target.value)}
        />
        <input
          type="date"
          value={searchEndDate}
          onChange={(e) => setSearchEndDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Table to display parcels */}
      <table>
        <thead>
          <tr>
            <th>User’s Name</th>
            <th>User’s Phone</th>
            <th>Booking Date</th>
            <th>Requested Delivery Date</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id}>
              <td>{parcel.name}</td>
              <td>{parcel.phoneNumber}</td>
              <td>{parcel.bookingDate}</td>
              <td>{parcel.requestedDeliveryDate}</td>
              <td>{parcel.price} Tk</td>
              <td>{parcel.status}</td>
              <td>
                <button
                  onClick={() => setSelectedParcel(parcel)}
                  data-modal-target="parcel-modal"
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to assign delivery man */}
      {selectedParcel && (
        <div className="modal">
          <h2>Manage Parcel</h2>
          <label>Delivery Man:</label>
          <select
            onChange={(e) => setSelectedParcel({ ...selectedParcel, deliveryMenId: e.target.value })}
          >
            {deliveryMen.map((man) => (
              <option key={man._id} value={man._id}>
                {man.name}
              </option>
            ))}
          </select>

          <label>Approximate Delivery Date:</label>
          <input
            type="date"
            onChange={(e) => setDeliveryDate(e.target.value)}
          />

          <button
            onClick={() =>
              handleAssign(selectedParcel._id, selectedParcel.deliveryMenId)
            }
          >
            Assign
          </button>

          <button onClick={() => setSelectedParcel(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AllParcels;
