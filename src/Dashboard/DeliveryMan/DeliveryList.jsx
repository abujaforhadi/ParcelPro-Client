import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Table } from "@/components/ui/table"; 
import { Button } from "@/components/ui/button"; 
import Loading from "@/Components/Loading";

const DeliveryList = () => {
  const { userDB } = useContext(AuthContext);
  const loggedInDeliveryManId = userDB._id;
  const [parcels, setParcels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 23.8103, // Default latitude (e.g., Dhaka)
    longitude: 90.4125, // Default longitude
    zoom: 10,
    width: "100%",
    height: "300px",
  });

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

  const handleViewLocation = (location) => {
    setViewport({
      ...viewport,
      latitude: location.lat,
      longitude: location.lng,
    });
    setModalData({ type: "map", location });
  };

  const closeModal = () => {
    setModalData(null);
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

  if (isLoading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
        My Delivery List
      </h2>

      <Table>
        <thead>
          <tr className="text-sm font-medium text-gray-600 dark:text-gray-400">
            <th>Booked User’s Name</th>
            <th>Receiver's Name</th>
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
              <td>{parcel.receiverPhoneNumber}</td>
              <td>{parcel.deliveryAddress}</td>
              <td className={getStatusColor(parcel.status)}>{parcel.status}</td>
              <td>
                <Button
                  onClick={() => handleViewLocation(parcel.location)}
                  variant="outline"
                  size="sm"
                >
                  View Location
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      {modalData?.type === "map" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Parcel Location</h3>
            <div className="w-full h-64">
              <MapGL
                {...viewport}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
              >
                <Marker
                  latitude={modalData.location.lat}
                  longitude={modalData.location.lng}
                >
                  <div className="text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-geo-alt-fill"
                      viewBox="0 0 16 16"
                      width="24"
                      height="24"
                    >
                      <path d="M8 0a5.53 5.53 0 0 1 5.5 5.5C13.5 9.292 8 16 8 16S2.5 9.292 2.5 5.5A5.53 5.53 0 0 1 8 0zm0 7.5A2 2 0 1 0 8 3a2 2 0 0 0 0 4.5z" />
                    </svg>
                  </div>
                </Marker>
              </MapGL>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={closeModal} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryList;
