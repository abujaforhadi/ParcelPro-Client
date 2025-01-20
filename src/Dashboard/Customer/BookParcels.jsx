import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const BookParcel = () => {
  const { user } = useContext(AuthContext);
  const [price, setPrice] = useState(50);
  const navigate = useNavigate();


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

      parcelData.name = user?.displayName;
      parcelData.email = user?.email;

      const response = await axios.post("https://parcelpro-server.vercel.app/bookparcel", parcelData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Parcel booked successfully!");
        setTimeout(() => navigate("/"), 2000);
        
      } else {
        toast.error(response.data.message || "Error booking parcel");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to book parcel");
    }
  };

  return (
    <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="container flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Personal Information</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="name" className="text-sm">Name</label>
              <input
                id="name"
                type="text"
                value={user?.displayName || "Rimon"}
                readOnly
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="email" className="text-sm">Email</label>
              <input
                id="email"
                type="email"
                value={user?.email || "rimon123.me@gmail.com"}
                readOnly
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="phoneNumber" className="text-sm">Phone Number</label>
              <input
                id="phoneNumber"
                type="text"
                {...register("phoneNumber", { required: "Phone number is required" })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="parcelType" className="text-sm">Parcel Type</label>
              <input
                id="parcelType"
                type="text"
                {...register("parcelType", { required: "Parcel type is required" })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.parcelType && <p className="text-red-500">{errors.parcelType.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="parcelWeight" className="text-sm">Parcel Weight (kg)</label>
              <input
                id="parcelWeight"
                type="number"
                {...register("parcelWeight", {
                  required: "Parcel weight is required",
                  min: { value: 1, message: "Minimum weight is 1 kg" },
                })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.parcelWeight && <p className="text-red-500">{errors.parcelWeight.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="receiverName" className="text-sm">Receiver’s Name</label>
              <input
                id="receiverName"
                type="text"
                {...register("receiverName", { required: "Receiver name is required" })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.receiverName && <p className="text-red-500">{errors.receiverName.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="receiverPhoneNumber" className="text-sm">Receiver's Phone Number</label>
              <input
                id="receiverPhoneNumber"
                type="text"
                {...register("receiverPhoneNumber", { required: "Receiver phone number is required" })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.receiverPhoneNumber && <p className="text-red-500">{errors.receiverPhoneNumber.message}</p>}
            </div>
            <div className="col-span-full">
              <label htmlFor="deliveryAddress" className="text-sm">Parcel Delivery Address</label>
              <input
                id="deliveryAddress"
                type="text"
                {...register("deliveryAddress", { required: "Delivery address is required" })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.deliveryAddress && <p className="text-red-500">{errors.deliveryAddress.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="requestedDeliveryDate" className="text-sm">Requested Delivery Date</label>
              <input
                id="requestedDeliveryDate"
                type="date"
                min={new Date().toISOString().split("T")[0]} // Set today's date as the minimum
                {...register("requestedDeliveryDate", { required: "Delivery date is required" })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.requestedDeliveryDate && <p className="text-red-500">{errors.requestedDeliveryDate.message}</p>}
            </div>

            <div className="col-span-full sm:col-span-3">
              <label htmlFor="deliveryAddressLatitude" className="text-sm">Delivery Address Latitude</label>
              <input
                id="deliveryAddressLatitude"
                type="text"
                {...register("deliveryAddressLatitude", {
                  required: "Latitude is required",
                  pattern: { value: /^-?\d+(\.\d+)?$/, message: "Enter a valid latitude" },
                })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.deliveryAddressLatitude && <p className="text-red-500">{errors.deliveryAddressLatitude.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="deliveryAddressLongitude" className="text-sm">Delivery Address Longitude</label>
              <input
                id="deliveryAddressLongitude"
                type="text"
                {...register("deliveryAddressLongitude", {
                  required: "Longitude is required",
                  pattern: { value: /^-?\d+(\.\d+)?$/, message: "Enter a valid longitude" },
                })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.deliveryAddressLongitude && <p className="text-red-500">{errors.deliveryAddressLongitude.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="price" className="text-sm">Price</label>
              <input
                id="price"
                type="text"
                value={`${price} Tk`}
                readOnly
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
            </div>
          </div>
        </fieldset>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Book
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default BookParcel;
