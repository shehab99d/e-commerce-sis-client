import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../API/Axios";
import ShopSkeleton from "./ShopSkeleton";

// Category options
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

    // Fetch products whenever category changes
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const url = category ? `/products?category=${category}` : "/products";
                const res = await api.get(url);
                setProducts(res.data);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) {
        return <ShopSkeleton count={8} />;
    }

    return (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-10 py-16 md:py-32 bg-[#fff] mb-20">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20">
                <div className="space-y-4">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold">
                        The 2026 Collection
                    </p>
                    <h2
                        className="text-4xl md:text-6xl font-light text-gray-900 leading-tight"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Featured <span className="italic font-serif">Pieces</span>
                    </h2>
                </div>

                <button
                    onClick={() => navigate("/shop")}
                    className="mt-8 md:mt-0 group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-900 pb-1 w-fit transition-all duration-300 hover:gap-6"
                >
                    View all items
                    <span className="text-lg">→</span>
                </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-0 mb-20 md:mb-32 border-b border-gray-200">
                {CATEGORIES.map((cat) => {
                    const isActive = category.toLowerCase() === cat.value.toLowerCase();
                    return (
                        <button
                            key={cat.value}
                            onClick={() => setCategory(cat.value)}
                            className={`
                                relative px-5 py-3 text-[10px] tracking-[0.3em] uppercase font-bold
                                transition-colors duration-300
                                ${isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-700"}
                            `}
                        >
                            {cat.label}
                            <span
                                className={`
                                    absolute bottom-[-1px] left-0 h-[2px] bg-gray-900
                                    transition-all duration-300
                                    ${isActive ? "w-full" : "w-0"}
                                `}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gray-300 font-bold mb-4">
                        No pieces found
                    </p>
                    <p
                        className="text-2xl font-light text-gray-400"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Nothing in this category yet.
                    </p>
                </div>
            )}

            {/* Product Grid */}
            {products.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 md:gap-x-12 gap-y-16 md:gap-y-0">
                    {products.map((product, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={product._id}
                                onClick={() => navigate(`/shop/${product._id}`)}
                                className={`group cursor-pointer relative transition-all duration-700
                                    ${isEven ? "lg:col-span-5" : "lg:col-span-7 lg:translate-y-40"} 
                                    ${!isEven ? "mt-12 md:mt-0" : "mt-0"}
                                    ${index > 1 ? "lg:mt-64" : "lg:mt-0"}
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
                                            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                                        />
                                        {product.image2 && (
                                            <img
                                                src={product.image2}
                                                alt={product.title}
                                                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div
                                    className={`mt-6 flex flex-col ${
                                        !isEven ? "lg:items-end lg:text-right" : "text-left"
                                    }`}
                                >
                                    <h3
                                        className="text-sm md:text-lg font-medium text-gray-900 tracking-tight leading-tight"
                                        style={{ fontFamily: "'Georgia', serif" }}
                                    >
                                        {product.title}
                                    </h3>
                                    <div
                                        className={`flex flex-col mt-2 ${
                                            !isEven ? "lg:items-end" : "items-start"
                                        }`}
                                    >
                                        <p className="text-[9px] md:text-[10px] text-gray-400 tracking-[0.2em] uppercase mb-2">
                                            {Array.isArray(product.size)
                                                ? product.size.slice(0, 3).join(" / ")
                                                : product.size}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            ৳{product.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-900 mt-4 transition-all duration-500 w-0 group-hover:w-full max-w-[40px]" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Mobile CTA */}
            <div className="mt-24 flex justify-center lg:hidden">
                <button
                    onClick={() => navigate("/shop")}
                    className="px-12 py-4 border border-gray-900 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-gray-900 hover:text-white transition-all duration-500"
                >
                    Explore Full Gallery
                </button>
            </div>
        </section>
    );
};

export default Shop;