import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../API/Axios";
import {
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

const ShopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // ✅ Delivery charge PER PRODUCT
  const perItemDeliveryCharge =
    deliveryArea === "dhaka" ? 120 : deliveryArea === "outside" ? 150 : 0;

  const deliveryCharge = perItemDeliveryCharge * quantity;

  const isReadyForPurchase = selectedSize && quantity >= 1 && deliveryArea;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);

        setSelectedImage(0);
        setSelectedSize("");
        setQuantity(1);
        setDeliveryArea("");
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    if (!isReadyForPurchase) return;

    const subtotal = product.price * quantity;
    const total = subtotal + deliveryCharge;

    // ✅ FIXED: Changed to 'order' to match Checkout component
    const order = {
      productId: product._id || product.id,
      title: product.title,
      price: product.price,
      image: product.image1,
      size: selectedSize,
      quantity,
      deliveryArea,
      deliveryCharge: perItemDeliveryCharge, // per item charge
      totalDeliveryCharge: deliveryCharge, // total delivery
      subtotal,
      total,
    };

    navigate("/checkout", { state: { order } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">😕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist</p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const images = [product.image1, product.image2].filter(Boolean);
  const sizes = Array.isArray(product.size) ? product.size : [product.size];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <span className="cursor-pointer hover:text-black" onClick={() => navigate("/")}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-black" onClick={() => navigate("/shop")}>Shop</span>
          <span>/</span>
          <span className="text-black font-medium">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT - Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-2xl group">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {selectedImage + 1} / {images.length}
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                20% OFF
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`rounded-2xl overflow-hidden transition-all duration-300 ${selectedImage === i
                        ? "ring-4 ring-black shadow-xl scale-105"
                        : "ring-2 ring-gray-200 hover:ring-gray-400"
                      }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-4 rounded-2xl text-center shadow-md">
                <Truck className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-xs font-medium text-gray-700">Fast Delivery</p>
              </div>
              <div className="bg-white p-4 rounded-2xl text-center shadow-md">
                <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-xs font-medium text-gray-700">Secure Payment</p>
              </div>
              <div className="bg-white p-4 rounded-2xl text-center shadow-md">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-xs font-medium text-gray-700">Easy Return</p>
              </div>
            </div>
          </div>

          {/* RIGHT - Product Info */}
          <div className="space-y-6">
            {/* Title & Actions */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(4.8 • 124 reviews)</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-xl transition-all duration-300 ${isWishlisted
                      ? "bg-red-100 text-red-600 scale-110"
                      : "bg-white shadow-md hover:bg-gray-50"
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
                <button className="p-3 rounded-xl bg-white shadow-md hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-gray-900">৳ {product.price}</span>
                <div>
                  <span className="line-through text-gray-500 text-xl block">
                    ৳ {Math.round(product.price * 1.2)}
                  </span>
                  <span className="text-green-600 font-semibold text-sm">You save ৳ {Math.round(product.price * 0.2)}</span>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="font-bold text-lg mb-3 flex items-center gap-2">
                Select Size <span className="text-red-500">*</span>
                {!selectedSize && <span className="text-sm text-red-500 font-normal">(Required)</span>}
              </p>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedSize === size
                        ? "bg-black text-white shadow-lg scale-105"
                        : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="font-bold text-lg mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-bold text-xl"
                >
                  -
                </button>
                <span className="text-2xl font-bold min-w-[60px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Delivery Area */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="font-bold text-lg mb-3 flex items-center gap-2">
                Delivery Area <span className="text-red-500">*</span>
                {!deliveryArea && <span className="text-sm text-red-500 font-normal">(Required)</span>}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeliveryArea("dhaka")}
                  className={`p-4 rounded-xl font-semibold transition-all duration-300 ${deliveryArea === "dhaka"
                      ? "bg-black text-white shadow-lg scale-105"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  <div className="text-sm mb-1">Inside Dhaka</div>
                  <div className="text-lg">৳120 / item</div>
                </button>
                <button
                  onClick={() => setDeliveryArea("outside")}
                  className={`p-4 rounded-xl font-semibold transition-all duration-300 ${deliveryArea === "outside"
                      ? "bg-black text-white shadow-lg scale-105"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  <div className="text-sm mb-1">Outside Dhaka</div>
                  <div className="text-lg">৳150 / item</div>
                </button>
              </div>
            </div>

            {/* Delivery Summary */}
            {deliveryArea && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Per Item Delivery:</span>
                  <span className="font-semibold">৳ {perItemDeliveryCharge}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Total Delivery ({quantity} items):</span>
                  <span className="font-bold text-xl text-blue-600">৳ {deliveryCharge}</span>
                </div>
              </div>
            )}

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={!isReadyForPurchase}
              className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${isReadyForPurchase
                  ? "bg-gradient-to-r from-black to-gray-800 text-white shadow-2xl hover:shadow-3xl hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {isReadyForPurchase ? (
                <span className="flex items-center justify-center gap-2">
                  <span>Buy Now</span>
                  <span className="text-sm opacity-80">• Total: ৳ {product.price * quantity + deliveryCharge}</span>
                </span>
              ) : (
                "Please select size and delivery area"
              )}
            </button>

            {/* Product Description */}
            {product.description && (
              <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
                <h3 className="font-bold text-xl mb-3">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;