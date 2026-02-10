import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../API/Axios"; // path ঠিক রাখো

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    /* ================= Fetch Products ================= */
    const fetchProducts = async () => {
        try {
            const res = await api.get("/products");
            setProducts(res.data);
            setLoading(false);
        } catch (error) {
            Swal.fire("Error", "Failed to load products", "error");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    /* ================= Delete Product ================= */
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await api.delete(`/products/${id}`);

                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Product deleted successfully.", "success");
                        fetchProducts();
                    } else {
                        Swal.fire("Error", "Product not deleted", "error");
                    }
                } catch (error) {
                    Swal.fire("Error", error.message, "error");
                }
            }
        });
    };

    /* ================= Update Product ================= */
    const handleUpdate = async (product) => {
        const { value: formValues } = await Swal.fire({
            title: "Update Product",
            html: `
        <input id="title" class="swal2-input" value="${product.title}">
        <input id="price" type="number" class="swal2-input" value="${product.price}">
      `,
            showCancelButton: true,
            confirmButtonText: "Update",
            preConfirm: () => {
                return {
                    title: document.getElementById("title").value,
                    price: document.getElementById("price").value,
                };
            },
        });

        if (formValues) {
            try {
                const res = await api.put(`/products/${product._id}`, {
                    title: formValues.title,
                    price: Number(formValues.price),
                    size: product.size,
                });

                if (res.data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Product updated successfully.", "success");
                    fetchProducts();
                } else {
                    Swal.fire("No Change", "Nothing was updated", "info");
                }
            } catch (error) {
                Swal.fire("Error", error.message, "error");
            }
        }
    };

    /* ================= UI ================= */
    if (loading) {
        return <p className="p-6">Loading products...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={product.image1}
                                        alt={product.title}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                <td>{product.title}</td>
                                <td>৳ {product.price}</td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => handleUpdate(product)}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {products.length === 0 && (
                    <p className="text-center mt-4 text-gray-500">
                        No products found
                    </p>
                )}
            </div>
        </div>
    );
};

export default ManageProduct;
