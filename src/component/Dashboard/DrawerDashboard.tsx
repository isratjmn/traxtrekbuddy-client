

import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Link from "next/link";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logOutUser";

const DrawerDashboard = ({ children }: { children: React.ReactNode }) => {
	const userInfo = useUserInfo();
	const router = useRouter();
	const handleLogout = () => {
		logoutUser(router);
	};
	const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
	const toggleDesktopSidebar = () => {
		setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
	};
	const toggleMobileSidebar = () => {
		setIsMobileSidebarOpen(!isMobileSidebarOpen);
	};

	return (
		<div className="flex h-screen shadow-md">
			{/* Desktop Sidebar */}
			<div
				className={`hidden md:block bg-gray-100 w-64 border-r border-gray-200 transition duration-300 ease-in-out ${
					isDesktopSidebarOpen ? "block" : "hidden"
				}`}
			>
				<div className="p-5">
					<button
						className="md:hidden"
						onClick={toggleDesktopSidebar}
					>
						<svg
							className="w-8 h-8 text-gray-800 cursor-pointer"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							{isDesktopSidebarOpen ? (
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
					<div>
						<Sidebar />
					</div>
				</div>
			</div>

			{/* Mobile Sidebar */}
			<div
				className={` fixed top-0 left-0 h-full w-full bg-gray-100 z-50 transition-transform duration-300 ease-in-out ${
					isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="p-5">
					<button className="" onClick={toggleMobileSidebar}>
						<svg
							className="w-8 h-8 text-gray-800 cursor-pointer"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<div>
						<Sidebar />
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1">
				{/* Content Header */}
				<div className="bg-gray-200 p-5">
					<div className="flex justify-end">
						{userInfo?.id ? (
							<button
								onClick={handleLogout}
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded mt-4"
							>
								Logout
							</button>
						) : (
							<Link href="/login">
								<button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded mt-4">
									Login
								</button>
							</Link>
						)}
					</div>
				</div>
				{/* Main Content */}
				<div className="p-5">{children}</div>
			</div>
		</div>
	);
};

export default DrawerDashboard;
