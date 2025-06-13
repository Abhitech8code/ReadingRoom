import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname.trim(),
      email: data.email.trim(),
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/user/signup",
        userInfo
      );
      if (res.data) {
        toast.success("Signup Successful! Redirecting...");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setTimeout(() => navigate(from, { replace: true }), 1500);
      }
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    }
  };

  const password = watch("password") || "";
  const passwordStrength =
    password.length > 8 ? "strong" : password.length >= 5 ? "medium" : "weak";

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-40"
        onClick={() => navigate("/")}
        aria-label="Close Signup modal"
      ></div>

      {/* Modal Form */}
      <div
        className="fixed top-1/2 left-1/2 z-50 max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-10
          shadow-2xl backdrop-blur-md transform -translate-x-1/2 -translate-y-1/2
          transition-transform duration-300 hover:scale-[1.05] hover:shadow-emerald-400/50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          aria-label="Close Signup"
          className="absolute right-5 top-5 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-600 text-2xl font-bold"
          type="button"
        >
          &times;
        </button>

        {/* Title */}
        <h3
          id="signup-title"
          className="mb-8 text-center text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 drop-shadow-md"
        >
          Create Your Account
        </h3>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            error={errors.fullname}
            {...register("fullname", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
          />

          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter a secure password"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-emerald-400"
                } shadow-md dark:bg-slate-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 transition`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-600 transition"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
            {password && !errors.password && (
              <p
                className={`mt-1 text-sm ${
                  passwordStrength === "strong"
                    ? "text-emerald-600"
                    : passwordStrength === "medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Password strength: {passwordStrength}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg
                         hover:bg-emerald-600 disabled:bg-emerald-300 transition-transform duration-300 transform hover:scale-105"
            >
              {isSubmitting ? "Signing up..." : "Signup"}
            </button>

            <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
              Already have an account?{" "}
              <span
                className="text-emerald-600 underline cursor-pointer hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-600"
                onClick={() =>
                  document.getElementById("my_modal_3")?.showModal()
                }
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>

      {/* Include the Login modal */}
      <Login />
    </>
  );
}

function InputField({ label, error, ...props }) {
  return (
    <div>
      <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-lg border ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-emerald-400"
        } shadow-md dark:bg-slate-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 transition`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error.message || "This field is required"}
        </p>
      )}
    </div>
  );
}

export default Signup;
