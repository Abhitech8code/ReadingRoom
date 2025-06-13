fix and send complete server.js file , // server.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";

// Routes
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI; // 👈 match .env key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // move secret key to .env for safety

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI); // 👈 removed deprecated options
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
connectDB();

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Stripe Payment Route
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses the smallest currency unit
      currency: "inr",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
