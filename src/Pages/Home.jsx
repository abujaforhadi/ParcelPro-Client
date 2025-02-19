import React from 'react';
import Hero from '../Components/Hero';
import Features from '@/Components/Features';
import TopDeliveryMen from '@/Components/TopDeliveryMen';
import ClientsSection from '@/Components/ClientsSection';
import Faq from '@/Components/Faq';
const Home = () => {
    return (
        <div className='md:px-10 mx-auto'>

            <Hero/>
            {/* <NewsletterForm/> */}
            <Features/>
            <TopDeliveryMen/>
            <ClientsSection/>
            <Faq/>
            
        </div>
    );
};

export default Home;