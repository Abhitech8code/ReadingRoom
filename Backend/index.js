// index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";

// Import routes
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

// Load environment variables
dotenv.config();

// App setup
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// Validate env variables
if (!MONGO_URI || !STRIPE_SECRET_KEY) {
  console.error("❌ Missing MONGO_URI or STRIPE_SECRET_KEY in .env");
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

// Middleware
app.use(cors({ origin: "https://readingroom-1.onrender.com" }));
app.use(express.json());

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
connectDB();

// API routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Stripe payment route
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to paisa
      currency: "inr",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("❌ Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Root route - redirect to frontend
app.get("/", (req, res) => {
  res.redirect("https://readingroom-1.onrender.com");
});

// Catch-all route
app.use("*", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
