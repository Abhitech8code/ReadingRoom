import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Message can't be empty";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      alert("Message sent successfully!");
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 py-12 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500">
        {/* === Header Section === */}
        <motion.div
          className="mt-28 text-center space-y-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            We'd love to{" "}
            <span className="text-emerald-500 animate-pulse">
              hear from you! 💬
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a question or feedback? Fill out the form below and we'll get
            back to you soon.
          </p>
          <Link to="/">
            <button className="bg-emerald-500 text-white px-6 py-3 rounded-full hover:bg-emerald-600 transition duration-300 shadow-md">
              ← Back to Home
            </button>
          </Link>
        </motion.div>

        {/* === Contact Form with Animation === */}
        <motion.div
          className="mt-16 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* === Form Section === */}
            <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Write your message here..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={submitted}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-md transition duration-300 disabled:opacity-50"
              >
                {submitted ? "Sending..." : "Send Message"}
              </motion.button>
            </form>

            {/* === Animation Section === */}
            <div className="w-full md:w-1/2">
              <iframe
                src="https://lottie.host/embed/4dbcdc0e-576e-408f-823b-c71a330b3090/Fds1cjdPSY.lottie"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "300px",
                  border: "none",
                }}
                title="Contact Animation"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
