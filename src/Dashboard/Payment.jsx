import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router";

const stripePromise = loadStripe("pk_test_51QkAg8IbJyk7BjYs7cFelXvHnlT9PWEC8DOHvKoKIwcpihq6EEXZoS5u8sqO59P0D1YEGSfOEImDHT3VRHkpZ8Pa00ObHeIWew"); // Replace with your Stripe publishable key

const Payment = () => {
    const location = useLocation();
  const parcel = location.state?.parcel;

  if (!parcel) {
    return <div>No parcel details provided</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment for Parcel ID: {parcel._id}</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm parcel={parcel} />
      </Elements>
    </div>
  );
};

export default Payment;
