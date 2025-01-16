import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const [parcels, setParcels] = useState([]);
  const [filter, setFilter] = useState("all");

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

  const filteredParcels = filter === "all" ? parcels : parcels.filter(parcel => parcel.status === filter);

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

  return (
    <div>
      <h1>My Parcels</h1>
      <div>
        <label>Filter by Status: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="on the way">On The Way</option>
          <option value="delivered">Delivered</option>
          <option value="returned">Returned</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Parcel Type</th>
            <th>Requested Delivery Date</th>
            <th>Approx Delivery Date</th>
            <th>Booking Date</th>
            <th>Delivery Men ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParcels.map(parcel => (
            <tr key={parcel._id}>
              <td>{parcel.parcelType}</td>
              <td>{parcel.requestedDeliveryDate}</td>
              <td>{parcel.approxDeliveryDate || "N/A"}</td>
              <td>{new Date(parcel.bookingDate).toLocaleDateString()}</td>
              <td>{parcel.deliveryMenId || "N/A"}</td>
              <td>{parcel.status}</td>
              <td>
                {parcel.status === "pending" ? (
                  <>
                    <button onClick={() => handleCancel(parcel._id)}>Cancel</button>
                    <button>Update</button>
                  </>
                ) : (
                  <>
                    <button disabled>Cancel</button>
                    <button disabled>Update</button>
                  </>
                )}
                {parcel.status === "delivered" && <button>Review</button>}
                <button>Pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
