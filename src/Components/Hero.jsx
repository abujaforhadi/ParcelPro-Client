import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import "aos/dist/aos.css";
import Aos from "aos";
import axios from "axios";

const Hero = () => {
    React.useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    // State to store the tracking ID and search result
    const [trackingId, setTrackingId] = useState("");
    const [parcelDetails, setParcelDetails] = useState(null);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle the change in input field
    const handleInputChange = (e) => {
        setTrackingId(e.target.value);
    };

    // Handle search logic
    const handleSearch = async () => {
        try {
            const response = await axios.get("https://parcelpro-server.vercel.app/allparcels");
            const parcel = response.data.find(parcel => parcel._id === trackingId);
            if (parcel) {
                setParcelDetails(parcel);
                setError("");
                setIsModalOpen(true);
            } else {
                setError("Parcel not found!");
                setParcelDetails(null);
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            setParcelDetails(null);
        }
    };

    // Modal component
    const Modal = ({ isOpen, onClose, details }) => {
        if (!isOpen) return null;
    
        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[500px] shadow-lg">
                    <h2
                        id="modal-title"
                        className="text-2xl font-semibold mb-4 text-gray-800"
                    >
                        Parcel Details
                    </h2>
                    <div className="text-gray-700 space-y-2">
                        <p>
                            <span className="font-medium">Sender:</span> {details.name}
                        </p>
                        <p>
                            <span className="font-medium">Status:</span> {details.status}
                        </p>
                        <p>
                            <span className="font-medium">Recipient:</span> {details.receiverName}
                        </p>
                        {/* Add additional details as needed */}
                    </div>
                    <button
                        className="mt-6 bg-[#90caf9] hover:bg-[#6aaee7] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

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
                            type="text"
                            value={trackingId}
                            onChange={handleInputChange}
                            placeholder="Enter Tracking ID"
                            className="py-3 px-4 w-full outline-none rounded-l-md bg-gray-100"
                        />
                        <button
                            className="h-full absolute top-0 right-0 bg-[#90caf9] px-3 text-white text-[1.3rem] rounded-r-md"
                            onClick={handleSearch}
                        >
                            <CiSearch />
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px] w-full sm:w-[80%] mt-5">
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

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                details={parcelDetails}
            />
        </div>
    );
};

export default Hero;
