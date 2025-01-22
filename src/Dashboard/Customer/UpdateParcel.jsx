import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"; // Adjust import path based on your project structure
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const UpdateParcel = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      parcelType: "",
      parcelWeight: "",
      requestedDeliveryDate: "",
      deliveryAddress: "",
      receiverName: "",
      receiverPhoneNumber: "",
      price: "",
    },
  });

  useEffect(() => {
    if (state?.parcel) {
      form.reset(state.parcel);
    }
  }, [state, form]);

  const onSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please log in.", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      const response = await axios.put(
        `https://parcelpro-server.vercel.app/updateparcels/${state.parcel._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Parcel updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the parcel.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Update Parcel</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="parcelType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parcel Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter parcel type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="parcelWeight"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parcel Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter parcel weight" readOnly {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="requestedDeliveryDate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requested Delivery Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="deliveryAddress"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter delivery address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="receiverName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter receiver name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="receiverPhoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter receiver phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (in BDT)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" readOnly {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Update Parcel
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateParcel;
