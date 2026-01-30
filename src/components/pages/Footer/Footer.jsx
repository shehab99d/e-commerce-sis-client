import React from 'react';
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 py-14">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Info */}
                    <div>
                        <h2 className="text-2xl font-bold tracking-wide">
                            Waziha's Butics
                        </h2>
                        <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                            Premium fashion boutique offering elegant and modern styles.
                            Designed for confidence, comfort, and class.
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Shop</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-white transition">New Arrivals</li>
                            <li className="hover:text-white transition">Women Collection</li>
                            <li className="hover:text-white transition">Best Sellers</li>
                            <li className="hover:text-white transition">Discounts</li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <NavLink to="/contact"><li className="hover:text-white transition">Contact Us</li></NavLink>
                            <li className="hover:text-white transition">Shipping Policy</li>
                            <li className="hover:text-white transition">Return & Refund</li>
                            <NavLink to="/faq"><li className="hover:text-white transition">FAQs</li></NavLink>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to get updates on new arrivals and special offers.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 bg-black border border-gray-600 text-sm text-white focus:outline-none"
                            />
                            <button className="px-4 py-2 border border-white text-sm hover:bg-white hover:text-black transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Waziha's Butics. All rights reserved.
                    </p>
                    <p className="mt-3 md:mt-0">
                        Designed with elegance & simplicity
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;