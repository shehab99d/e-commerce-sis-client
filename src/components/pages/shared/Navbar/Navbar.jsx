import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../../hook/useAuth";
import useRole from "../../../hook/useRole";
import { useCart } from "../../../../context/CartContext";
import Swal from "sweetalert2";
import { ShoppingCart, X, Trash2, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  const { user, logOut, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();
  const { cartItems, removeFromCart, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

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
  // Close cart dropdown on outside click
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!cartOpen) return;
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartOpen]);

  // ---------------------------------------------------------------------------
  // Sign out
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
  // Nav class helpers
  // ---------------------------------------------------------------------------
  const navClass = ({ isActive }) =>
    `relative py-2 transition-all duration-300 ease-in-out ${isActive
      ? "text-black font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
      : "text-gray-600 hover:text-black font-medium"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `rounded-lg px-4 py-2.5 transition-colors ${isActive
      ? "bg-gray-100 text-black font-semibold"
      : "text-gray-700 hover:bg-gray-50"
    }`;

  // ---------------------------------------------------------------------------
  // Nav links — single source of truth
  // ---------------------------------------------------------------------------
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
    { to: "/coverage", label: "Coverage" },
    { to: "/faq", label: "FAQ" },
  ];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100 py-3"
          : "bg-white py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ----------------------------------------------------------------
              LEFT — Mobile hamburger + Logo
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>

              {/* Mobile dropdown */}
              {menuOpen && (
                <ul className="menu menu-sm dropdown-content mt-3 z-[60] p-3 shadow-2xl bg-white rounded-2xl w-56 border border-gray-100 absolute left-0">
                  {navLinks.map(({ to, label }) => (
                    <li key={to}>
                      <NavLink to={to} className={mobileNavClass} onClick={() => setMenuOpen(false)}>
                        {label}
                      </NavLink>
                    </li>
                  ))}

                  {isAdmin && (
                    <li>
                      <NavLink to="/admin" className={mobileNavClass} onClick={() => setMenuOpen(false)}>
                        Admin
                      </NavLink>
                    </li>
                  )}

                  {isResolving && user && (
                    <li>
                      <div className="px-4 py-2.5">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </li>
                  )}

                  {user && (
                    <>
                      <div className="divider my-2" />
                      <li>
                        <button
                          onClick={() => { setMenuOpen(false); handleSignOut(); }}
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
              CENTER — Desktop nav
          ---------------------------------------------------------------- */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-8 text-sm tracking-wide">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className={navClass}>{label}</NavLink>
                </li>
              ))}

              {isAdmin && (
                <li>
                  <NavLink to="/admin" className={navClass}>Admin</NavLink>
                </li>
              )}

              {isResolving && user && (
                <li>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                </li>
              )}
            </ul>
          </div>

          {/* ----------------------------------------------------------------
              RIGHT — Cart icon + Auth actions
          ---------------------------------------------------------------- */}
          <div className="flex items-center gap-3">

            {/* ---- Cart Icon with badge ---- */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setCartOpen((prev) => !prev)}
                aria-label="Open cart"
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {/* Badge — only shown when cart has items */}
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-black text-white text-[10px] font-bold leading-none">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* ---- Cart dropdown panel ---- */}
              {cartOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[70] overflow-hidden">

                  {/* Panel header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <span className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
                      Cart
                      {cartCount > 0 && (
                        <span className="ml-2 text-xs font-normal text-gray-400">
                          ({cartCount} {cartCount === 1 ? "item" : "items"})
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Close cart"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>

                  {/* Empty state */}
                  {cartItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-14 px-5 text-center gap-3">
                      <ShoppingCart size={32} className="text-gray-200" />
                      <p className="text-sm text-gray-400">Your cart is empty</p>
                      <button
                        onClick={() => { setCartOpen(false); navigate("/shop"); }}
                        className="mt-2 text-xs font-bold uppercase tracking-widest border-b border-gray-900 text-gray-900 hover:opacity-60 transition-opacity"
                      >
                        Browse the shop
                      </button>
                    </div>
                  )}

                  {/* Cart item list */}
                  {cartItems.length > 0 && (
                    <>
                      <ul className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                        {cartItems.map((item) => (
                          <li key={item._id} className="flex items-center gap-3 px-5 py-3">
                            {/* Thumbnail */}
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <img
                                src={item.image1}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate" style={{ fontFamily: "'Georgia', serif" }}>
                                {item.title}
                              </p>
                              {item.size && (
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">
                                  {item.size}
                                </p>
                              )}
                              <p className="text-sm font-semibold text-gray-900 mt-0.5">
                                ৳{item.price?.toLocaleString()}
                              </p>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeFromCart(item._id)}
                              aria-label={`Remove ${item.title}`}
                              className="p-1.5 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                            >
                              <Trash2 size={15} />
                            </button>
                          </li>
                        ))}
                      </ul>

                      {/* Panel footer — total + checkout CTA */}
                      <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Total</span>
                          <span className="text-base font-semibold text-gray-900">
                            ৳{cartTotal.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => { setCartOpen(false); navigate("/cart"); }}
                          className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors active:scale-[0.98]"
                        >
                          View Cart & Checkout
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* ---- Auth area ---- */}
            {isResolving ? (
              <div className="w-24 h-9 rounded-full bg-gray-100 animate-pulse" />
            ) : !user ? (
              <NavLink
                to="/login"
                className="bg-black text-white px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium tracking-wide rounded-full hover:bg-gray-800 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
              >
                Join Us
              </NavLink>
            ) : (
              <div className="flex items-center gap-3">
                {/* Desktop: avatar chip + sign out */}
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

                {/* Mobile: avatar only */}
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