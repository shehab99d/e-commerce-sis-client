import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../API/Axios";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products");
                setProducts(res.data);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-20 text-xl font-semibold">
                Loading products...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold mb-8">Featured Clothes</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="group bg-white rounded overflow-hidden border border-gray-200 cursor-pointer transition-transform hover:scale-105"
                        onClick={() => navigate(`/shop/${product._id}`)}
                    >
                        <div className="relative w-full h-72">
                            <img
                                src={product.image1}
                                alt={product.title}
                                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                            />
                            <img
                                src={product.image2}
                                alt={product.title}
                                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            />
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-lg">
                                {product.title}
                            </h3>
                            <p className="text-gray-700">
                                ৳ {product.price}
                            </p>
                            <p className="text-gray-500 text-sm">
                                Sizes: {Array.isArray(product.size) ? product.size.join(", ") : product.size}
                            </p>

                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-10">
                <button
                    onClick={() => navigate("/shop")}
                    className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                    View All
                </button>
            </div>
        </div>
    );
};

export default Shop;
