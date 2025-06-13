import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const dialogRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/user/login",
        userInfo
      );
      if (res.data) {
        toast.success("Logged in Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        // Close modal properly using ref
        if (dialogRef.current && dialogRef.current.open) {
          dialogRef.current.close();
        }

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <div>
      <dialog ref={dialogRef} id="my_modal_3" className="modal">
        <div className="modal-box relative rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-900 transform transition-all duration-300 scale-100 hover:scale-[1.01]">
          {/* Animated Background Image */}
          <div
            className="absolute inset-0 bg-center bg-cover opacity-20 animate-bgZoom"
            style={{ backgroundImage: "url('/book-hard.jpg')" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-black/25 dark:bg-black/50"
            aria-hidden="true"
          />

          <div className="relative z-10 p-6">
            {/* Working Close Button */}
            <button
              type="button"
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl z-20"
              aria-label="Close Login Modal"
            >
              ✕
            </button>

            {/* Title */}
            <h3 className="font-extrabold text-2xl text-center bg-gradient-to-r from-emerald-800 via-emerald-500 to-emerald-400 bg-clip-text text-transparent mb-5 drop-shadow-md">
              Welcome Back 📚
            </h3>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-md bg-white dark:bg-slate-800 dark:text-white"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-md bg-white dark:bg-slate-800 dark:text-white"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-emerald-700 shadow-md transition-transform duration-300 transform hover:scale-105"
                >
                  Login
                </button>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Not registered?{" "}
                  <Link
                    to="/signup"
                    className="text-emerald-600 underline hover:text-emerald-700"
                  >
                    Signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Background Zoom Animation */}
        <style>{`
          @keyframes bgZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
          }
          .animate-bgZoom {
            animation: bgZoom 30s ease-in-out infinite alternate;
          }
        `}</style>
      </dialog>
    </div>
  );
}

export default Login;
