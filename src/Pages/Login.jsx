import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const handleSignIn = (data) => {
    const { email, password } = data;
    setIsLoading(true);

    login(email, password)
      .then(() => {
        setIsLoading(false);
        navigate(location.state?.from?.pathname || "/");
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    loginWithGoogle()
      .then(() => {
        setIsLoading(false);
        navigate(location.state?.from?.pathname || "/");
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Google login failed. Try again later.");
      });
  };

  const autoFillCredentials = (email, password) => {
    setValue("email", email);
    setValue("password", password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-row w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:flex md:w-1/2 bg-blue-100 dark:bg-gray-700 items-center justify-center">
          <img src="/login.svg" alt="Sign In Illustration" className="w-3/4 h-auto object-contain" />
        </div>

        <div className="flex flex-col justify-center p-6 md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
            Welcome Back
          </h2>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-6">
          Login as
          </h2>
          <div className="flex gap-2 pb-2">
            <button onClick={() => autoFillCredentials("admin@gmail.com", "admin@gmail.com")}
              className="w-full px-4 py-2 text-white bg-[#6ba1ce]">
               Admin
            </button>
            <button onClick={() => autoFillCredentials("d@gmail.com", "d@gmail.com")}
              className="w-full px-4 py-2 text-white bg-[#6ba1ce]">
              DeliveryMan
            </button>
            <button onClick={() => autoFillCredentials("jafor@gmail.com", "jafor@gmail.com")}
              className="w-full px-4 py-2 text-white bg-[#6ba1ce]">
              User
            </button>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input id="email" type="email" {...register("email", { required: "Email is required" })} placeholder="someone@example.com"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-[#90caf9] focus:border-[#90caf9] dark:bg-gray-700 dark:text-gray-300" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input id="password" type="password" {...register("password", { required: "Password is required" })} placeholder="********"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-[#90caf9] focus:border-[#90caf9] dark:bg-gray-700 dark:text-gray-300" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#90caf9] disabled:opacity-50">
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="mt-6">
            <button onClick={handleGoogleLogin} disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50">
              Continue with Google
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don’t have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Auto Login Buttons */}
          
        </div>
      </div>
    </div>
  );
};

export default Login;
