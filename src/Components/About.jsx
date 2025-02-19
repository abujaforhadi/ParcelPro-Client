import React from "react";

const About = () => {
    return (
        <section className="mt-10 w-full flex flex-col items-center bg-[#0A0D17] p-[40px] rounded-xl text-white">
            
            <div className="lg:w-[80%] w-full text-center">
                <h1 className="text-[2rem] font-bold">About Parcel Pro</h1>
                <p className="text-gray-400 mt-4">
                    Parcel Pro is a modern and efficient parcel management system designed to simplify deliveries.
                    Whether you're an individual or a business, our platform ensures smooth and secure parcel booking, 
                    tracking, and delivery.
                </p>
            </div>

            {/* Features Section */}
            <div className="mt-10 w-full flex flex-wrap justify-center gap-10">
                
                {/* Feature 1 */}
                <div className="w-[300px] p-6 bg-[#22222f] rounded-xl text-center shadow-lg">
                    <h2 className="text-lg font-semibold text-[#90caf9]">Easy Parcel Booking</h2>
                    <p className="text-gray-400 mt-2">Book your parcel effortlessly through our intuitive online platform.</p>
                </div>

                {/* Feature 2 */}
                <div className="w-[300px] p-6 bg-[#22222f] rounded-xl text-center shadow-lg">
                    <h2 className="text-lg font-semibold text-[#90caf9]">Real-Time Tracking</h2>
                    <p className="text-gray-400 mt-2">Monitor your parcel’s journey with live tracking and instant updates.</p>
                </div>

                {/* Feature 3 */}
                <div className="w-[300px] p-6 bg-[#22222f] rounded-xl text-center shadow-lg">
                    <h2 className="text-lg font-semibold text-[#90caf9]">Secure & Reliable</h2>
                    <p className="text-gray-400 mt-2">Your deliveries are safe with us. We ensure timely and secure transport.</p>
                </div>

                {/* Feature 4 */}
                <div className="w-[300px] p-6 bg-[#22222f] rounded-xl text-center shadow-lg">
                    <h2 className="text-lg font-semibold text-[#90caf9]">Admin & Delivery Roles</h2>
                    <p className="text-gray-400 mt-2">Admins can assign deliveries, and delivery personnel can update statuses.</p>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-10 text-center">
                <h2 className="text-xl font-semibold">Join Parcel Pro Today</h2>
                <p className="text-gray-400 mt-2">Experience a seamless and hassle-free parcel delivery system.</p>
                <a href="https://parcelpro.abujafor.me/" target="_blank" rel="noopener noreferrer">
                    <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-800 text-white rounded-md">
                        Visit Parcel Pro
                    </button>
                </a>
            </div>

        </section>
    );
};

export default About;
