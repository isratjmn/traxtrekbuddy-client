import React, { useEffect, useState } from "react";
import { FiUsers, FiLogOut } from "react-icons/fi";
import Image from "next/image";
import logo from "../../../../public/assets/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getFromLocalStorage } from "@/utilities/local-stroge";
import { decordedToken } from "@/utilities/jwtDecode";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdOutlineDashboard, MdOutlineTravelExplore } from "react-icons/md";

const Sidebar = () => {
	const token = getFromLocalStorage("accessToken");
	const pathname = usePathname();
	const router = useRouter();
	const [user, setUser] = useState<any>({});

	useEffect(() => {
		if (token) {
			try {
				const userData = decordedToken(token);
				setUser(userData);
			} catch (error: any) {
				router.push("/login");
			}
		} else {
			router.push("/login");
		}
	}, [router, token]);
	const commonItems = [
		{
			title: "Change Password",
			path: "/dashboard/change-password",
			icon: <TbPasswordFingerprint style={{ fontSize: "24px" }} />,
		},
	];

	const adminSidebarItems = [
		{
			title: "Dashboard",
			path: "/dashboard/admin",
			icon: <MdOutlineDashboard style={{ fontSize: "24px" }} />,
		},
		{
			title: "Manage Users",
			path: "/dashboard/admin/manage-users",
			icon: <FiUsers />,
		},
		{
			title: "Manage Travels",
			path: "/dashboard/admin/manage-trips",
			icon: <MdOutlineTravelExplore style={{ fontSize: "24px" }} />,
		},
		...commonItems,
	];
	const userSidebarItems = [
		{
			title: "Dashboard",
			path: "/dashboard/user",
			icon: <MdOutlineDashboard style={{ fontSize: "24px" }} />,
		},
		{
			title: "My Travels",
			path: "/dashboard/user/my-trips",
			icon: <MdOutlineTravelExplore style={{ fontSize: "24px" }} />,
		},
		...commonItems,
	];

	const sidebarItems =
		user?.role === "admin" ? adminSidebarItems : userSidebarItems;

	return (
		<nav
			className="flex flex-col justify-between h-screen bg-gray-100"
			style={{ height: "100%" }}
		>
			<div className="flex items-center justify-center mt-8 mb-4">
				<Image src={logo} width={60} height={60} alt="brand logo" />
			</div>
			<div className="flex items-center justify-center border-b border-gray-300 pb-4 mb-4">
				<Link
					href="/"
					className="text-2xl font-bold text-black hover:text-teal-500 transition"
				>
					Trek
					<span className="text-teal-500 font-extrabold">Trex</span>
					-Travel
				</Link>
			</div>
			<ul>
				{sidebarItems.map((item, index) => (
					<li
						key={index}
						className={`flex items-center p-3 mb-4 space-y-4 font-semibold text-lg hover:bg-gray-200 ${
							pathname === item.path
								? "bg-teal-500 text-white"
								: "text-gray-700"
						}`}
					>
						<span className="mr-3">{item.icon}</span>
						<Link href={item.path} className="flex-1">
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Sidebar;
