import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
    ShoppingBag,
    MapPin,
    CreditCard,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Truck,
    Package,
} from "lucide-react";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { order } = location.state || {};

    // Form states
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation states
    const [errors, setErrors] = useState({});

    // Calculate delivery dates
    const getDeliveryDate = () => {
        const today = new Date();
        const deliveryDays = order.deliveryArea === "dhaka" ? 2 : 5; // Inside Dhaka: 2-3 days, Outside: 5 days
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + deliveryDays);

        return deliveryDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getDeliveryRange = () => {
        if (order.deliveryArea === "dhaka") {
            return "2-3 business days";
        } else {
            return "3-5 business days";
        }
    };

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">No Order Found</h2>
                    <p className="text-gray-600 mb-6">
                        It looks like you haven't selected any product yet. Please go back to the shop and choose your items.
                    </p>
                    <button
                        onClick={() => navigate("/shop")}
                        className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    // ✅ FIXED: Now accessing the correct properties from order
    const subtotal = order.subtotal || order.price * order.quantity;
    const deliveryCharge = order.totalDeliveryCharge || order.deliveryCharge * order.quantity;
    const totalPrice = order.total || subtotal + deliveryCharge;

    const validateForm = () => {
        const newErrors = {};

        if (!userName.trim()) newErrors.userName = "Name is required";
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }
        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{11}$/.test(phone.replace(/[\s-]/g, ""))) {
            newErrors.phone = "Phone number should be 11 digits";
        }
        if (!city.trim()) newErrors.city = "City is required";
        if (!address.trim()) newErrors.address = "Address is required";
        if (!zipCode.trim()) newErrors.zipCode = "ZIP code is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirmOrder = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        const templateParams = {
            user_name: userName,
            user_email: email,
            user_phone: phone,
            user_city: city,
            user_address: address,
            user_zip: zipCode,
            product_name: order.title,
            product_size: order.size,
            quantity: order.quantity,
            delivery_area: order.deliveryArea === "dhaka" ? "Inside Dhaka" : "Outside Dhaka",
            delivery_charge: deliveryCharge,
            subtotal: subtotal,
            total_price: totalPrice,
            expected_delivery: getDeliveryDate(),
            to_email: "shehabulislam429@gmail.com",
        };

        try {
            await emailjs.send(
                "service_2j0qrs4",
                "template_nocfclj",
                templateParams,
                "vNIE-RWOGoEdoVphR"
            );

            // Success feedback
            alert("✅ Order confirmed! You'll receive a confirmation email shortly.");
            navigate("/");
        } catch (err) {
            console.error("EmailJS Error:", err);
            alert("❌ Failed to send order. Please try again or contact support.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 mt-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-black mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Product
                    </button>
                    <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                        <ShoppingBag className="w-10 h-10" />
                        Checkout
                    </h1>
                    <p className="text-gray-600 mt-2">Complete your order in just a few steps</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left - Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleConfirmOrder} className="space-y-6">
                            {/* Personal Information */}
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Package className="w-6 h-6" />
                                    Personal Information
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={userName}
                                            onChange={(e) => {
                                                setUserName(e.target.value);
                                                setErrors({ ...errors, userName: "" });
                                            }}
                                            className={`w-full p-4 border-2 rounded-xl transition-all ${errors.userName
                                                    ? "border-red-500 focus:border-red-600"
                                                    : "border-gray-200 focus:border-black"
                                                } outline-none`}
                                        />
                                        {errors.userName && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.userName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="01XXXXXXXXX"
                                            value={phone}
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                                setErrors({ ...errors, phone: "" });
                                            }}
                                            className={`w-full p-4 border-2 rounded-xl transition-all ${errors.phone
                                                    ? "border-red-500 focus:border-red-600"
                                                    : "border-gray-200 focus:border-black"
                                                } outline-none`}
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setErrors({ ...errors, email: "" });
                                            }}
                                            className={`w-full p-4 border-2 rounded-xl transition-all ${errors.email
                                                    ? "border-red-500 focus:border-red-600"
                                                    : "border-gray-200 focus:border-black"
                                                } outline-none`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <MapPin className="w-6 h-6" />
                                    Shipping Address
                                </h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Dhaka, Chittagong, Sylhet"
                                                value={city}
                                                onChange={(e) => {
                                                    setCity(e.target.value);
                                                    setErrors({ ...errors, city: "" });
                                                }}
                                                className={`w-full p-4 border-2 rounded-xl transition-all ${errors.city
                                                        ? "border-red-500 focus:border-red-600"
                                                        : "border-gray-200 focus:border-black"
                                                    } outline-none`}
                                            />
                                            {errors.city && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errors.city}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                                Postal Code *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g., 1200"
                                                value={zipCode}
                                                onChange={(e) => {
                                                    setZipCode(e.target.value);
                                                    setErrors({ ...errors, zipCode: "" });
                                                }}
                                                className={`w-full p-4 border-2 rounded-xl transition-all ${errors.zipCode
                                                        ? "border-red-500 focus:border-red-600"
                                                        : "border-gray-200 focus:border-black"
                                                    } outline-none`}
                                            />
                                            {errors.zipCode && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errors.zipCode}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                                            Address *
                                        </label>
                                        <textarea
                                            placeholder="House/Flat no, Street, Area, Landmark"
                                            value={address}
                                            onChange={(e) => {
                                                setAddress(e.target.value);
                                                setErrors({ ...errors, address: "" });
                                            }}
                                            rows="3"
                                            className={`w-full p-4 border-2 rounded-xl transition-all resize-none ${errors.address
                                                    ? "border-red-500 focus:border-red-600"
                                                    : "border-gray-200 focus:border-black"
                                                } outline-none`}
                                        />
                                        {errors.address && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${isSubmitting
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-black to-gray-800 text-white shadow-2xl hover:shadow-3xl hover:scale-105"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-6 h-6" />
                                        Confirm Order • ৳ {totalPrice}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <CreditCard className="w-6 h-6" />
                                Order Summary
                            </h2>

                            {/* Product Details */}
                            <div className="mb-6 pb-6 border-b-2 border-gray-100">
                                <div className="flex gap-4 mb-4">
                                    <img
                                        src={order.image}
                                        alt={order.title}
                                        className="w-24 h-24 object-cover rounded-xl shadow-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-2">{order.title}</h3>
                                        <p className="text-sm text-gray-600">Size: <span className="font-semibold">{order.size}</span></p>
                                        <p className="text-sm text-gray-600">Qty: <span className="font-semibold">{order.quantity}</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-100">
                                <div className="flex justify-between text-gray-700">
                                    <span>Price per item:</span>
                                    <span className="font-semibold">৳ {order.price}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Quantity:</span>
                                    <span className="font-semibold">× {order.quantity}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal:</span>
                                    <span className="font-semibold">৳ {subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-4 h-4" />
                                        <span>Delivery ({order.deliveryArea === "dhaka" ? "Dhaka" : "Outside"}):</span>
                                    </div>
                                    <span className="font-semibold">৳ {deliveryCharge}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                                    <span className="text-3xl font-bold text-green-600">৳ {totalPrice}</span>
                                </div>
                            </div>

                            {/* Delivery Summary */}
                            <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-200">
                                <p className="text-sm text-blue-800 font-medium flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Cash on Delivery Available
                                </p>
                            </div>

                            {/* Delivery Timeline */}
                            <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200">
                                <div className="flex items-start gap-3">
                                    <Truck className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">Estimated Delivery</p>
                                        <p className="text-lg font-bold text-purple-700">{getDeliveryDate()}</p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            ({getDeliveryRange()})
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;