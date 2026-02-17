import React from "react";

const BannerSkeleton = () => {
    return (
        <section className="relative w-full mt-4 lg:mb-10 md:mb-7 mb-5 h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Background Image Skeleton */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 animate-shimmer bg-[length:200%_100%]">
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gray-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gray-600/10 rounded-full blur-[120px] animate-pulse"
                    style={{ animationDelay: '1s' }} />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                {/* "New Arrival" Badge */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-shimmer bg-[length:200%_100%]" />
                    <div className="h-3 w-32 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
                    <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-shimmer bg-[length:200%_100%]" />
                </div>

                {/* Title Lines */}
                <div className="mb-5 space-y-4 w-full max-w-4xl">
                    <div className="h-12 md:h-16 lg:h-20 w-3/4 mx-auto bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]" />
                    <div className="h-12 md:h-16 lg:h-20 w-2/3 mx-auto bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]"
                        style={{ animationDelay: '0.2s' }} />
                </div>

                {/* Subtitle */}
                <div className="mb-12 space-y-2 w-full max-w-2xl">
                    <div className="h-4 md:h-5 w-4/5 mx-auto bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-shimmer bg-[length:200%_100%]"
                        style={{ animationDelay: '0.4s' }} />
                    <div className="h-4 md:h-5 w-3/5 mx-auto bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-shimmer bg-[length:200%_100%]"
                        style={{ animationDelay: '0.5s' }} />
                </div>

                {/* CTA Button */}
                <div className="h-14 md:h-16 w-48 md:w-56 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 rounded animate-shimmer bg-[length:200%_100%] shadow-lg"
                    style={{ animationDelay: '0.6s' }} />
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 flex gap-3 z-10">
                <div className="w-14 h-14 rounded-full border border-gray-600 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-shimmer bg-[length:200%_100%] backdrop-blur-md" />
                <div className="w-14 h-14 rounded-full border border-gray-600 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-shimmer bg-[length:200%_100%] backdrop-blur-md"
                    style={{ animationDelay: '0.1s' }} />
            </div>

            {/* Slider Dots */}
            <div className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                <div className="h-[2px] w-14 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded animate-shimmer bg-[length:200%_100%]" />
                <div className="h-[2px] w-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-shimmer bg-[length:200%_100%]"
                    style={{ animationDelay: '0.2s' }} />
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-800">
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-shimmer bg-[length:200%_100%]" />
            </div>

            {/* Floating Elements (Optional Enhancement) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                <div className="absolute top-40 right-20 w-1 h-1 bg-gray-600 rounded-full animate-pulse"
                    style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"
                    style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-gray-600 rounded-full animate-pulse"
                    style={{ animationDelay: '1.5s' }} />
            </div>
        </section>
    );
};

export default BannerSkeleton;