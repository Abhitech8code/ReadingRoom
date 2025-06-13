import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Stripe public key
const stripePromise = loadStripe(
  "pk_test_51RYWK2PNZ4xOj1q0OzucHP1vTJxxUpafhnSGDfuDuLnpuNaqmjnNO3nqYkDgudcg8RTEzaPJdJuadpG1XMHXnrjX00r7I5ohMq"
);

function CheckoutForm({ book }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (book?.price) {
      axios
        .post("http://localhost:4000/api/create-payment-intent", {
          amount: book.price,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
          setLoading(false);
        })
        .catch((err) => {
          setErrorMsg("Failed to initialize payment.");
          setLoading(false);
        });
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setErrorMsg(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("✅ Payment successful!");
        navigate("/thank-you"); // You can create this route or redirect as needed
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
      {/* Book Details Card */}
      <div className="bg-white/80 dark:bg-slate-800/70 backdrop-blur-md border dark:border-slate-600 shadow-xl rounded-xl p-6 transition-all hover:scale-[1.02] duration-300">
        <img
          src={book.image}
          alt={book.name}
          className="h-60 w-full object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold text-emerald-600 mb-1">
          {book.name}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          {book.title}
        </p>
        <span className="inline-block bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-white px-3 py-1 rounded-full text-sm mb-2">
          {book.category}
        </span>
        <p className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">
          ${book.price}
        </p>
      </div>

      {/* Stripe Payment Form */}
      <div className="bg-white/80 dark:bg-slate-800/70 backdrop-blur-md border dark:border-slate-600 shadow-xl rounded-xl p-6 transition-all">
        <h2 className="text-xl font-semibold mb-4">Enter your card details</h2>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading Stripe...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": { color: "#a0aec0" },
                  },
                  invalid: { color: "#fa755a" },
                },
              }}
              className="p-3 border dark:border-slate-600 rounded-md bg-gray-100 dark:bg-slate-700"
            />

            {errorMsg && (
              <div className="text-red-600 font-medium text-sm">{errorMsg}</div>
            )}

            <button
              type="submit"
              disabled={!stripe || processing}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {processing ? "Processing Payment..." : "Pay Now $" + book.price}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function PaymentPage() {
  const { state } = useLocation();
  const book = state?.book;

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-red-600">
          ❌ No book data available.
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-emerald-50 dark:from-slate-900 dark:to-slate-800 py-10">
        <h1 className="text-center text-3xl font-bold text-emerald-600 dark:text-white mb-10">
          Secure Checkout
        </h1>
        <CheckoutForm book={book} />
      </div>
    </Elements>
  );
}
