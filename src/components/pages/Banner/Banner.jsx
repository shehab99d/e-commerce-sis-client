import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const banners = [
        {
            id: 1,
            title: "Premium Heritage",
            highlight: "Collection",
            subtitle: "Handcrafted elegance sourced directly from the heart of Cumilla.",
            imageUrl: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?auto=format&fit=crop&w=1470&q=80",
            ctaText: "Shop Collection",
            ctaLink: "/shop",
        },
        {
            id: 2,
            title: "Summer Essentials",
            highlight: "2026",
            subtitle: "Breathable fabrics designed for the modern woman.",
            imageUrl: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1470&q=80",
            ctaText: "Explore Now",
            ctaLink: "/shop",
        },
    ];

    // Auto-play logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const nextSlide = () => setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

    return (
        <section className="relative w-full h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-[#0f0f0f]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="relative w-full h-full"
                >
                    {/* Parallax Image Effect */}
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 8, ease: "linear" }}
                        src={banners[currentIndex].imageUrl}
                        alt={banners[currentIndex].title}
                        className="w-full h-full object-cover opacity-60"
                    />

                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-xs md:text-sm uppercase tracking-[0.5em] text-white/70 mb-4"
                        >
                            New Arrival
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-white text-4xl md:text-7xl font-light mb-4"
                        >
                            {banners[currentIndex].title} <br />
                            <span className="font-bold italic serif">{banners[currentIndex].highlight}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-white/60 text-sm md:text-lg max-w-lg mb-10 leading-relaxed font-light"
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
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs uppercase tracking-widest font-semibold overflow-hidden transition-all duration-300 hover:bg-black hover:text-white"
                            >
                                {banners[currentIndex].ctaText}
                                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute bottom-10 right-10 flex gap-4 z-10">
                <button 
                    onClick={prevSlide}
                    className="p-3 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={nextSlide}
                    className="p-3 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Slider Dots */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-[2px] transition-all duration-500 ${
                            index === currentIndex ? "w-12 bg-white" : "w-6 bg-white/30"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Banner;