import React from 'react';

const Blog = () => {
    return (
        <div className="bg-gray-100 dark:text-gray-900">
            <div className="container grid grid-cols-12 mx-auto">
                <div className="flex flex-col justify-center col-span-12 align-middle dark:bg-gray-300 bg-no-repeat bg-cover lg:col-span-6 lg:h-auto" style={{ backgroundImage: "url('https://source.unsplash.com/640x480/?delivery,parcel')", backgroundPosition: "center center", backgroundBlendMode: "multiply", backgroundSize: "cover" }}>
                    <div className="flex flex-col items-center p-8 py-12 text-center dark:text-gray-800">
                        <span>15 Feb</span>
                        <h1 className="py-4 text-5xl font-bold">Efficient & Reliable Parcel Delivery</h1>
                        <p className="pb-6">Discover how our parcel management system ensures fast and secure deliveries for your business and personal needs.</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col col-span-12 p-6 divide-y lg:col-span-6 lg:p-10 dark:divide-gray-300">
                    <div className="pt-6 pb-4 space-y-2">
                        <span>10 Feb</span>
                        <h1 className="text-3xl font-bold">How Our System Simplifies Parcel Tracking</h1>
                        <p>Our advanced tracking system keeps you updated on your parcel's journey in real-time.</p>
                        <a rel="noopener noreferrer" href="#" className="inline-flex items-center py-2 space-x-2 text-sm dark:text-cyan-600">
                            <span>Read more</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                    <div className="pt-6 pb-4 space-y-2">
                        <span>5 Feb</span>
                        <h1 className="text-3xl font-bold">The Importance of Secure Deliveries</h1>
                        <p>Security is our priority. Learn how we ensure that your parcels reach their destination safely.</p>
                        <a rel="noopener noreferrer" href="#" className="inline-flex items-center py-2 space-x-2 text-sm dark:text-cyan-600">
                            <span>Read more</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                    <div className="pt-6 pb-4 space-y-2">
                        <span>1 Feb</span>
                        <h1 className="text-3xl font-bold">Eco-Friendly Parcel Packaging</h1>
                        <p>We are committed to sustainable solutions. Discover how our eco-friendly packaging reduces waste.</p>
                        <a rel="noopener noreferrer" href="#" className="inline-flex items-center py-2 space-x-2 text-sm dark:text-cyan-600">
                            <span>Read more</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
