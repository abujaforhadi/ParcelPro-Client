import React from 'react';
import Hero from '../Components/Hero';
import Features from '@/Components/Features';
import TopDeliveryMen from '@/Components/TopDeliveryMen';
import ClientsSection from '@/Components/ClientsSection';
const Home = () => {
    return (
        <div className='md:py-10 mx-auto'>

            <Hero/>
            {/* <NewsletterForm/> */}
            <Features/>
            <TopDeliveryMen/>
            <ClientsSection/>
            
        </div>
    );
};

export default Home;