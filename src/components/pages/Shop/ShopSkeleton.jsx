import React from "react";

const ShopSkeleton = ({ count = 8 }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Title Skeleton */}
            <div className="mb-8 flex items-center justify-between">
                <div className="h-9 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
                <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: count }).map((_, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        {/* Image Skeleton with aspect ratio */}
                        <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                            {/* Product Name */}
                            <div className="space-y-2">
                                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]" style={{ width: `${75 + (index % 3) * 5}%` }}></div>
                                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]" style={{ width: `${50 + (index % 4) * 8}%` }}></div>
                            </div>

                            {/* Price and Rating */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                                <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                            </div>

                            {/* Button */}
                            <div className="h-10 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%] mt-4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopSkeleton;