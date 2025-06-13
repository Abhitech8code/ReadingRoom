// index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI;
const stripe = new Stripe("sk_test_51RYWK2PNZ4xOj1q0L5vK8yyzX3ENZAEYqewSrP3WBSbK5fMgeGSXSEiXMeXKoxzszorxbiVxhwzjEOlsnSeIxS5900EU6yyb3q");

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
connectDB();

// API Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Stripe Payment
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
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

// 🚀 Redirect all other routes to your frontend URL
app.get("/", (req, res) => {
  res.redirect("https://readingroom-1.onrender.com" + req.originalUrl);
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
