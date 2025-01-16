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
      const parcelData = { ...data, price };

      // Make sure parcelData contains the correct user info
      parcelData.name = user?.displayName;
      parcelData.email = user?.email;

      console.log(parcelData); 
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
        <div>
          <label>Name</label>
          <input
            type="text"
            value={user?.displayName}
           
            readOnly
            className="block w-full p-2 border"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={user?.email}
           
            readOnly
            className="block w-full p-2 border"
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            {...register("phoneNumber", { required: "Phone number is required" })}
            className="block w-full p-2 border"
          />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
        </div>
        <div>
          <label>Parcel Type</label>
          <input
            type="text"
            {...register("parcelType", { required: "Parcel type is required" })}
            className="block w-full p-2 border"
          />
          {errors.parcelType && <p className="text-red-500">{errors.parcelType.message}</p>}
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
          {errors.parcelWeight && <p className="text-red-500">{errors.parcelWeight.message}</p>}
        </div>
        <div>
          <label>Receiver’s Name</label>
          <input
            type="text"
            {...register("receiverName", { required: "Receiver name is required" })}
            className="block w-full p-2 border"
          />
          {errors.receiverName && <p className="text-red-500">{errors.receiverName.message}</p>}
        </div>
        <div>
          <label>Receiver's Phone Number</label>
          <input
            type="text"
            {...register("receiverPhoneNumber", { required: "Receiver phone number is required" })}
            className="block w-full p-2 border"
          />
          {errors.receiverPhoneNumber && <p className="text-red-500">{errors.receiverPhoneNumber.message}</p>}
        </div>
        <div>
          <label>Parcel Delivery Address</label>
          <input
            type="text"
            {...register("deliveryAddress", { required: "Delivery address is required" })}
            className="block w-full p-2 border"
          />
          {errors.deliveryAddress && <p className="text-red-500">{errors.deliveryAddress.message}</p>}
        </div>
        <div>
          <label>Requested Delivery Date</label>
          <input
            type="date"
            {...register("requestedDeliveryDate", { required: "Delivery date is required" })}
            className="block w-full p-2 border"
          />
          {errors.requestedDeliveryDate && <p className="text-red-500">{errors.requestedDeliveryDate.message}</p>}
        </div>
        <div>
          <label>Delivery Address Latitude</label>
          <input
            type="text"
            {...register("deliveryAddressLatitude", {
              required: "Latitude is required",
              pattern: { value: /^-?\d+(\.\d+)?$/, message: "Enter a valid latitude" },
            })}
            className="block w-full p-2 border"
          />
          {errors.deliveryAddressLatitude && <p className="text-red-500">{errors.deliveryAddressLatitude.message}</p>}
        </div>
        <div>
          <label>Delivery Address Longitude</label>
          <input
            type="text"
            {...register("deliveryAddressLongitude", {
              required: "Longitude is required",
              pattern: { value: /^-?\d+(\.\d+)?$/, message: "Enter a valid longitude" },
            })}
            className="block w-full p-2 border"
          />
          {errors.deliveryAddressLongitude && <p className="text-red-500">{errors.deliveryAddressLongitude.message}</p>}
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            value={`${price} Tk`}
            readOnly
            className="block w-full p-2 border"
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
