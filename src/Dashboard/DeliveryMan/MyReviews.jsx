import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";

const MyReviews = () => {
  const { userDB } = useContext(AuthContext); // Access userDB context value
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(userDB._id);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        // Use 'deliveryManId' to query the backend for reviews of the logged-in user
        const response = await axios.get("http://localhost:3000/myreviews", {
          params: { deliveryManId: userDB._id }, // Sending deliveryManId instead of id
        });
        setReviews(response.data); // Store the reviews in the state
      } catch (err) {
        setError("Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userDB._id) {
      fetchReviews(); // Fetch reviews only if userDB._id exists
    }
  }, [userDB]); // Re-run effect if userDB changes

  // Handle loading state
  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  // Handle error state
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Reviews</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <div className="flex items-center mb-4">
              <img
                src={review.giverImage || "/default-avatar.png"} 
                alt={review.giverName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{review.giverName}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()} {/* Format the date */}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <p className="mb-2">
                <span className="font-semibold">Rating:</span>{" "}
                <span className="text-yellow-500 font-bold">
                  {review.rating} / 5
                </span>
              </p>
              <p className="line-clamp-3">{review.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
