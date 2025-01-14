
import React, { useContext, useState } from "react";

// react icons
import { IoIosArrowUp } from "react-icons/io";
import { TbLogout2, TbUsersGroup } from "react-icons/tb";

import { AiOutlineFire } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { AuthContext } from "../Auth/AuthProvider";

const Navbar = () => {
    const {user,logout} =useContext(AuthContext);
    console.log(user);

    const [accountMenuOpen, setAccountMenuOpen] = useState(false)
    


    return (
        <nav
            className="flex items-center justify-between w-full relative">
            <img src="logo.png" alt="logo" className="w-[55px] " />
            <ul className="items-center gap-[20px] text-[1rem] text-[#424242] lg:flex hidden">


                <li className="flex items-center gap-[5px] cursor-pointer">
                    <AiOutlineFire className="text-[1.1rem] text-gray-600" />
                    Features
                </li>


            </ul>

            <div className="flex items-center gap-[15px]">
                <div className="flex items-center gap-[10px] cursor-pointer relative"
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
                    <div className="relative">
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName} className="w-[35px] h-[35px] rounded-full object-cover" />
                        <div
                            className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
                    </div>

                    
                    <div
                        className={`${accountMenuOpen ? "translate-y-0 opacity-100 z-[1]" : "translate-y-[10px] opacity-0 z-[-1]"} bg-white w-max rounded-md boxShadow absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}>
                        <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                            <FiUser />
                            {user?.displayName}
                        </p>
                        <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                            <IoSettingsOutline />
                            Settings
                        </p>
                        <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                            <FiUser />
                            Dashboard
                        </p>

                        <div className="mt-3 border-t border-gray-200 pt-[5px]">
                            <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50">
                                <TbLogout2 />
                                Logout
                            </p>
                        </div>

                    </div>

                    <IoIosArrowUp
                        className={`${accountMenuOpen ? "rotate-0" : "rotate-[180deg]"} transition-all duration-300 text-gray-600 sm:block hidden`} />

                </div>


            </div>


        </nav>
    );
};

export default Navbar;
