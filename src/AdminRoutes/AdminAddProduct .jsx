import React, { useState } from "react";
import api from "../API/Axios";
import { Upload, Plus } from "lucide-react";

const SIZES = ["S", "M", "L", "XL", "XXL"];

const AdminAddProduct = () => {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        size: [], // ⬅️ array
        image1: null,
        image2: null,
    });

    const [preview1, setPreview1] = useState(null);
    const [preview2, setPreview2] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const name = e.target.name;
        setProduct({ ...product, [name]: file });

        const reader = new FileReader();
        reader.onloadend = () => {
            name === "image1" ? setPreview1(reader.result) : setPreview2(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSizeToggle = (selectedSize) => {
        setProduct((prev) => ({
            ...prev,
            size: prev.size.includes(selectedSize)
                ? prev.size.filter((s) => s !== selectedSize)
                : [...prev.size, selectedSize],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("price", product.price);
        formData.append("size", JSON.stringify(product.size));
        formData.append("image1", product.image1);
        formData.append("image2", product.image2);

        try {
            const res = await api.post("/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
                alert("Product Added Successfully ✅");
                setProduct({
                    title: "",
                    price: "",
                    size: [],
                    image1: null,
                    image2: null,
                });
                setPreview1(null);
                setPreview2(null);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to add product ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900">
                        Create New Listing
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Fill in the details below to add a new product.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Left Column */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="text-lg font-semibold mb-4 text-slate-700">
                                    General Information
                                </h3>

                                <div className="space-y-4">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Product Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={product.title}
                                            onChange={handleChange}
                                            className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                                            required
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Price (BDT)
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={product.price}
                                            onChange={handleChange}
                                            className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                                            required
                                        />
                                    </div>

                                    {/* Sizes */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Available Sizes
                                        </label>

                                        <div className="flex flex-wrap gap-3">
                                            {SIZES.map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => handleSizeToggle(s)}
                                                    className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all
                                                        ${
                                                            product.size.includes(s)
                                                                ? "bg-black text-white border-black"
                                                                : "bg-white text-slate-700 border-slate-300 hover:border-black"
                                                        }
                                                    `}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="text-lg font-semibold mb-4 text-slate-700">
                                    Product Media
                                </h3>

                                <div className="grid gap-4">
                                    {/* Image 1 */}
                                    <div className="border-2 border-dashed rounded-2xl h-40 flex items-center justify-center">
                                        {preview1 ? (
                                            <img src={preview1} className="w-full h-full object-cover rounded-2xl" />
                                        ) : (
                                            <label className="cursor-pointer text-center">
                                                <Upload className="mx-auto text-slate-400" />
                                                <span className="text-xs text-slate-500">
                                                    Main Image
                                                </span>
                                                <input
                                                    type="file"
                                                    name="image1"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>

                                    {/* Image 2 */}
                                    <div className="border-2 border-dashed rounded-2xl h-40 flex items-center justify-center">
                                        {preview2 ? (
                                            <img src={preview2} className="w-full h-full object-cover rounded-2xl" />
                                        ) : (
                                            <label className="cursor-pointer text-center">
                                                <Plus className="mx-auto text-slate-400" />
                                                <span className="text-xs text-slate-500">
                                                    Secondary Image
                                                </span>
                                                <input
                                                    type="file"
                                                    name="image2"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-2xl font-bold text-white transition-all
                                    ${
                                        loading
                                            ? "bg-slate-400 cursor-not-allowed"
                                            : "bg-black hover:bg-slate-800"
                                    }
                                `}
                            >
                                {loading ? "Processing..." : "Publish Product"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAddProduct;
