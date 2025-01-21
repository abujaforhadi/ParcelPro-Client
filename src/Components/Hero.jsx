import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import "aos/dist/aos.css";
import Aos from "aos";

const Hero = () => {
    React.useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <div
            className="w-full h-full rounded-md"
            style={{
                backgroundImage: "url('https://i.ibb.co/x1rvpZs/0f-Y6ep3cd1c.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left",
            }}
        >
            {/* header */}
            <header className="flex lg:flex-row flex-col-reverse gap-[50px] lg:gap-10 items-center px-8 py-1">
                <div className="w-full lg:w-[55%]" data-aos="fade-right">
                    <h1 className="text-[40px] sm:text-[60px] font-[600] leading-[45px] sm:leading-[70px]">
                        Bangladesh's <span className="text-[#90caf9]">Fastest</span> Delivery Service
                    </h1>
                    <p className="text-[18px] text-gray-500 mt-2">
                        Delivering Parcels Across 64 Districts in Just 3 Days with 24/7 Support and Next-Day Payment, All at the Lowest Rates
                    </p>
                    <div className="relative my-5">
                        <input
                            placeholder="Enter Tracking ID "
                            className="py-3 px-4 w-full outline-none rounded-l-md bg-gray-100"
                        />
                        <button className="h-full absolute top-0 right-0 bg-[#90caf9] px-3 text-white text-[1.3rem] rounded-r-md">
                            <CiSearch />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px] w-full sm:w-[80%]">
                        <p className="flex items-center gap-[5px] text-gray-500 text-[1rem]">
                            <FaCircleCheck className="text-[#F0B70D] text-[1.2rem]" />
                            Fast Delivery
                        </p>
                        <p className="flex items-center gap-[5px] text-gray-500 text-[1rem]">
                            <FaCircleCheck className="text-[#F0B70D] text-[1.2rem]" />
                            100% Parcel Safety
                        </p>
                        <p className="flex items-center gap-[5px] text-gray-500 text-[1rem]">
                            <FaCircleCheck className="text-[#F0B70D] text-[1.2rem]" />
                            Cash on Delivery
                        </p>

                    </div>
                </div>
                <div className="w-full sm:w-[40%]" data-aos="fade-left">
                    <img src="hero.svg" alt="Delivery" className="w-full h-full" />
                </div>
            </header>


        </div>
    );
};

export default Hero;
