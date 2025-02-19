import React, { useContext, useState, useEffect } from "react";
import { IoIosArrowUp, IoMdNotificationsOutline } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { BsSun, BsMoon } from "react-icons/bs"; 
import { AuthContext } from "../Auth/AuthProvider";
import { Link, NavLink, useNavigate } from "react-router";

const Navbar = () => {
    const { user, logout, isAdmin, isDeliveryman } = useContext(AuthContext);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "light");
    const navigate = useNavigate();

    // Toggle dark/light mode
    const toggleTheme = () => {
        const newTheme = darkMode ? "dark" : "light";
        setDarkMode(!darkMode);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", !darkMode);
    };

    // Apply theme on page load
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch {
            setIsLoggingOut(false);
        }
    };

    const handleDashboardClick = () => {
        if (isAdmin) {
            navigate("/dashboard/statistics");
        } else if (isDeliveryman) {
            navigate("/dashboard/mydeliverylist");
        } else {
            navigate("/dashboard/myparcels");
        }
    };

    return (
        <nav className="px-5 md:px-10 py-2 flex items-center justify-between w-full fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0A0D17] shadow-md transition-all duration-300">
            {/* Logo */}
            <Link to="/">
                <img src="/logo.png" alt="logo" className="w-[60px]" />
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-[20px] text-[1rem] text-[#424242] dark:text-gray-200">
                <NavLink to="/about" className="hover:text-gray-600 dark:hover:text-gray-400">About</NavLink>
                <NavLink to="/contact" className="hover:text-gray-600 dark:hover:text-gray-400">Contact</NavLink>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-[15px]">
                {/* Theme Toggle Button */}
                <button onClick={toggleTheme} className="text-xl text-gray-600 dark:text-gray-200">
                    {darkMode ?  <BsMoon />: <BsSun /> }
                </button>

                {/* Notifications Icon */}
                <button className="text-gray-600 dark:text-gray-200">
                    <IoMdNotificationsOutline className="w-7 h-7" />
                </button>

                {/* User Menu */}
                {user ? (
                    <div
                        className="flex items-center gap-[10px] cursor-pointer relative"
                        onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                    >
                        {/* User Avatar */}
                        <div className="relative">
                            <img
                                src={user?.photoURL}
                                alt={user?.displayName}
                                className="w-[35px] h-[35px] rounded-full object-cover"
                            />
                            <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-0 right-0 border-2 border-white dark:border-[#0A0D17]"></div>
                        </div>

                        {/* Dropdown Menu */}
                        <div
                            className={`${accountMenuOpen ? "translate-y-0 opacity-100 z-[1]" : "translate-y-[10px] opacity-0 z-[-1]"} 
                            bg-white dark:bg-[#22222f] w-max rounded-md shadow-lg absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
                        >
                            <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <FiUser />
                                {user?.displayName}
                            </p>
                            <p
                                className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                onClick={handleDashboardClick}
                            >
                                <MdOutlineDashboard />
                                Dashboard
                            </p>

                            <div className="mt-3 border-t border-gray-200 dark:border-gray-600 pt-[5px]">
                                <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50 dark:hover:bg-red-700">
                                    <TbLogout2 />
                                    <button onClick={handleLogout}>Logout</button>
                                </p>
                            </div>
                        </div>

                        <IoIosArrowUp
                            className={`${accountMenuOpen ? "rotate-0" : "rotate-[180deg]"} transition-all duration-300 text-gray-600 dark:text-gray-200 sm:block hidden`}
                        />
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="text-sm py-1.5 px-3 bg-gray-800 dark:bg-gray-600 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-500 flex items-center gap-2"
                    >
                        <CiLogin />
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
