import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { userDB } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      displayName: userDB?.displayName || "",
      email: userDB?.email || "",
      photoURL: userDB?.photoURL || "",
      role: userDB?.role || "",
      contact: userDB?.contact || "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/userupdate/${userDB._id}`,
        formData
      );
      toast.success("Profile updated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
      <form
        noValidate
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="container flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Personal Information</p>
            <p className="text-xs">
              Update your details and make sure your profile is up to date.
            </p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="displayName" className="text-sm">
                Display Name
              </label>
              <input
                id="displayName" readOnly
                type="text"
                {...register("displayName", { required: "Display name is required" })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.displayName && (
                <p className="text-red-500 text-sm">{errors.displayName.message}</p>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                readOnly
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="photoURL" className="text-sm">
                Photo URL
              </label>
              <input
                id="photoURL"
                type="text"
                {...register("photoURL", { required: "Photo URL is required" })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.photoURL && (
                <p className="text-red-500 text-sm">{errors.photoURL.message}</p>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="role" className="text-sm">
                Role
              </label>
              <input
                id="role"
                type="text" readOnly
                {...register("role", { required: "Role is required" })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="contact" className="text-sm">
                Contact Number
              </label>
              <input
                id="contact"
                type="text"
                {...register("contact", { required: "Contact number is required" })}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-cyan-600 dark:border-gray-300"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        <div className="col-span-full">
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-md hover:bg-cyan-700 focus:outline-none"
          >
            Update Profile
          </button>
        </div>
      </form>

      
    </section>
  );
};

export default Profile;
