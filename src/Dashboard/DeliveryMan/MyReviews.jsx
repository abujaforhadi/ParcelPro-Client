import React, { useState, useEffect } from "react";
import axios from "axios";

const MyReviews = ({ loggedInDeliveryManId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/reviews");
        const deliveryManReviews = response.data.filter(
          (review) => review.deliveryManId === loggedInDeliveryManId
        );
        setReviews(deliveryManReviews);
      } catch (err) {
        setError("Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [loggedInDeliveryManId]);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
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
                  {new Date(review.date).toLocaleDateString()}
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
