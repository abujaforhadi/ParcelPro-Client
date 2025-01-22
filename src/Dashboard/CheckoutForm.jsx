import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import axios from "axios";

const CheckoutForm = ({ parcel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const { data: clientSecret } = await axios.post(
        "https://parcelpro-server.vercel.app/create-payment-intent",
        {
          amount: parcel.price,
          currency: "usd",
        }
      );

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Parcel Payment",
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        navigate("/dashboard/payment-success");
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Complete Your Payment</h2>
      <p className="text-gray-600 mb-4">
        You're paying for <span className="font-semibold">{parcel.parcelType}</span> 
        with a total of <span className="text-blue-600 font-semibold">${parcel.price}</span>.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border p-4 rounded-md">
          <CardElement className="p-2" />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full px-4 py-2 text-lg font-semibold rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors duration-300`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
