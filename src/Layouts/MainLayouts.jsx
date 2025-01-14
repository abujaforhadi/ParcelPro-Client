import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayouts = () => {
    return (
        <div className='md:px-10 my-5'>
            <Navbar/>
            <div className="container"> 
                <Outlet/>
            </div>
            <Footer/>
            
        </div>
    );
};

export default MainLayouts;