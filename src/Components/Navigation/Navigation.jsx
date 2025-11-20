import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Define links in an array for cleaner code management
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/productfromapi", label: "API Products" }, // Renamed for better UI
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  // Helper class for link styling
  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold px-3 py-2 rounded-md text-sm transition-colors"
      : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 font-medium px-3 py-2 rounded-md text-sm transition-colors";

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 1. Logo Section */}
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                AuthApp
              </span>
            </NavLink>
          </div>

          {/* 2. Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={getLinkClass}>
                {link.label}
              </NavLink>
            ))}

            {/* Login Button (Styled differently as a Call-to-Action) */}
            <NavLink to="/Login">
              <button className="ml-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5">
                Sign In
              </button>
            </NavLink>
          </div>

          {/* 3. Mobile Menu Button (Hamburger) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                // Hamburger Icon
                <svg
                  className="block h-6 w-6"
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
              ) : (
                // Close (X) Icon
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className="md:hidden bg-white border-t border-slate-100"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)} // Close menu when link clicked
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50"
                    : "block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/Login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 px-5 py-3 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign In
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
