// server.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectDB() {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}
connectDB();

// API Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Stripe Payment Route
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // smallest currency unit
      currency: "inr",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Serve Frontend (React/Vite build output)
const frontendPath = path.join(__dirname, "../frontend/dist"); // adjust if using CRA -> ../frontend/build
app.use(express.static(frontendPath));

// Root route fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
