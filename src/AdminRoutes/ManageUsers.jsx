import React, { useEffect, useState } from "react";
import api from "../API/Axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [users, setUsers] = useState([]); // always array
    const [loading, setLoading] = useState(true);

    /* ================= FETCH USERS ================= */
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get("/users");

            // backend returns array directly
            setUsers(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to fetch users", "error");
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    /* ================= CONFIRM ACTION ================= */
    const confirmAction = async (title, text, action) => {
        const first = await Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!first.isConfirmed) return;

        const second = await Swal.fire({
            title: "Are you absolutely sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, do it",
            cancelButtonText: "Cancel",
        });

        if (second.isConfirmed) {
            await action();
            Swal.fire("Success", "Action completed successfully!", "success");
        }
    };

    /* ================= ACTIONS ================= */
    const handleMakeAdmin = (id) => {
        confirmAction(
            "Make Admin",
            "Do you want to make this user an admin?",
            async () => {
                await api.patch(`/users/admin/${id}`);
                fetchUsers();
            }
        );
    };

    const handleRemoveAdmin = (id) => {
        confirmAction(
            "Remove Admin",
            "Do you want to remove admin access?",
            async () => {
                await api.patch(`/users/remove-admin/${id}`);
                fetchUsers();
            }
        );
    };

    const handleRemoveUser = (id) => {
        confirmAction(
            "Remove User",
            "Do you want to permanently delete this user?",
            async () => {
                await api.delete(`/users/${id}`);
                fetchUsers();
            }
        );
    };

    /* ================= LOADING ================= */
    if (loading) {
        return <p className="text-center mt-10">Loading users...</p>;
    }

    /* ================= UI ================= */
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
                Total Users: {users.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name || user.firstName || "N/A"}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span
                                            className={`badge ${user.role === "admin"
                                                    ? "badge-success"
                                                    : "badge-info"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="space-x-2">
                                        {user.role === "admin" ? (
                                            <button
                                                onClick={() =>
                                                    handleRemoveAdmin(user._id)
                                                }
                                                className="btn btn-warning btn-sm"
                                            >
                                                Remove Admin
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleMakeAdmin(user._id)
                                                }
                                                className="btn btn-success btn-sm"
                                            >
                                                Make Admin
                                            </button>
                                        )}

                                        <button
                                            onClick={() =>
                                                handleRemoveUser(user._id)
                                            }
                                            className="btn btn-error btn-sm"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;