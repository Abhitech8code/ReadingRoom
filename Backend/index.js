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

// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!MONGO_URI || !STRIPE_SECRET_KEY) {
  console.error("❌ Missing MONGO_URI or STRIPE_SECRET_KEY in environment variables.");
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
connectDB();

// API Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Stripe Route
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("❌ Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Root Route – fixes 404 error on base URL
app.get("/", (req, res) => {
  res.send("📚 Welcome to the Reading Room API!");
});

// Optional: Serve React build if hosting frontend together
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Uncomment below if frontend build is present
// app.use(express.static(path.join(__dirname, "client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
