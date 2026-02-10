import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../API/Axios";

const ShopDetail = () => {
    const { id } = useParams(); // /shop/:id থেকে id নেবে
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Failed to load product", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center py-20 text-xl font-semibold">
                Loading product...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20 text-xl font-semibold text-red-500">
                Product not found!
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 my-36">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Images */}
                <div className="md:w-1/2 space-y-4">
                    <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-96 object-cover rounded-xl"
                    />
                    <img
                        src={product.image2 || product.image1}
                        alt={product.title}
                        className="w-full h-96 object-cover rounded-xl"
                    />
                </div>

                {/* Details */}
                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
                        <p className="text-2xl font-semibold text-gray-700 mb-4">
                            ৳ {product.price}
                        </p>
                        <p className="text-gray-500 mb-4">
                            Sizes: {Array.isArray(product.size) ? product.size.join(", ") : product.size}
                        </p>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            ac leo nunc. Vestibulum et mauris vel ante finibus maximus.
                        </p>
                    </div>

                    <button className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors w-full md:w-auto">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopDetail;
