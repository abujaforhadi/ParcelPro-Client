import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router';

const DashBoard = () => {
    return (
        <div className="flex">
            {/* Sidebar Section */}
            <div className="w-1/4 h-screen bg-gray-100">
                <Sidebar>
                    <Menu
                        menuItemStyles={{
                            button: {
                                [`&.active`]: {
                                    backgroundColor: '#13395e',
                                    color: '#b6c8d9',
                                },
                            },
                        }}
                    >
                        <MenuItem component={<Link to="adminhome" />}>Admin Home</MenuItem>
                        <MenuItem component={<Link to="users" />}>Users role</MenuItem>
                        <MenuItem component={<Link to="history" />}>History</MenuItem>
                    </Menu>
                </Sidebar>
            </div>

            {/* Main Content Section */}
            <div className="w-3/4 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
