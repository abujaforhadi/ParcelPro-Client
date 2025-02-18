import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayouts = () => {
    return (
        <div className=''>
            <Navbar/>
            <div className="container mx-auto"> 
                <Outlet/>
            </div>
            <Footer/>
            
        </div>
    );
};

export default MainLayouts;