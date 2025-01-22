import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";
import Loading from "@/Components/Loading";

const MyReviews = () => {
  const { userDB } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userDB?._id) {
        setError("User ID not found.");
        return;
      }

      try {
        setIsLoading(true);
        setReviews([]);
        setError(null);

        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in.");
          return;
        }

        const response = await axios.get("https://parcelpro-server.vercel.app/myreviews", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { deliveryManId: userDB._id },
        });

        setReviews(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [userDB?._id]);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-200 border"
            >
              <div className="flex justify-between p-4">
                <div className="flex space-x-4">
                  <img
                    src={review.giverImage || "/default-avatar.png"}
                    alt={review.giverName || "Anonymous"}
                    onError={(e) => { e.target.src = "/default-avatar.png"; }}
                    className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
                  />
                  <div>
                    <h4 className="font-bold">{review.giverName || "Anonymous"}</h4>
                    <span className="text-xs dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 dark:text-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="..." />
                  </svg>
                  <span className="text-xl font-bold">{review.rating}</span>
                </div>
              </div>
              <div className="p-4 space-y-2 text-sm dark:text-gray-300">
                <p>{review.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
