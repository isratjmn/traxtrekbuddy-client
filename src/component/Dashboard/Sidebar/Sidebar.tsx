import React from 'react';
import { FiHome, FiUsers, FiClipboard, FiUser, FiLogOut } from 'react-icons/fi';
import Image from "next/image";
import logo from "../../../../public/assets/logo.png";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/services/actions/logOutUser';


const Sidebar = () => {
    const router = useRouter();
    const sidebarItems = [
        { title: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
        { title: 'Manage Users', path: '/dashboard/admin/manage-users', icon: <FiUsers /> },
        { title: 'Manage Trips', path: '/dashboard/admin/manage-trips', icon: <FiClipboard /> }
    ];
    const profileItems = [
        { title: 'Profile', path: '/profile', icon: <FiUser /> },
        { title: 'Logout', path: '/', icon: <FiLogOut />, onClick: () => logoutUser(router) }
    ];

    return (
        <nav className="flex flex-col justify-between h-full">
            <div className="flex items-center justify-center">
                <Image src={logo}
                    width={40}
                    height={40}
                    alt="brand logo"
                />
            </div>
            <div className="flex items-center justify-center border-gray-300 mb-10">


                <div className="items-center gap-3">
                    <Link href="/" className="text-2xl font-bold text-black hover:text-green-500 transition">
                        Trek<span className="text-green-500 font-extrabold">Trex</span>-Travel
                    </Link>
                </div>
            </div>
            <ul>
                {sidebarItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <li className="flex items-center p-4 hover:bg-gray-200">
                            <span className="mr-3">{item.icon}</span>
                            <a href={item.path} className="text-gray-700">{item.title}</a>
                        </li>
                        {index < sidebarItems.length - 1 && (
                            <hr className="border-gray-300" />
                        )}
                    </React.Fragment>
                ))}
            </ul>
            <ul className="mt-5 pt-5">
                {profileItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <li className="flex items-center p-4 hover:bg-gray-200">
                            <span className="mr-3">{item.icon}</span>
                            <a href={item.path} className="text-gray-700">{item.title}</a>
                        </li>
                        {index < profileItems.length - 1 && (
                            <hr className="border-gray-300" />
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
