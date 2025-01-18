import React, { useState, useEffect } from "react";
import axios from "axios";

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchParcelsAndDeliveryMen = async () => {
      try {
        setIsLoading(true);

        const [parcelsResponse, usersResponse] = await Promise.all([
          axios.get("http://localhost:3000/allparcels"),
          axios.get("http://localhost:3000/users"),
        ]);

        setParcels(parcelsResponse.data);
        setDeliveryMen(
          usersResponse.data.filter((user) => user.role === "deliveryman")
        );
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchParcelsAndDeliveryMen();
  }, []);

  const handleAssign = async (parcelId, deliveryManId) => {
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:3000/updateparcel/${parcelId}`, {
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
    } catch (err) {
      console.error("Error assigning delivery man:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/allparcels", {
        params: { startDate: searchStartDate, endDate: searchEndDate },
      });
      setParcels(response.data);
    } catch (err) {
      setError("Search failed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
            <th scope="col">User’s Name</th>
            <th scope="col">User’s Phone</th>
            <th scope="col">Booking Date</th>
            <th scope="col">Requested Delivery Date</th>
            <th scope="col">Cost</th>
            <th scope="col">Status</th>
            <th scope="col">Manage</th>
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
                <button onClick={() => setSelectedParcel(parcel)}>Manage</button>
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
            onChange={(e) =>
              setSelectedParcel({ ...selectedParcel, deliveryMenId: e.target.value })
            }
            value={selectedParcel.deliveryMenId || ""}
          >
            <option value="">Select a delivery man</option>
            {deliveryMen.map((man) => (
              <option key={man._id} value={man._id}>
                {man.displayName}
              </option>
            ))}
          </select>

          <label>Approximate Delivery Date:</label>
          <input
            type="date"
            value={deliveryDate}
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
