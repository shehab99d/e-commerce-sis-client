import React, { useEffect, useState } from "react";
import api from "../API/Axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // get all users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get("/users");
            setUsers(res.data.users);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to fetch users", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // handle actions with double confirmation
    const confirmAction = async (title, text, action) => {
        const result1 = await Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "Cancel",
        });

        if (result1.isConfirmed) {
            const result2 = await Swal.fire({
                title: "Are you really sure?",
                text: "This action cannot be undone!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, do it!",
                cancelButtonText: "Cancel",
            });

            if (result2.isConfirmed) {
                await action();
                Swal.fire("Success", "Action completed!", "success");
            }
        }
    };

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
            "Do you want to remove admin privileges?",
            async () => {
                await api.patch(`/users/remove-admin/${id}`);
                fetchUsers();
            }
        );
    };

    const handleRemoveUser = (id) => {
        confirmAction(
            "Remove User",
            "Do you want to remove this user?",
            async () => {
                await api.delete(`/users/${id}`);
                fetchUsers();
            }
        );
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Total Users: {users.length}</h2>

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
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name || "N/A"}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span
                                        className={`badge ${user.role === "admin" ? "badge-success" : "badge-info"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="space-x-2">
                                    {user.role === "admin" ? (
                                        <button
                                            onClick={() => handleRemoveAdmin(user._id)}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Remove Admin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user._id)}
                                            className="btn btn-success btn-sm"
                                        >
                                            Make Admin
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleRemoveUser(user._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
