import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import { useForm } from "react-hook-form";

const Registration = () => {
  const navigate = useNavigate();
  const { createNewUser, ProfileUpdate, loginWithGoogle } = useContext(AuthContext);

  const [error, setError] = useState("");
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => navigate("/"))
      .catch(() => setError("Google login failed. Try again later."));
  };

  const handleSignUp = async (data) => {
    const { name, photo, email, password } = data;

    try {
      await createNewUser(email, password, name, photo);
      await ProfileUpdate(name, photo);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  dark:bg-gray-900">
      <div className="flex flex-row w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* SVG Section */}
        <div className="hidden md:flex md:w-1/2 bg-blue-100 dark:bg-gray-700 items-center justify-center">
          <img
            src="/Signup.svg"
            alt="Sign Up Illustration"
            className="w-3/4 h-auto object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center p-6 md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
            Create Your Account
          </h2>
          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="someone@example.com"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                {...register("email", { 
                  required: "Email is required", 
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Please enter a valid email"
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                {...register("password", { 
                  required: "Password is required", 
                  minLength: { value: 6, message: "Password must be at least 6 characters long" }
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Photo URL
              </label>
              <input
                id="photo"
                name="photo"
                type="url"
                placeholder="Photo URL"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                {...register("photo")}
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Continue with Google
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
