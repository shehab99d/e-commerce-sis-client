// Shop.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Temporary data (later will come from API)
const tempProducts = [
    {
        id: 1,
        title: "Bridal Saree",
        price: "৳ 17,700",
        size: "S, M, L, XL",
        image1: "https://i.ibb.co.com/ynLz64q7/saree-13.jpg",
        image2: "https://i.ibb.co.com/rK4zVVB5/c68fe61c-735d-420c-b611-dbe6ea2a0c9c.jpg",
    },
    {
        id: 2,
        title: "Three Piece",
        price: "৳ 1,799",
        size: "S, M, L, XL",
        image1: "https://i.ibb.co.com/PZ0NZrBB/images-q-tbn-ANd9-Gc-SKMTh-O9-Rg-ISay-R-Ic7gg-N3h0-QEi-CQu596-R8w-s.jpg",
        image2: "https://i.ibb.co.com/4n6VvYBJ/images-q-tbn-ANd9-Gc-TMPMVk-u45n-I3-T5-Bg5-AJwxqx8-CXm-JQ-UPHw-s.jpg",
    },
    {
        id: 3,
        title: "Aarong Cotton Three piece",
        price: "৳1,600",
        size: "S, M, L, XL",
        image1: "https://fashionbangla.xyz/wp-content/uploads/2024/05/WhatsApp-Image-2025-02-15-at-14.47.01_e1023a89.jpg",
        image2: "https://i.ibb.co.com/84N5XnVP/Whats-App-Image-2025-03-18-at-02-32-55-97656866.jpg",
    },
    {
        id: 4,
        title: "Dijon Color Designer Three piece Suit",
        price: "৳ 2,999",
        size: "S, M, L, XL",
        image1: "https://i.ibb.co.com/TDrw3wTm/vp-s-04.jpg",
        image2: "https://i.ibb.co.com/1WpC06P/3533-ROSSE.jpg",
    },
    {
        id: 4,
        title: "Dijon Color Designer Three piece Suit",
        price: "৳ 2,999",
        size: "S, M, L, XL",
        image1: "https://i.ibb.co.com/TDrw3wTm/vp-s-04.jpg",
        image2: "https://i.ibb.co.com/1WpC06P/3533-ROSSE.jpg",
    },
    // Add 3–4 more manually
];

const Shop = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Simulate API call
    useEffect(() => {
        setTimeout(() => {
            setProducts(tempProducts);
        }, 500);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold mb-8">Featured Clothes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group bg-white rounded overflow-hidden border border-gray-200 cursor-pointer transition-transform hover:scale-105"
                        onClick={() => navigate(`/shop/${product.id}`)}
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
                            <h3 className="font-semibold text-lg">{product.title}</h3>
                            <p className="text-gray-700">{product.price}</p>
                            <p className="text-gray-500 text-sm">Sizes: {product.size}</p>
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
