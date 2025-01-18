
import React, { useContext, useState } from "react";

// react icons
import { IoIosArrowUp } from "react-icons/io";
import { TbLogout2, TbUsersGroup } from "react-icons/tb";

import { AiOutlineFire } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { AuthContext } from "../Auth/AuthProvider";
import { Link, NavLink } from "react-router";

const Navbar = () => {
    const {user,logout} =useContext(AuthContext);

    const [accountMenuOpen, setAccountMenuOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    
    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch {
            setIsLoggingOut(false);
        }
    };

    return (
        <nav
            className="flex items-center justify-between w-full relative">
            <Link to="/"><img src="/logo.png" alt="logo" className="w-[60px] " /></Link>
            <ul className="items-center gap-[20px] text-[1rem] text-[#424242] lg:flex hidden">


                <li className="flex items-center gap-[5px] cursor-pointer">
                    <AiOutlineFire className="text-[1.1rem] text-gray-600" />
                    Features
                </li>


            </ul>

            <div className="flex items-center gap-[15px]">
                {
                    user? (<div className="flex items-center gap-[10px] cursor-pointer relative"
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
                            <NavLink  to="/dashboard" className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                                <FiUser />
                                Dashboard
                            </NavLink>
    
                            <div className="mt-3 border-t border-gray-200 pt-[5px]">
                                <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50">
                                    <TbLogout2 />
                                    
                                    <button onClick={handleLogout}>Logout</button>
                                </p>
                            </div>
    
                        </div>
    
                        <IoIosArrowUp
                            className={`${accountMenuOpen ? "rotate-0" : "rotate-[180deg]"} transition-all duration-300 text-gray-600 sm:block hidden`} />
    
                    </div>):(
                        <>
                        <Link
                                to="/login"
                                className="text-sm py-1.5 px-3 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >
                                Login
                            </Link></>
                    )
                }


            </div>


        </nav>
    );
};

export default Navbar;
