import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";

const BookParcel = () => {
  const { user } = useContext(AuthContext); 
  const [price, setPrice] = useState(50); 
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const parcelWeight = watch("parcelWeight", 1);

  React.useEffect(() => {
    const weight = parseFloat(parcelWeight);
    if (weight === 1) setPrice(50);
    else if (weight === 2) setPrice(100);
    else if (weight > 2) setPrice(150);
  }, [parcelWeight]);

  const onSubmit = async (data) => {
    try {
      const parcelData = { 
        ...data, 
        price, 
        name: user?.displayName, 
        email: user?.email 
      };

      const response = await axios.post("http://localhost:3000/bookparcel", parcelData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setMessage("Parcel booked successfully!");
      } else {
        setMessage(response.data.message || "Error booking parcel");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.message || "Failed to book parcel");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book a Parcel</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={user?.displayName || "Loading..."}
            readOnly
            className="block w-full p-2 border bg-gray-100 text-gray-700"
          />
        </div>
        
        {/* Email Field */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            value={user?.email || "Loading..."}
            readOnly
            className="block w-full p-2 border bg-gray-100 text-gray-700"
          />
        </div>
        
        {/* Additional Fields */}
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            {...register("phoneNumber", { required: "Phone number is required" })}
            className="block w-full p-2 border"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <label>Parcel Type</label>
          <input
            type="text"
            {...register("parcelType", { required: "Parcel type is required" })}
            className="block w-full p-2 border"
          />
          {errors.parcelType && (
            <p className="text-red-500">{errors.parcelType.message}</p>
          )}
        </div>

        <div>
          <label>Parcel Weight (kg)</label>
          <input
            type="number"
            {...register("parcelWeight", {
              required: "Parcel weight is required",
              min: { value: 1, message: "Minimum weight is 1 kg" },
            })}
            className="block w-full p-2 border"
          />
          {errors.parcelWeight && (
            <p className="text-red-500">{errors.parcelWeight.message}</p>
          )}
        </div>

        <div>
          <label>Price</label>
          <input
            type="text"
            value={`${price} Tk`}
            readOnly
            className="block w-full p-2 border bg-gray-100 text-gray-700"
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Book
        </button>
      </form>
    </div>
  );
};

export default BookParcel;
