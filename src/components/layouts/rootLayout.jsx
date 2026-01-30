import React from 'react';
import { Outlet } from 'react-router';

const rootLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default rootLayout;