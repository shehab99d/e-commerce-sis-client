import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles, TrendingUp } from "lucide-react";
import BannerSkeleton from "./BannerSkeleton";

const Banner = () => {
    const [loading, setLoading] = useState(true);

    const [currentIndex, setCurrentIndex] = useState(0);

    const banners = [
        {
            id: 1,
            title: "Premium Heritage",
            highlight: "Collection",
            subtitle: "Handcrafted elegance sourced directly from the heart of Cumilla.",
            imageUrl: "https://i.ibb.co.com/rK4zVVB5/c68fe61c-735d-420c-b611-dbe6ea2a0c9c.jpg",
            ctaText: "Shop Collection",
            ctaLink: "/shop",
            icon: "sparkles"
        },
        {
            id: 2,
            title: "Summer Essentials",
            highlight: "2026",
            subtitle: "Breathable fabrics designed for the modern woman.",
            imageUrl: "https://i.ibb.co.com/Pz4Hztrz/amore-by-ayzel-embroidered-lawn-suit-unstitched-3-piece-aaf25as-d-08-rose-summer-collection-1.webp",
            ctaText: "Explore Now",
            ctaLink: "/shop",
            icon: "trending"
        },
    ];

    // Auto-play logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [banners.length]);

    useEffect(() => {
        const img = new Image();
        img.src = banners[currentIndex].imageUrl;

        img.onload = () => {
            setLoading(false);
        };
    }, [currentIndex]);


    const nextSlide = () => setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

    const getIcon = (iconName) => {
        switch (iconName) {
            case "sparkles":
                return <Sparkles size={18} className="transition-all group-hover:scale-110" />;
            case "trending":
                return <TrendingUp size={18} className="transition-all group-hover:scale-110" />;
            default:
                return <Sparkles size={18} className="transition-all group-hover:scale-110" />;
        }
    };

    if (loading) {
        return <BannerSkeleton />;
    }


    return (
        <section className="relative w-full mt-4 lg:mb-10 md:mb-7 mb-5 h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="relative w-full h-full"
                >
                    {/* Parallax Image Effect with Enhanced Overlay */}
                    <motion.div className="absolute inset-0">
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 8, ease: "linear" }}
                            src={banners[currentIndex].imageUrl}
                            alt={banners[currentIndex].title}
                            className="w-full h-full object-cover"
                        />
                        {/* Multi-layer gradient for professional depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 1.5 }}
                            className="absolute top-1/4 -left-20 w-96 h-96 bg-white rounded-full blur-[120px]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.08, scale: 1 }}
                            transition={{ delay: 0.7, duration: 1.5 }}
                            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white rounded-full blur-[120px]"
                        />
                    </div>

                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="h-[1px] w-8 bg-white/50" />
                            <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/80 font-medium">
                                New Arrival
                            </span>
                            <div className="h-[1px] w-8 bg-white/50" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-white text-4xl md:text-6xl lg:text-7xl font-light mb-5 leading-tight"
                        >
                            {banners[currentIndex].title} <br />
                            <span className="font-bold italic bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                                {banners[currentIndex].highlight}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-white/70 text-sm md:text-base lg:text-lg max-w-2xl mb-12 leading-relaxed font-light"
                        >
                            {banners[currentIndex].subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                        >
                            <a
                                href={banners[currentIndex].ctaLink}
                                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/20"
                            >
                                {/* Animated background on hover */}
                                <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                                {/* Icon */}
                                <span className="relative z-10 text-black group-hover:text-white transition-colors duration-500">
                                    {getIcon(banners[currentIndex].icon)}
                                </span>

                                {/* Text */}
                                <span className="relative z-10 text-black group-hover:text-white transition-colors duration-500">
                                    {banners[currentIndex].ctaText}
                                </span>

                                {/* Arrow */}
                                <ChevronRight
                                    size={18}
                                    className="relative z-10 text-black group-hover:text-white transition-all duration-500 group-hover:translate-x-1"
                                />
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Enhanced Navigation Arrows */}
            <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 flex gap-3 z-10">
                <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="group p-4 border border-white/30 text-white rounded-full backdrop-blur-md bg-white/5 hover:bg-white hover:border-white transition-all duration-300 hover:scale-110"
                >
                    <ChevronLeft size={20} className="group-hover:text-black transition-colors" />
                </button>
                <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="group p-4 border border-white/30 text-white rounded-full backdrop-blur-md bg-white/5 hover:bg-white hover:border-white transition-all duration-300 hover:scale-110"
                >
                    <ChevronRight size={20} className="group-hover:text-black transition-colors" />
                </button>
            </div>

            {/* Enhanced Slider Dots */}
            <div className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className="group relative"
                    >
                        <div
                            className={`h-[2px] transition-all duration-500 ${index === currentIndex
                                ? "w-14 bg-white shadow-lg shadow-white/50"
                                : "w-8 bg-white/40 group-hover:bg-white/60"
                                }`}
                        />
                    </button>
                ))}
            </div>

            {/* Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-white/30 w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                key={currentIndex}
            >
                <motion.div
                    className="h-full bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                />
            </motion.div>
        </section>
    );
};

export default Banner;