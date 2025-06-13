import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 py-20 bg-white dark:bg-gray-950 transition-colors duration-300 text-gray-800 dark:text-gray-200 min-h-screen">
        {/* === Header Section === */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6 mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            About <span className="text-emerald-500">Us</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Welcome to <strong>BookVerse</strong> – your gateway to timeless
            knowledge, new adventures, and limitless imagination.
          </p>
        </motion.div>

        {/* === Info Grid === */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-semibold">
              📚 What We Do
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              At BookVerse, we believe in the power of reading to transform
              lives. Our mission is to provide a seamless and delightful online
              bookstore experience where readers can explore, discover, and
              purchase their favorite books from a wide range of genres.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Whether you're into classics, sci-fi, romance, or non-fiction –
              we’ve got something to spark your interest. Our platform features
              reviews, recommendations, author bios, and more to help you choose
              your next read with confidence.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <iframe
  src="https://lottie.host/embed/fd64b1b5-ce80-489c-8303-21be51bec040/4Z9Mo8ijM3.lottie"
  title="About us illustration"
  className="rounded-xl shadow-lg w-full h-[500px] object-contain bg-transparent"
  loading="lazy"
></iframe>

          </motion.div>
        </div>

        {/* === Mission Section === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-20 text-center space-y-5"
        >
          <h2 className="text-2xl md:text-3xl font-semibold">🌟 Our Mission</h2>
          <p className="max-w-4xl mx-auto text-base md:text-lg leading-relaxed">
            To cultivate a culture of curiosity and continuous learning by
            making books accessible to everyone, everywhere. We aim to empower
            readers, support authors, and build a community that celebrates the
            written word.
          </p>
        </motion.div>

        {/* === Call to Action === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="/course"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
          >
            Explore Our Collection
          </a>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default About;
