import React, { useState } from "react";

// react icons
import { FaPlus } from "react-icons/fa6";

const Faq = () => {
    const accordingData = [
        {
            title: "How do I book a parcel for delivery?",
            description:
                "Users can book a parcel by signing in, entering delivery details, and making a payment.",
        },
        {
            title: "How can I track my parcel?",
            description:
                "You can track your parcel by entering your tracking ID in the tracking section on our website.",
        },
        {
            title: "What are the delivery charges?",
            description:
                "Delivery charges vary based on weight, distance, and delivery speed. Check our pricing page for details.",
        },
        {
            title: "What should I do if my parcel is delayed?",
            description:
                "If your parcel is delayed, please contact our support team with your tracking ID for assistance.",
        },
        {
            title: "Can I cancel a parcel after booking?",
            description:
                "Yes, but cancellation policies apply based on the parcel's delivery status. Check our terms for more information.",
        },
    ];

    const [isPlusAccording, setIsPlusAccording] = useState(null);

    const handleBorderClick = (index) =>
        setIsPlusAccording((prevIndex) => (prevIndex === index ? null : index));

    return (
        <div className="flex gap-3 flex-col w-full">
            {accordingData?.map((according, index) => (
                <article key={index} className="border border-[#e5eaf2] rounded p-3">
                    <div
                        className="flex gap-2 cursor-pointer items-center justify-between w-full"
                        onClick={() => handleBorderClick(index)}
                    >
                        <h2 className="text-[#3B9DF8] font-[600] text-[1.2rem]">
                            {according.title}
                        </h2>
                        <p>
                            <FaPlus
                                className={`text-[1.3rem] text-text transition-all duration-300 ${
                                    isPlusAccording === index &&
                                    "rotate-[45deg] !text-[#3B9DF8]"
                                }`}
                            />
                        </p>
                    </div>
                    <div
                        className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                            isPlusAccording === index
                                ? "grid-rows-[1fr] opacity-100 mt-4"
                                : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                        <p className="text-[#424242] text-[0.9rem] overflow-hidden">
                            {according.description}
                        </p>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default Faq;
