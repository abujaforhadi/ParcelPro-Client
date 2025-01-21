import React from 'react';
import Hero from '../Components/Hero';
import Features from '@/Components/Features';
import TopDeliveryMen from '@/Components/TopDeliveryMen';
const Home = () => {
    return (
        <div>

            <Hero/>
            {/* <NewsletterForm/> */}
            <Features/>
            <TopDeliveryMen/>
            
        </div>
    );
};

export default Home;