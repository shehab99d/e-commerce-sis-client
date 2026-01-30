import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = ({ isActive }) =>
    `relative py-1 transition-all duration-300 ease-in-out ${isActive
      ? "text-black font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-black"
      : "text-gray-500 hover:text-black"
    }`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-2"
          : "bg-white py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-4 shadow-xl bg-white rounded-2xl w-64 gap-3 border border-gray-50">
              <li><NavLink to="/" className="text-base">Home</NavLink></li>
              <li><NavLink to="/about" className="text-base">About</NavLink></li>
              <li><NavLink to="/services" className="text-base">Services</NavLink></li>
              <li><NavLink to="/contact" className="text-base">Contact</NavLink></li>
            </ul>
          </div>

          <Link to="/" className="text-2xl font-bold tracking-tighter text-black flex items-center gap-1">
            WAZIHA<span className="font-light text-gray-400">/</span><span className="font-normal">BUTICS</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <ul className="flex gap-10 text-[13px] uppercase tracking-[0.15em] font-medium">
            <li><NavLink to="/" className={navClass}>Home</NavLink></li>
            <li><NavLink to="/about" className={navClass}>About</NavLink></li>
            <li><NavLink to="/services" className={navClass}>Services</NavLink></li>
            <li><NavLink to="/contact" className={navClass}>Contact</NavLink></li>
          </ul>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search or Cart icon could go here later */}
          <button className="hidden sm:block bg-black text-white px-6 py-2 text-xs uppercase tracking-widest rounded-full hover:bg-gray-800 transition-all active:scale-95">
            Join Us
          </button>

          {/* Mobile Join (Icon only or smaller button) */}
          <button className="sm:hidden btn btn-sm btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>

      </div>
      <hr className="my-2 opacity-30 lg:mx-72 md:mx-10 mx-3" />
    </nav>
  );
};

export default Navbar;