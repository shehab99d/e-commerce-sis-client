import React, { useState } from "react";

const AdminAddProduct = () => {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        size: "",
        image1: null,
        image2: null,
    });

    const [preview1, setPreview1] = useState(null);
    const [preview2, setPreview2] = useState(null);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.name;

        setProduct({ ...product, [name]: file });

        if (name === "image1") {
            setPreview1(URL.createObjectURL(file));
        } else {
            setPreview2(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("price", product.price);
        formData.append("size", product.size);
        formData.append("image1", product.image1);
        formData.append("image2", product.image2);

        console.log("Form Ready", product);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-10">
                <h2 className="text-4xl font-bold mb-10 text-center">
                    Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Inputs */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-sm font-semibold">
                                Product Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={product.title}
                                onChange={handleChange}
                                placeholder="Bridal Saree"
                                className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">
                                Price
                            </label>
                            <input
                                type="text"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                placeholder="৳ 1,799"
                                className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-semibold">
                                Available Sizes
                            </label>
                            <input
                                type="text"
                                name="size"
                                value={product.size}
                                onChange={handleChange}
                                placeholder="S, M, L, XL"
                                className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="border-2 border-dashed rounded-xl p-6 text-center">
                            <p className="font-medium mb-3">
                                Front Image
                            </p>
                            <input
                                type="file"
                                name="image1"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image1"
                            />
                            <label
                                htmlFor="image1"
                                className="cursor-pointer inline-block bg-black text-white px-6 py-2 rounded-full"
                            >
                                Upload Image
                            </label>

                            {preview1 && (
                                <img
                                    src={preview1}
                                    className="mt-4 h-40 mx-auto rounded-lg object-cover"
                                    alt=""
                                />
                            )}
                        </div>

                        <div className="border-2 border-dashed rounded-xl p-6 text-center">
                            <p className="font-medium mb-3">
                                Hover Image
                            </p>
                            <input
                                type="file"
                                name="image2"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image2"
                            />
                            <label
                                htmlFor="image2"
                                className="cursor-pointer inline-block bg-black text-white px-6 py-2 rounded-full"
                            >
                                Upload Image
                            </label>

                            {preview2 && (
                                <img
                                    src={preview2}
                                    className="mt-4 h-40 mx-auto rounded-lg object-cover"
                                    alt=""
                                />
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="text-center pt-6">
                        <button
                            type="submit"
                            className="px-12 py-4 bg-black text-white text-lg rounded-full hover:scale-105 transition-transform"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAddProduct;
