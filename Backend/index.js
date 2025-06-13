// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";

// Route imports (ensure these files exist and use relative paths correctly)
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// Validate required environment variables
if (!MONGO_URI || !STRIPE_SECRET_KEY) {
  console.error("❌ Missing MONGO_URI or STRIPE_SECRET_KEY in .env");
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

// Middleware
app.use(cors({
  origin: "https://readingroom-1.onrender.com", // Frontend origin
  credentials: true,
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Stripe Payment Route
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to paisa
      currency: "inr",
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ error: "Stripe payment failed" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("📚 Welcome to Reading Room backend API!");
});

// Catch-all 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
