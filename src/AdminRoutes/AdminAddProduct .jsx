import React, { useState } from "react";
import api from "../API/Axios";
import { ExternalLink, Upload, Check, Loader2, ImageOff, Eye } from "lucide-react";

const SIZES = ["S", "M", "L", "XL", "XXL"];
const CATEGORIES = ["cloths", "bags"];

const AdminAddProduct = () => {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        size: [],
        image1: "",
        image2: "",
    });

    const [loading, setLoading] = useState(false);
    const [previewHover, setPreviewHover] = useState(false);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
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
        try {
            const res = await api.post("/products", product);
            if (res.data.success) {
                alert("✅ Product Added Successfully");
                setProduct({
                    title: "",
                    price: "",
                    description: "",
                    category: "",
                    size: [],
                    image1: "",
                    image2: "",
                });
            }
        } catch (error) {
            console.error(error);
            alert("❌ Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    const activeImage = previewHover && product.image2 ? product.image2 : product.image1;
    const hasImage = product.image1 || product.image2;

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-[#F7F5F2]">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

                .field-input {
                    width: 100%;
                    background: #fff;
                    border: 1px solid #E8E4DF;
                    padding: 12px 16px;
                    font-size: 13.5px;
                    color: #1a1a1a;
                    font-family: 'DM Sans', sans-serif;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    outline: none;
                    border-radius: 2px;
                }
                .field-input::placeholder { color: #C5BEB6; }
                .field-input:focus {
                    border-color: #8B7355;
                    box-shadow: 0 0 0 3px rgba(139,115,85,0.08);
                }
                select.field-input { cursor: pointer; appearance: none; }

                .size-btn {
                    width: 44px; height: 44px;
                    font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
                    border: 1px solid #E8E4DF; background: #fff; color: #9E9387;
                    cursor: pointer; transition: all 0.2s; border-radius: 2px;
                    display: flex; align-items: center; justify-content: center;
                }
                .size-btn:hover { border-color: #8B7355; color: #8B7355; }
                .size-btn.active { background: #1a1a1a; border-color: #1a1a1a; color: #fff; }

                .label-tag {
                    font-size: 9.5px; font-weight: 600; letter-spacing: 0.35em;
                    text-transform: uppercase; color: #9E9387;
                    display: block; margin-bottom: 8px;
                }

                .image-preview-card {
                    position: relative; overflow: hidden; background: #EDE9E3;
                    border-radius: 3px; aspect-ratio: 3/4;
                    display: flex; align-items: center; justify-content: center;
                    border: 1px solid #E0DAD3;
                }
                .image-preview-card img {
                    width: 100%; height: 100%; object-fit: cover;
                    transition: opacity 0.4s ease;
                }
                .preview-badge {
                    position: absolute; bottom: 10px; left: 10px;
                    background: rgba(26,26,26,0.75); color: #fff; backdrop-filter: blur(6px);
                    font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
                    font-weight: 600; padding: 4px 10px; border-radius: 1px;
                }
                .hover-swap-btn {
                    position: absolute; top: 10px; right: 10px;
                    background: #fff; border: 1px solid #E8E4DF;
                    padding: 6px 10px; font-size: 9px; letter-spacing: 0.2em;
                    text-transform: uppercase; font-weight: 600; color: #6B6259;
                    cursor: pointer; border-radius: 2px; display: flex; align-items: center; gap: 5px;
                    transition: all 0.2s;
                }
                .hover-swap-btn:hover { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
                .hover-swap-btn.on { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }

                .empty-preview {
                    display: flex; flex-direction: column; align-items: center; gap: 12px;
                }
                .empty-preview span {
                    font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
                    color: #C5BEB6; font-weight: 500;
                }

                .submit-btn {
                    width: 100%; padding: 15px;
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                    font-size: 10px; font-weight: 700; letter-spacing: 0.35em; text-transform: uppercase;
                    border: none; cursor: pointer; border-radius: 2px;
                    transition: background 0.3s, transform 0.15s;
                    font-family: 'DM Sans', sans-serif;
                }
                .submit-btn:not(:disabled):hover { transform: translateY(-1px); }
                .submit-btn:not(:disabled):active { transform: translateY(0); }
                .submit-btn:disabled { background: #E8E4DF; color: #B0A89E; cursor: not-allowed; }
                .submit-btn:not(:disabled) { background: #1a1a1a; color: #fff; }

                .section-divider {
                    height: 1px; background: linear-gradient(to right, #E0DAD3, transparent);
                    margin: 4px 0;
                }

                .imgbb-bar {
                    display: flex; align-items: center; justify-content: space-between;
                    background: #fff; border: 1px solid #E8E4DF; padding: 11px 16px; border-radius: 2px;
                }
            `}</style>

            <div className="max-w-5xl mx-auto px-6 py-14">

                {/* Header */}
                <div className="mb-12">
                    <p style={{ fontSize: "9.5px", letterSpacing: "0.4em", color: "#9E9387", fontWeight: 600, textTransform: "uppercase", marginBottom: "10px" }}>
                        Admin · Product Management
                    </p>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,54px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, marginBottom: "18px" }}>
                        Add New <em>Piece</em>
                    </h1>
                    <div style={{ width: "40px", height: "2px", background: "#8B7355" }} />
                </div>

                {/* Two-column layout */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "48px", alignItems: "start" }}>

                    {/* LEFT — Form */}
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                        {/* Title */}
                        <div>
                            <label className="label-tag">Product Title</label>
                            <input type="text" name="title" value={product.title} onChange={handleChange}
                                placeholder="e.g. Oversized Linen Shirt" className="field-input" required />
                        </div>

                        {/* Price + Category */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                            <div>
                                <label className="label-tag">Price (BDT)</label>
                                <input type="number" name="price" value={product.price} onChange={handleChange}
                                    placeholder="2500" className="field-input" required />
                            </div>
                            <div>
                                <label className="label-tag">Category</label>
                                <select name="category" value={product.category} onChange={handleChange}
                                    className="field-input" required>
                                    <option value="">Select</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="label-tag">Description</label>
                            <textarea name="description" value={product.description} onChange={handleChange}
                                rows="4" placeholder="Describe the product..."
                                className="field-input" style={{ resize: "none" }} required />
                        </div>

                        {/* Sizes */}
                        <div>
                            <label className="label-tag">Available Sizes</label>
                            <div style={{ display: "flex", gap: "8px" }}>
                                {SIZES.map((s) => {
                                    const active = product.size.includes(s);
                                    return (
                                        <button type="button" key={s} onClick={() => handleSizeToggle(s)}
                                            className={`size-btn ${active ? "active" : ""}`}>
                                            {active ? <Check size={12} strokeWidth={3} /> : s}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="section-divider" />

                        {/* Images */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            <label className="label-tag">Image URLs</label>

                            <div>
                                <p style={{ fontSize: "9.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C5BEB6", fontWeight: 600, marginBottom: "6px" }}>
                                    Main Image <span style={{ color: "#8B7355" }}>*</span>
                                </p>
                                <input type="url" name="image1" value={product.image1} onChange={handleChange}
                                    placeholder="https://i.ibb.co/..." className="field-input" required />
                            </div>

                            <div>
                                <p style={{ fontSize: "9.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C5BEB6", fontWeight: 600, marginBottom: "6px" }}>
                                    Hover Image <span style={{ color: "#C5BEB6" }}>(optional)</span>
                                </p>
                                <input type="url" name="image2" value={product.image2} onChange={handleChange}
                                    placeholder="https://i.ibb.co/..." className="field-input" />
                            </div>

                            <div className="imgbb-bar">
                                <p style={{ fontSize: "9.5px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B0A89E", fontWeight: 600 }}>
                                    Upload via imgbb
                                </p>
                                <a href="https://imgbb.com/" target="_blank" rel="noreferrer"
                                    style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "9.5px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "#1a1a1a", textDecoration: "none" }}>
                                    Open imgbb <ExternalLink size={10} />
                                </a>
                            </div>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={loading} className="submit-btn">
                            {loading ? (
                                <><Loader2 size={14} className="animate-spin" /> Publishing...</>
                            ) : (
                                <><Upload size={13} /> Publish Product</>
                            )}
                        </button>

                    </form>

                    {/* RIGHT — Live Preview */}
                    <div style={{ position: "sticky", top: "24px" }}>
                        <label className="label-tag" style={{ marginBottom: "14px" }}>Live Preview</label>

                        {/* Image card */}
                        <div className="image-preview-card">
                            {activeImage ? (
                                <>
                                    <img src={activeImage} alt="Preview" onError={(e) => { e.target.style.display = "none"; }} />
                                    {product.image2 && (
                                        <button
                                            type="button"
                                            className={`hover-swap-btn ${previewHover ? "on" : ""}`}
                                            onClick={() => setPreviewHover(!previewHover)}
                                        >
                                            <Eye size={10} />
                                            {previewHover ? "Main" : "Hover"}
                                        </button>
                                    )}
                                    <span className="preview-badge">
                                        {previewHover && product.image2 ? "Hover view" : "Main view"}
                                    </span>
                                </>
                            ) : (
                                <div className="empty-preview">
                                    <ImageOff size={28} color="#C5BEB6" strokeWidth={1.5} />
                                    <span>No image yet</span>
                                </div>
                            )}
                        </div>

                        {/* Product meta preview */}
                        <div style={{ marginTop: "20px", padding: "18px", background: "#fff", border: "1px solid #E8E4DF", borderRadius: "2px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                                <div>
                                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 400, color: "#1a1a1a", lineHeight: 1.2 }}>
                                        {product.title || <span style={{ color: "#C5BEB6", fontStyle: "italic" }}>Product name</span>}
                                    </p>
                                    {product.category && (
                                        <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#9E9387", fontWeight: 600, marginTop: "4px" }}>
                                            {product.category}
                                        </p>
                                    )}
                                </div>
                                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "#8B7355", fontWeight: 600, whiteSpace: "nowrap" }}>
                                    {product.price ? `৳ ${Number(product.price).toLocaleString()}` : <span style={{ color: "#C5BEB6", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>—</span>}
                                </p>
                            </div>

                            {product.size.length > 0 && (
                                <div style={{ display: "flex", gap: "6px", marginBottom: "10px", flexWrap: "wrap" }}>
                                    {product.size.map((s) => (
                                        <span key={s} style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "#6B6259", background: "#F7F5F2", border: "1px solid #E8E4DF", padding: "3px 8px", borderRadius: "1px" }}>
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {product.description && (
                                <p style={{ fontSize: "12px", color: "#6B6259", lineHeight: 1.65, marginTop: "6px", borderTop: "1px solid #F0EBE5", paddingTop: "10px" }}>
                                    {product.description.length > 120 ? product.description.slice(0, 120) + "…" : product.description}
                                </p>
                            )}

                            {!product.title && !product.description && !product.price && (
                                <p style={{ fontSize: "11px", color: "#C5BEB6", fontStyle: "italic" }}>
                                    Fill in the form to see a preview
                                </p>
                            )}
                        </div>

                        {/* Two-image thumbnail row */}
                        {(product.image1 || product.image2) && (
                            <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                                {[{ url: product.image1, label: "Main" }, { url: product.image2, label: "Hover" }].map(({ url, label }) => (
                                    <div key={label} style={{ position: "relative", background: "#EDE9E3", borderRadius: "2px", aspectRatio: "1", overflow: "hidden", border: "1px solid #E0DAD3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {url ? (
                                            <img src={url} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
                                        ) : (
                                            <ImageOff size={16} color="#C5BEB6" strokeWidth={1.5} />
                                        )}
                                        <span style={{ position: "absolute", bottom: "6px", left: "6px", background: "rgba(26,26,26,0.65)", color: "#fff", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, padding: "2px 7px", borderRadius: "1px", backdropFilter: "blur(4px)" }}>
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminAddProduct;