import React from "react";

function Footer() {
  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/course" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  const socialLinks = [
    {
      href: "https://twitter.com",
      label: "Twitter",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.918 4.918 0 00-8.38 4.482A13.949 13.949 0 011.671 3.149a4.917 4.917 0 001.523 6.573 4.9 4.9 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.085 4.92 4.92 0 004.588 3.417A9.868 9.868 0 010 19.54a13.94 13.94 0 007.548 2.209c9.056 0 14.01-7.513 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
        </svg>
      ),
    },
    {
      href: "https://facebook.com",
      label: "Facebook",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.408.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.92.001c-1.505 0-1.796.715-1.796 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .593 23.408 0 22.675 0z" />
        </svg>
      ),
    },
    {
      href: "https://instagram.com",
      label: "Instagram",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 448 512"
          aria-hidden="true"
        >
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9-51.3-114.9-114.9-114.9zm0 190.6c-41.9 0-75.7-33.8-75.7-75.7s33.8-75.7 75.7-75.7 75.7 33.8 75.7 75.7-33.8 75.7-75.7 75.7zm146.4-194.3c0 14.9-12.1 27-27 27-14.9 0-27-12.1-27-27s12.1-27 27-27 27 12.1 27 27zm76.1 27.2c-.7-14.9-4-29.7-10.5-43.1-7.7-16.8-19.5-31.3-35.5-43.3-16-12-35-18.6-55.6-18.7-43.8-.2-88.6-.2-132.4 0-20.7 0-39.6 6.5-55.7 18.6-16 12.1-27.9 26.6-35.5 43.5-6.4 14.1-9.6 28.6-10.4 43.6-.7 14.3-.7 28.6-.7 42.9s0 28.6.7 42.9c.7 15 4 29.8 10.5 43.1 7.7 16.8 19.6 31.3 35.5 43.3 16 12 35 18.7 55.6 18.7 43.8.2 88.6.2 132.4 0 20.6 0 39.6-6.5 55.7-18.6 16-12 27.8-26.5 35.5-43.3 6.4-14.1 9.6-28.6 10.4-43.6.7-14.3.7-28.6.7-42.9s-.1-28.6-.8-42.9z" />
        </svg>
      ),
    },
    {
      href: "https://linkedin.com",
      label: "LinkedIn",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.786-1.75-1.75s.784-1.75 1.75-1.75 1.75.786 1.75 1.75-.783 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.966v5.701h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2 3.6 4.59v5.606z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white py-12 px-6 md:px-20">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Left - Logo + Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 max-w-sm">
          <div className="flex items-center gap-3 group cursor-pointer select-none">
            <img
              src="/reading-book.png"
              alt="ReadingRoom Logo"
              className="h-14 w-14 object-contain animate-pulse"
            />
            <span className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent tracking-tight select-none">
              ReadingRoom
            </span>
          </div>
          <p className="text-sm opacity-90 dark:opacity-70">
            Discover, learn, and immerse yourself in the world of books with
            ReadingRoom. Your go-to platform for quality courses and literature.
          </p>
        </div>

        {/* Middle - Quick Links */}
        <nav className="flex flex-col items-center md:items-start space-y-3 text-lg font-medium max-w-xs">
          <h3 className="mb-2 font-semibold text-white text-xl">Quick Links</h3>
          {footerLinks.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              className="relative group hover:text-white dark:hover:text-emerald-400 transition-colors duration-300"
            >
              {name}
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-emerald-300 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
          ))}
        </nav>

        {/* Right - Contact & Social */}
        <div className="flex flex-col items-center md:items-start space-y-8 max-w-xs">
          {/* Contact Section */}
          <div>
            <h3 className="mb-3 font-semibold text-white text-xl">
              Contact Me
            </h3>
            <ul className="space-y-2 text-sm opacity-90 dark:opacity-70">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-emerald-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12h.01M12 12h.01M8 12h.01M21 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2m18-4V7a2 2 0 00-2-2H5a2 2 0 00-2 2v5m18 0H3"
                  />
                </svg>
                <a href="mailto:support@gmail.com" className="hover:text-white">
                  support@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-emerald-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10l1.664-2.5a2 2 0 012.664-.5l2.498 1.75a2 2 0 011.072 1.721l.254 3.283a11.044 11.044 0 005.522 5.522l3.283.254a2 2 0 011.72 1.072l1.75 2.498a2 2 0 01-.5 2.664L14 21"
                  />
                </svg>
                <a href="tel:+919266839823" className="hover:text-white">
                  +91 9266839823
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div>
            <h3 className="mb-3 font-semibold text-white text-xl">
              Social Media
            </h3>
            <div className="flex space-x-6">
              {socialLinks.map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white hover:text-gray-300 dark:hover:text-emerald-400 transform hover:scale-125 transition duration-300"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 opacity-30 dark:opacity-20 my-8" />

      <p className="text-center text-sm opacity-80 dark:opacity-60 select-none">
        &copy; {new Date().getFullYear()} ReadingRoom. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
