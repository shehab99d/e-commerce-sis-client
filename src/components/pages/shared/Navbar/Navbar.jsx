import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../../hook/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.dropdown')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  const navClass = ({ isActive }) =>
    `relative py-2 transition-all duration-300 ease-in-out ${isActive
      ? "text-black font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
      : "text-gray-600 hover:text-black font-medium"
    }`;

  const handleSignOut = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "You will be logged out from your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Cancel",
      buttonsStyling: true,
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'px-6 py-2.5 rounded-lg',
        cancelButton: 'px-6 py-2.5 rounded-lg'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Signed Out!",
              text: "You have successfully signed out.",
              icon: "success",
              confirmButtonColor: "#000000",
              confirmButtonText: "OK",
              customClass: {
                popup: 'rounded-2xl',
                confirmButton: 'px-6 py-2.5 rounded-lg'
              }
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
              confirmButtonColor: "#DC2626",
              customClass: {
                popup: 'rounded-2xl'
              }
            });
          });
      }
    });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100 py-3"
        : "bg-white py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <div className="dropdown lg:hidden">
              <button
                className="btn btn-ghost btn-circle hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {/* Mobile Dropdown Menu */}
              {menuOpen && (
                <ul className="menu menu-sm dropdown-content mt-3 z-[60] p-3 shadow-2xl bg-white rounded-2xl w-56 border border-gray-100 absolute left-0 animate-in fade-in slide-in-from-top-2 duration-200">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `rounded-lg px-4 py-2.5 transition-colors ${isActive
                          ? "bg-gray-100 text-black font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/shop"
                      className={({ isActive }) =>
                        `rounded-lg px-4 py-2.5 transition-colors ${isActive
                          ? "bg-gray-100 text-black font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Shop
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `rounded-lg px-4 py-2.5 transition-colors ${isActive
                          ? "bg-gray-100 text-black font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/services"
                      className={({ isActive }) =>
                        `rounded-lg px-4 py-2.5 transition-colors ${isActive
                          ? "bg-gray-100 text-black font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Services
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `rounded-lg px-4 py-2.5 transition-colors ${isActive
                          ? "bg-gray-100 text-black font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/coverage"
                      className={({ isActive }) =>
                        `rounded-lg px-4 py-2.5 transition-colors ${isActive
                          ? "bg-gray-100 text-black font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Coverage
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/faq"
                      className={({ isActive }) =>
                        `rounded-lg px-4 py-2.5 transition-colors ${isActive
                          ? "bg-gray-100 text-black font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      FAQ
                    </NavLink>
                  </li>

                  {/* Mobile Sign Out */}
                  {user && (
                    <>
                      <div className="divider my-2"></div>
                      <li>
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            handleSignOut();
                          }}
                          className="text-red-600 hover:bg-red-50 rounded-lg px-4 py-2.5 w-full text-left font-medium transition-colors"
                        >
                          Sign Out
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>

            {/* Logo */}
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold tracking-tight text-black flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <span className="tracking-tighter">WAZIHA'S</span>
              <span className="font-light text-gray-300">/</span>
              <span className="font-semibold tracking-wide">BUTICS</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-8 text-sm tracking-wide">
              <li>
                <NavLink to="/" className={navClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={navClass}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navClass}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className={navClass}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navClass}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/coverage" className={navClass}>
                  Coverage
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={navClass}>
                  FAQ
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center gap-3">
            {!user ? (
              <NavLink
                to="/login"
                className="bg-black text-white px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium tracking-wide rounded-full hover:bg-gray-800 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
              >
                Join Us
              </NavLink>
            ) : (
              <div className="flex items-center gap-3">
                {/* User Avatar & Sign Out (Desktop) */}
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-full pl-1 pr-4 py-1 border border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                      {user.email[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                      {user.email.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                  >
                    Sign Out
                  </button>
                </div>

                {/* User Avatar Only (Mobile) */}
                <div className="sm:hidden">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-semibold shadow-md border-2 border-white">
                    {user.email[0].toUpperCase()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="mt-4 sm:mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-black to-transparent"></div>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;