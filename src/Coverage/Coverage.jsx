import React from "react";
import Map from "../../src/components/pages/Map/Map"; // Map.jsx import

const Coverage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Our Coverage Area</h1>

            <Map /> {/* এইখানে Map দেখাবে */}

            <p className="text-center mt-4 text-gray-500">
                We currently provide our services in selected cities of Bangladesh. Hover over the markers to see city names.
            </p>
        </div>
    );
};

export default Coverage;
