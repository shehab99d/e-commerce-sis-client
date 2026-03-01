import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import Swal from "sweetalert2";

// ---------------------------------------------------------------------------
// Match these with your Checkout page's delivery logic
// ---------------------------------------------------------------------------
const DELIVERY_FEE_DHAKA   = 80;
const DELIVERY_FEE_OUTSIDE = 150;
const FREE_THRESHOLD       = 5000;

const Cart = () => {
    const { cartItems, removeFromCart, clearCart, cartCount, cartTotal } = useCart();
    const navigate = useNavigate();

    // Use Dhaka delivery fee as the default estimate shown in the summary
    const delivery       = cartTotal >= FREE_THRESHOLD ? 0 : DELIVERY_FEE_DHAKA;
    const isFreeShipping = cartTotal >= FREE_THRESHOLD;

    // -----------------------------------------------------------------------
    // Build the order object your Checkout page expects via location.state
    // and navigate there. Checkout reads: location.state.order
    // -----------------------------------------------------------------------
    const handleProceedToCheckout = () => {
        if (cartItems.length === 0) return;

        const order = {
            // Multi-item fields (for your own future use / backend)
            items:               cartItems,
            subtotal:            cartTotal,
            quantity:            cartCount,
            total:               cartTotal + delivery,
            totalDeliveryCharge: DELIVERY_FEE_DHAKA,
            deliveryCharge:      DELIVERY_FEE_DHAKA,
            deliveryArea:        "dhaka",               // Checkout lets user change this

            // Single-item fields that your current Checkout.jsx reads directly
            title:  cartItems.map((i) => i.title).join(", "),
            image:  cartItems[0]?.image1,
            price:  cartTotal,
            size:   cartItems.map((i) => i.size).filter(Boolean).join(", ") || "—",
        };

        navigate("/checkout", { state: { order } });
    };

    // -----------------------------------------------------------------------
    // Empty cart screen
    // -----------------------------------------------------------------------
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center pt-28 pb-20">
                <ShoppingBag size={48} className="text-gray-200 mb-6" strokeWidth={1.5} />
                <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold mb-3">
                    Your Bag
                </p>
                <h1
                    className="text-4xl font-light text-gray-900 mb-4"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    It's a little <span className="italic">empty</span>
                </h1>
                <p className="text-gray-400 text-sm mb-10">
                    Add something beautiful to get started.
                </p>
                <Link
                    to="/shop"
                    className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                    Browse the Shop
                </Link>
            </div>
        );
    }

    // -----------------------------------------------------------------------
    // Main cart page
    // -----------------------------------------------------------------------
    return (
        <div className="min-h-screen bg-white pt-28 pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Page header */}
                <div className="mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-widest font-bold hover:text-gray-700 transition-colors mb-6"
                    >
                        <ArrowLeft size={13} />
                        Continue Shopping
                    </button>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold">
                        Your Bag
                    </p>
                    <h1
                        className="text-4xl md:text-5xl font-light text-gray-900 mt-1"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Cart{" "}
                        <span className="italic text-gray-400 text-3xl md:text-4xl">
                            ({cartCount} {cartCount === 1 ? "item" : "items"})
                        </span>
                    </h1>
                </div>

                {/* Free shipping progress banner */}
                {!isFreeShipping ? (
                    <div className="mb-8 px-5 py-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between gap-4">
                        <p className="text-xs text-gray-600 flex-shrink-0">
                            Add{" "}
                            <span className="font-semibold text-gray-900">
                                ৳{(FREE_THRESHOLD - cartTotal).toLocaleString()}
                            </span>{" "}
                            more for free delivery
                        </p>
                        <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                            <div
                                className="h-full bg-gray-900 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((cartTotal / FREE_THRESHOLD) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="mb-8 px-5 py-3 bg-gray-900 rounded-xl flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-white" />
                        <p className="text-xs text-white font-medium">
                            You've unlocked free delivery!
                        </p>
                    </div>
                )}

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">

                    {/* ---- LEFT: Cart items ---- */}
                    <div>
                        <ul className="divide-y divide-gray-100">
                            {cartItems.map((item) => (
                                <li key={item._id} className="flex gap-5 py-7 group">

                                    {/* Thumbnail — click to product detail */}
                                    <div
                                        onClick={() => navigate(`/shop/${item._id}`)}
                                        className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
                                    >
                                        <img
                                            src={item.image1}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <h3
                                                className="text-base font-medium text-gray-900 leading-snug"
                                                style={{ fontFamily: "'Georgia', serif" }}
                                            >
                                                {item.title}
                                            </h3>
                                            {item.category && (
                                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">
                                                    {item.category}
                                                </p>
                                            )}
                                            {item.size && (
                                                <span className="inline-block mt-2 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-gray-500 bg-gray-100 rounded-full">
                                                    Size: {item.size}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-base font-semibold text-gray-900">
                                                ৳{item.price?.toLocaleString()}
                                            </p>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                aria-label={`Remove ${item.title}`}
                                                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={13} />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Clear all */}
                        <div className="pt-4 border-t border-gray-100">
                            <button
                                onClick={() =>
                                    Swal.fire({
                                        title: "Clear Cart?",
                                        text:  "This will remove all items from your cart.",
                                        icon:  "warning",
                                        showCancelButton:   true,
                                        confirmButtonColor: "#DC2626",
                                        cancelButtonColor:  "#6B7280",
                                        confirmButtonText:  "Yes, clear it",
                                        customClass: { popup: "rounded-2xl" },
                                    }).then((r) => r.isConfirmed && clearCart())
                                }
                                className="text-xs text-gray-400 hover:text-red-500 uppercase tracking-widest font-bold transition-colors"
                            >
                                Clear all items
                            </button>
                        </div>
                    </div>

                    {/* ---- RIGHT: Summary + CTA ---- */}
                    <div className="lg:sticky lg:top-28 space-y-6">

                        {/* Order summary card */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-5">
                                Order Summary
                            </h2>

                            {/* Per-item breakdown */}
                            <ul className="space-y-2 mb-5">
                                {cartItems.map((item) => (
                                    <li
                                        key={item._id}
                                        className="flex justify-between items-center text-sm"
                                    >
                                        <span className="text-gray-600 truncate max-w-[180px]">
                                            {item.title}
                                        </span>
                                        <span className="text-gray-900 font-medium ml-2 flex-shrink-0">
                                            ৳{item.price?.toLocaleString()}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="border-t border-gray-100 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-gray-900">৳{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm items-center">
                                    <span className="text-gray-500">Delivery</span>
                                    {isFreeShipping ? (
                                        <span className="text-gray-900 font-medium">Free</span>
                                    ) : (
                                        <span className="text-gray-400 text-xs">
                                            From ৳{DELIVERY_FEE_DHAKA} (set at checkout)
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-baseline">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-900">
                                    Total
                                </span>
                                <div className="text-right">
                                    <span className="text-xl font-semibold text-gray-900">
                                        ৳{cartTotal.toLocaleString()}
                                    </span>
                                    {!isFreeShipping && (
                                        <p className="text-[10px] text-gray-400 mt-0.5">
                                            + delivery
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ✅ THE button — navigates to your Checkout page */}
                        <button
                            onClick={handleProceedToCheckout}
                            className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors active:scale-[0.98] shadow-sm"
                        >
                            Proceed to Checkout
                            <ChevronRight size={14} />
                        </button>

                        <Link
                            to="/shop"
                            className="block text-center text-xs text-gray-400 hover:text-gray-700 uppercase tracking-widest transition-colors"
                        >
                            ← Continue Shopping
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;