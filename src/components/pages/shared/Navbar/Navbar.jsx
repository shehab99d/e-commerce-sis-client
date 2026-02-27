import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../../hook/useAuth";
import useRole from "../../../hook/useRole";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logOut, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  // True while Firebase OR role fetch is still resolving
  const isResolving = authLoading || roleLoading;
  const isAdmin = !isResolving && role === "admin";

  // ---------------------------------------------------------------------------
  // Scroll effect
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---------------------------------------------------------------------------
  // Close mobile menu on outside click
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar-dropdown")) setMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  // ---------------------------------------------------------------------------
  // Sign out handler
  // ---------------------------------------------------------------------------
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
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "px-6 py-2.5 rounded-lg",
        cancelButton: "px-6 py-2.5 rounded-lg",
      },
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
                popup: "rounded-2xl",
                confirmButton: "px-6 py-2.5 rounded-lg",
              },
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
              confirmButtonColor: "#DC2626",
              customClass: { popup: "rounded-2xl" },
            });
          });
      }
    });
  };

  // ---------------------------------------------------------------------------
  // Nav link class helper
  // ---------------------------------------------------------------------------
  const navClass = ({ isActive }) =>
    `relative py-2 transition-all duration-300 ease-in-out ${
      isActive
        ? "text-black font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
        : "text-gray-600 hover:text-black font-medium"
    }`;

  // Mobile nav link class helper
  const mobileNavClass = ({ isActive }) =>
    `rounded-lg px-4 py-2.5 transition-colors ${
      isActive
        ? "bg-gray-100 text-black font-semibold"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  // ---------------------------------------------------------------------------
  // Shared nav links list — single source of truth, no duplication
  // ---------------------------------------------------------------------------
  const navLinks = [
    { to: "/",         label: "Home"     },
    { to: "/shop",     label: "Shop"     },
    { to: "/about",    label: "About"    },
    { to: "/services", label: "Services" },
    { to: "/contact",  label: "Contact"  },
    { to: "/coverage", label: "Coverage" },
    { to: "/faq",      label: "FAQ"      },
  ];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100 py-3"
          : "bg-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ----------------------------------------------------------------
              LEFT — Mobile menu toggle + Logo
          ---------------------------------------------------------------- */}
          <div className="flex items-center gap-3">

            {/* Mobile hamburger */}
            <div className="navbar-dropdown lg:hidden">
              <button
                className="btn btn-ghost btn-circle hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* ---- Mobile dropdown ---- */}
              {menuOpen && (
                <ul className="menu menu-sm dropdown-content mt-3 z-[60] p-3 shadow-2xl bg-white rounded-2xl w-56 border border-gray-100 absolute left-0">
                  {navLinks.map(({ to, label }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        className={mobileNavClass}
                        onClick={() => setMenuOpen(false)}
                      >
                        {label}
                      </NavLink>
                    </li>
                  ))}

                  {/* Admin link — only when fully resolved */}
                  {isAdmin && (
                    <li>
                      <NavLink
                        to="/admin"
                        className={mobileNavClass}
                        onClick={() => setMenuOpen(false)}
                      >
                        Admin
                      </NavLink>
                    </li>
                  )}

                  {/* Skeleton placeholder while resolving so layout doesn't jump */}
                  {isResolving && user && (
                    <li>
                      <div className="px-4 py-2.5">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </li>
                  )}

                  {/* Sign out */}
                  {user && (
                    <>
                      <div className="divider my-2" />
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
              <span className="font-semibold tracking-wide">BOUTIQUE</span>
            </Link>
          </div>

          {/* ----------------------------------------------------------------
              CENTER — Desktop navigation
          ---------------------------------------------------------------- */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-8 text-sm tracking-wide">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className={navClass}>
                    {label}
                  </NavLink>
                </li>
              ))}

              {/* Admin link — only when fully resolved */}
              {isAdmin && (
                <li>
                  <NavLink to="/admin" className={navClass}>
                    Admin
                  </NavLink>
                </li>
              )}

              {/* Skeleton while resolving (only shown if logged in) */}
              {isResolving && user && (
                <li>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                </li>
              )}
            </ul>
          </div>

          {/* ----------------------------------------------------------------
              RIGHT — Auth actions
          ---------------------------------------------------------------- */}
          <div className="flex items-center gap-3">

            {/* While Firebase is still initialising, show a neutral skeleton
                so the layout doesn't shift or flash "Join Us" for a logged-in user */}
            {isResolving ? (
              <div className="w-24 h-9 rounded-full bg-gray-100 animate-pulse" />
            ) : !user ? (
              /* Logged out */
              <NavLink
                to="/login"
                className="bg-black text-white px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium tracking-wide rounded-full hover:bg-gray-800 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
              >
                Join Us
              </NavLink>
            ) : (
              /* Logged in */
              <div className="flex items-center gap-3">

                {/* Desktop: avatar chip + sign out button */}
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-full pl-1 pr-4 py-1 border border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                      {user.email[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                      {user.email.split("@")[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Mobile: avatar only (sign out is inside the hamburger menu) */}
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

      {/* Bottom gradient rule */}
      <div className="mt-4 sm:mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-black to-transparent" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;