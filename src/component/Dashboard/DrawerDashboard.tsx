"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';


const DrawerDashboard = ({ children }: { children: React.ReactNode; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Drawer Menu */}
            <div className={`bg-gray-100 w-64 border-r border-gray-200 transition duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'} md:block`}>
                <div className="p-5">
                    {/* Drawer Button */}
                    <button
                        className="md:hidden"
                        onClick={toggleDrawer}
                    >
                        <svg
                            className="w-8 h-8 text-gray-800 cursor-pointer"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                    {/* Drawer Content */}
                    <div>
                        <Sidebar />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Content Header */}
                <div className="bg-gray-200 p-5">
                    Content Header
                </div>
                {/* Main Content */}
                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DrawerDashboard;
