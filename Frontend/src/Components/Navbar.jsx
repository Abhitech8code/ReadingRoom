import React, { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./logout";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [authUser] = useAuth();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [sticky, setSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const element = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      element.classList.add("dark");
      body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:4001/book");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("API error, fallback to empty:", error);
        setBooks([]);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFiltered([]);
      return;
    }
    const matches = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(matches);
  }, [searchTerm, books]);

  const handleResultClick = (bookId) => {
    setSearchTerm("");
    setFiltered([]);
    navigate(`/course#${bookId}`);
  };

  const navItems = ["Home", "Course", "Contact", "About"].map((item) => (
    <li key={item}>
      <a
        href={`/${item.toLowerCase()}`}
        className="transition hover:text-emerald-500 duration-300"
      >
        {item}
      </a>
    </li>
  ));

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        sticky
          ? "bg-white/90 shadow-md backdrop-blur-md dark:bg-gray-900/80"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 py-3 flex justify-between items-center">
        {/* Logo - Clickable to Home */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 group hover:scale-105 transition duration-300 cursor-pointer"
          title="Go to Home"
        >
          <div className="relative">
            <img
              src="/reading-book.png"
              alt="ReadingRoom Logo"
              className="h-12 w-12 object-contain animate-pulse"
            />
            <span className="absolute -inset-1 bg-emerald-300 opacity-20 blur-xl rounded-full group-hover:opacity-30"></span>
          </div>
          <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 bg-clip-text text-transparent tracking-tight">
            ReadingRoom
          </span>
        </div>

        {/* Nav Links */}
        <ul className="hidden lg:flex gap-8 text-base font-medium">
          {navItems}
        </ul>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4 relative">
          {/* Search Bar */}
          <div className="hidden md:flex flex-col items-start relative">
            <div className="flex items-center bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-full px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-emerald-400 transition">
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm dark:text-white placeholder-gray-400 focus:outline-none w-40"
              />
              <button className="text-emerald-500 hover:text-emerald-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M16.65 6.65a7 7 0 10-10 10"
                  />
                </svg>
              </button>
            </div>
            {/* Result dropdown */}
            {filtered.length > 0 && (
              <ul className="absolute top-12 left-0 w-64 max-h-64 overflow-y-auto bg-white dark:bg-gray-800 shadow-md rounded-md z-50">
                {filtered.map((book) => (
                  <li
                    key={book.id}
                    onClick={() => handleResultClick(book.id)}
                    className="px-4 py-2 hover:bg-emerald-100 dark:hover:bg-gray-700 cursor-pointer text-sm dark:text-white"
                  >
                    {book.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dark Mode */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-xl p-2 hover:bg-gray-200 dark:hover:bg-emerald-800 rounded-full transition"
          >
            {theme === "light" ? "☀️" : "🌙"}
          </button>

          {/* Login/Logout */}
          {authUser ? (
            <Logout />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Login
              <Login />
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-white rounded-box w-52 dark:bg-gray-800 dark:text-white"
          >
            {navItems}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
