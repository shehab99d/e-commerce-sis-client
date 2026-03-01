import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../API/Axios";
import ShopSkeleton from "./ShopSkeleton";
import { ShoppingCart, Check, ArrowRight } from "lucide-react";
import { useCart } from "../../../context/CartContext";

const CATEGORIES = [
    { label: "All", value: "" },
    { label: "Bags", value: "bags" },
    { label: "Clothes", value: "cloths" },
];

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("");

    const navigate = useNavigate();
    const { addToCart, isInCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const url = category ? `/products?category=${category}` : "/products";
                const res = await api.get(url);
                setProducts(res.data);
            } catch (error) {
                console.error("Failed to load products", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]);

    return (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-10 py-16 md:py-32 bg-white mb-20">
            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
                <div className="space-y-4">
                    <p className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold">
                        Est. 2026 Collection
                    </p>
                    <h2
                        className="text-5xl md:text-7xl font-light text-gray-900 tracking-tight"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Featured <span className="italic">Pieces</span>
                    </h2>
                </div>

                <button
                    onClick={() => navigate("/shop")}
                    className="mt-10 md:mt-0 group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 border-b border-gray-900 pb-2 w-fit hover:gap-5 transition-all duration-300"
                >
                    View Gallery <ArrowRight size={14} />
                </button>
            </div>

            {/* --- Category Filter --- */}
            <div className="flex gap-8 mb-20 md:mb-32 overflow-x-auto no-scrollbar border-b border-gray-100">
                {CATEGORIES.map((cat) => {
                    const isActive = category === cat.value;
                    return (
                        <button
                            key={cat.value}
                            onClick={() => setCategory(cat.value)}
                            className={`relative pb-4 text-[11px] uppercase font-bold tracking-[0.2em] whitespace-nowrap transition-colors duration-300
                                ${isActive ? "text-gray-900" : "text-gray-300 hover:text-gray-600"}`}
                        >
                            {cat.label}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* --- Loading & Empty States --- */}
            {loading && <ShopSkeleton count={8} />}

            {!loading && products.length === 0 && (
                <div className="py-40 text-center">
                    <p className="text-gray-400 font-serif italic text-xl">
                        The collection is currently being curated.
                    </p>
                </div>
            )}

            {/* --- Asymmetric Staggered Grid --- */}
            {!loading && products.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 md:gap-x-16 gap-y-20 md:gap-y-0">
                    {products.map((product, index) => {
                        const isEven = index % 2 === 0;
                        const inCart = isInCart(product._id);

                        return (
                            <div
                                key={product._id}
                                onClick={() => navigate(`/shop/${product._id}`)}
                                className={`group relative cursor-pointer flex flex-col transition-all duration-1000
                                    ${isEven ? "lg:col-span-5" : "lg:col-span-7 lg:translate-y-48"} 
                                    ${!isEven ? "mt-16 md:mt-0" : "mt-0"}
                                    ${index > 1 ? "lg:mt-72" : "lg:mt-0"}
                                `}
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden bg-[#f9f9f9]">
                                    <div
                                        className="relative w-full overflow-hidden"
                                        style={{ aspectRatio: isEven ? "3/4" : "4/5" }}
                                    >
                                        <img
                                            src={product.image1}
                                            alt={product.title}
                                            className="absolute inset-0 w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 ease-in-out group-hover:scale-105"
                                        />

                                        {/* Cart Action Button — always visible */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!inCart) addToCart(product);
                                            }}
                                            disabled={inCart}
                                            className={`absolute bottom-4 right-4 z-10 p-3 rounded-full transition-all duration-500
                                                ${inCart
                                                    ? "bg-gray-900 text-white"
                                                    : "bg-white/80 backdrop-blur-md text-gray-900 hover:bg-gray-900 hover:text-white"
                                                }`}
                                        >
                                            {inCart ? <Check size={16} /> : <ShoppingCart size={16} />}
                                        </button>

                                        {/* Visual Depth Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className={`mt-8 flex flex-col ${!isEven ? 'lg:items-end lg:text-right' : 'text-left'}`}>
                                    <h3
                                        className="text-lg md:text-2xl font-light text-gray-900 leading-tight mb-2"
                                        style={{ fontFamily: "'Georgia', serif" }}
                                    >
                                        {product.title}
                                    </h3>

                                    <div className={`flex flex-col space-y-3 ${!isEven ? 'lg:items-end' : 'items-start'}`}>
                                        <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">
                                            {Array.isArray(product.size) ? product.size.join(" / ") : product.size}
                                        </p>

                                        <p className="text-sm font-bold text-gray-900">
                                            ৳{product.price.toLocaleString()}
                                        </p>

                                        {/* Hover Line Decoration */}
                                        <div className="h-[1px] bg-gray-900 transition-all duration-700 w-0 group-hover:w-12" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default Shop;