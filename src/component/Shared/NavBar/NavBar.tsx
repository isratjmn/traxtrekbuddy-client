"use client";

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { FaUserAlt, FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import logo from "@assets/logo.png";
import { useRouter } from 'next/navigation';
import useUserInfo from '@/hooks/useUserInfo';
import { logoutUser } from '@/services/actions/logOutUser';



const NavBar = () => {
    const userInfo = useUserInfo();

    const router = useRouter();

    const handleLogout = () => {
        logoutUser(router);
        console.log("haNdle");
    };
    return (
        <div className="navbar bg-base-100 px-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-4">
                        <li>
                            <Link href="/" className="text-[16px] text-gray-700 hover:text-primary transition">Home</Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-[16px] text-gray-700 hover:text-primary transition">About Us</Link>
                        </li>
                        <li>
                            <Link href="/my-profile" className="text-[16px] text-gray-700 hover:text-primary transition">My Profile</Link>
                        </li>
                    </ul>
                </div>
                <div className='flex items-center  gap-2'>
                    <Image src={logo}
                        width={40}
                        height={40}
                        alt="brand logo" />
                    <Link href="/" className="text-2xl font-bold text-black hover:text-green-500 transition">
                        Trek<span className="text-green-500">Trex</span>-Travel
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href="/" className="text-lg text-black font-bold hover:text-green-500 transition">Home</Link>
                    </li>
                    <li>
                        <Link href="/about" className="text-lg text-bold text-black font-bold hover:text-green-500 transition">About Us</Link>
                    </li>
                    <li>
                        <Link href="/my-profile" className="text-lg text-black font-bold hover:text-green-500 transition">My Profile</Link>
                    </li>
                </ul>
            </div>

            <div className="navbar-end">
                {userInfo?.id ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded mt-4"
                    >
                        Logout
                    </button>
                ) : (
                    <Link href="/login">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded mt-4"
                        >
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </div >
    );
};

export default NavBar;