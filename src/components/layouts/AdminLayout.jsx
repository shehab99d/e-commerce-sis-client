import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    LayoutDashboard,
    PlusCircle,
    Settings,
    PencilLine,
    Image as ImageIcon,
    CreditCard,
    LogOut,
    Menu,
    X,
    User
} from "lucide-react";

const AdminLayout = () => {
    const [open, setOpen] = useState(false);

    const navItems = [
        { to: "/admin/add-product", label: "Add Product", icon: <PlusCircle size={20} /> },
        { to: "/admin/manage-products", label: "Manage Products", icon: <Settings size={20} /> },
        { to: "/admin/edit-product", label: "Edit Product", icon: <PencilLine size={20} /> },
        { to: "/admin/edit-banner", label: "Edit Banner", icon: <ImageIcon size={20} /> },
        { to: "/admin/edit-card", label: "Edit Card", icon: <CreditCard size={20} /> },
        { to: "/admin/manage-users", label: "Manage Users", icon: <User size={20} /> },
    ];

    return (
        <div className="min-h-screen flex bg-slate-50 text-slate-900">

            {/* ===== Mobile Overlay ===== */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/30 z-30 lg:hidden"
                />
            )}

            {/* ===== Sidebar ===== */}
            <aside
                className={`fixed lg:static z-40 inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col
                transform transition-transform duration-300
                ${open ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <LayoutDashboard className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-bold">AdminPro</span>
                    </div>

                    {/* Close button (mobile) */}
                    <button
                        className="lg:hidden"
                        onClick={() => setOpen(false)}
                    >
                        <X />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase px-4 mb-4">
                        Main Menu
                    </p>

                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition
                                ${isActive
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`
                            }
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Profile */}
                <div className="p-4 border-t">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                            <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center font-bold">
                                AD
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Admin User</p>
                                <p className="text-xs text-slate-500">Super Admin</p>
                            </div>
                        </div>
                        <LogOut className="text-slate-400 hover:text-red-500 cursor-pointer" size={18} />
                    </div>
                </div>
            </aside>

            {/* ===== Main Content ===== */}
            <main className="flex-1 flex flex-col">

                {/* Header */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        {/* Menu button */}
                        <button
                            onClick={() => setOpen(true)}
                            className="lg:hidden"
                        >
                            <Menu />
                        </button>

                        <h1 className="text-sm text-slate-500">
                            Dashboard / <span className="text-slate-900">Overview</span>
                        </h1>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="bg-white rounded-2xl border p-6 min-h-[80vh]">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
