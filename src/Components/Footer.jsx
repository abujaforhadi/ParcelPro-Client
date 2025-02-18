import React from "react";

// react icons
import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import {SlArrowUp} from "react-icons/sl";

const Footer = () => {

    return (
        <footer className="boxShadow rounded-xl   relative">

            <div
                className="w-full flex items-center justify-center pt-[30px] flex-col gap-[20px] pb-[130px]">
                <img src="/logo.png" alt="Parcel Pro Logo"
                     className="w-[150px]"/>

                <p className="text-[0.9rem] text-center sm:text-start text-gray-600">Simplifying your delivery needs with reliable and efficient parcel management.
                </p>

                <button className="py-3 px-6 rounded-full bg-primary text-white">Get in Touch</button>

                <div className="flex gap-[15px] text-black mt-4">
                    <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full bg-white text-text boxShadow" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <CgFacebook/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-text boxShadow" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <BsTwitter/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-text boxShadow" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <BsInstagram/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-text boxShadow" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <BsLinkedin/>
                    </a>
                </div>
            </div>

            <div
                className="z-30 absolute bottom-3 left-0 right-0 px-3 flex items-center justify-between w-full">
                <p className="text-[0.9rem] text-gray-300">© 2025 Parcel Pro. All Rights Reserved</p>

                <SlArrowUp
                    className="p-2 rounded-full border border-gray-300 cursor-pointer text-[2rem] text-gray-300"/>
            </div>

            <img src="https://i.ibb.co/zNk7XT4/Rectangle-97.png" alt="Footer background"
                 className="absolute bottom-[20px] sm:bottom-0 left-0 right-0 z-10 rounded-b-xl"/>
            <img src="https://i.ibb.co/0mp2FwS/Rectangle-95.png"
                 alt="Footer decorative image"
                 className="absolute bottom-0 left-0 right-0 z-10 rounded-b-xl"/>
        </footer>
    );
};

export default Footer;
