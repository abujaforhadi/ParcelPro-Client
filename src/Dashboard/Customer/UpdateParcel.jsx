import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateParcel = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (state?.parcel) {
      const parcelData = state.parcel;
      Object.keys(parcelData).forEach((key) => setValue(key, parcelData[key]));
    }
  }, [state, setValue]);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.put(
        `https://parcelpro-server.vercel.app/updateparcels/${state.parcel._id}`,
        formData
      );

      if (response.status === 200) {
        toast.success("Parcel updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      toast.error("An error occurred while updating the parcel.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Update Parcel</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold">Parcel Type</label>
          <input
            type="text"
            {...register("parcelType", { required: "Parcel Type is required" })}
            className="w-full border p-2 rounded-md"
          />
          {errors.parcelType && (
            <p className="text-red-500 text-sm">{errors.parcelType.message}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold">Parcel Weight (kg)</label>
          <input
            type="number"
            {...register("parcelWeight", { required: "Parcel Weight is required" })}
            className="w-full border p-2 rounded-md"
            readOnly
          />
          {errors.parcelWeight && (
            <p className="text-red-500 text-sm">{errors.parcelWeight.message}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold">Requested Delivery Date</label>
          <input
            type="date"
            {...register("requestedDeliveryDate", {
              required: "Requested Delivery Date is required",
            })}
            className="w-full border p-2 rounded-md"
          />
          {errors.requestedDeliveryDate && (
            <p className="text-red-500 text-sm">
              {errors.requestedDeliveryDate.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-semibold">Delivery Address</label>
          <input
            type="text"
            {...register("deliveryAddress", {
              required: "Delivery Address is required",
            })}
            className="w-full border p-2 rounded-md"
          />
          {errors.deliveryAddress && (
            <p className="text-red-500 text-sm">{errors.deliveryAddress.message}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold">Receiver Name</label>
          <input
            type="text"
            {...register("receiverName", { required: "Receiver Name is required" })}
            className="w-full border p-2 rounded-md"
          />
          {errors.receiverName && (
            <p className="text-red-500 text-sm">{errors.receiverName.message}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold">Receiver Phone Number</label>
          <input
            type="text"
            {...register("receiverPhoneNumber", {
              required: "Receiver Phone Number is required",
            })}
            className="w-full border p-2 rounded-md"
          />
          {errors.receiverPhoneNumber && (
            <p className="text-red-500 text-sm">
              {errors.receiverPhoneNumber.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-semibold">Price (in BDT)</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full border p-2 rounded-md"
            readOnly
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update Parcel
        </button>
      </form>
    </div>
  );
};

export default UpdateParcel;
