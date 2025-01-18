
import React from "react";

// react icons
import {MdOutlineMail} from "react-icons/md";

const NewsletterForm = () => {

    return (
        <section
            className="w-full rounded-xl py-[20px] sm:py-[40px] px-[40px] sm:px-[80px] bg-gradient-to-br from-[#fff] via-[#fff] to-[#6D96FF] boxShadow">
            <h1 className="text-[2rem] sm:text-[3.5rem] w-full sm:w-[60%] text-[#161819] font-[400] leading-[45px] sm:leading-[70px]">Subscibe
                to Our
                Newsletter</h1>

            <div
                className="w-full 1260px:flex-row flex-col flex items-start mt-12 justify-between gap-[30px]">
                <p className="text-[0.9rem] text-[#555555]">Get weekly update about our
                    product
                    on your email, no spam guaranteed we promise ✌️</p>

                <div className="relative mb-6 w-full sm:w-[80%]">
                    <input className="py-3 pr-4 pl-12 w-full outline-none"
                           placeholder="Email Address"/>
                    <MdOutlineMail
                        className="p-1.5 bg-[#F8F8F8] text-[#6C777C] text-[2rem] absolute top-[50%] left-2 transform translate-y-[-50%]"/>

                    <button
                        className="absolute bottom-[-20px] right-[-20px] bg-[#161819] hover:bg-[#161819] text-white py-3 px-8">subscribe
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewsletterForm;
                    