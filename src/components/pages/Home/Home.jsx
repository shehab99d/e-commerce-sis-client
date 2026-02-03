import React from "react";
import Navbar from "../shared/Navbar/Navbar";

import Banner from "../Banner/Banner";
import Shop from "../Shop/Shop";

const Home = () => {
    return (
        <div className="pt-24 max-w-7xl mx-auto px-4">

            <Banner />
            <Shop></Shop>
        </div>
    );
};

export default Home;
