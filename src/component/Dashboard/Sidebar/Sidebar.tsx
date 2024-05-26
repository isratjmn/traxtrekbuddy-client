import React, { useEffect, useState } from "react";
import { FiHome, FiUsers, FiClipboard, FiLogOut } from "react-icons/fi";
import Image from "next/image";
import logo from "../../../../public/assets/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logOutUser";

import { getFromLocalStorage } from "@/utilities/local-stroge";

import { decordedToken } from "@/utilities/jwtDecode";
import { TbPasswordFingerprint } from "react-icons/tb";

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

	const adminSidebarItems = [
		{ title: "Dashboard", path: "/dashboard/admin", icon: <FiHome /> },
		{
			title: "Manage Users",
			path: "/dashboard/admin/manage-users",
			icon: <FiUsers />,
		},
		{
			title: "Manage Trips",
			path: "/dashboard/admin/manage-trips",
			icon: <FiClipboard />,
		},
	];
	const userSidebarItems = [
		{ title: "Dashboard", path: "/dashboard/user", icon: <FiHome /> },
		{
			title: "My Trips",
			path: "/dashboard/user/my-trips",
			icon: <FiClipboard />,
		},
	];
	const commonItems = [
/* 		{
			title: "Change Password",
			path: "/change-password",
			icon: <TbPasswordFingerprint />,
			onClick: () => logoutUser(router),
		}, */
		{
			title: "Logout",
			path: "/",
			icon: <FiLogOut />,
			onClick: () => logoutUser(router),
		},
	];

	const sidebarItems =
		user?.role === "admin" ? adminSidebarItems : userSidebarItems;

	return (
		<nav
			className="flex flex-col justify-between h-full"
			style={{ height: "100%" }}
		>
			<div className="flex items-center justify-center">
				<Image src={logo} width={40} height={40} alt="brand logo" />
			</div>
			<div className="flex items-center justify-center border-gray-300 mb-10">
				<div className="items-center gap-3">
					<Link
						href="/"
						className="text-2xl font-bold text-black hover:text-teal-500 transition"
					>
						Trek
						<span className="text-teal-500 font-extrabold">
							Trex
						</span>
						-Travel
					</Link>
				</div>
			</div>
			<ul>
				{sidebarItems.map((item, index) => (
					<React.Fragment key={index}>
						<li className="flex items-center p-4 hover:bg-gray-200">
							<span className="mr-3">{item.icon}</span>
							<Link href={item.path} className="text-gray-700">
								{item.title}
							</Link>
						</li>
						{index < sidebarItems.length - 1 && (
							<hr className="border-gray-300" />
						)}
					</React.Fragment>
				))}
			</ul>
			<ul className="mt-5 pt-5">
				{commonItems.map((item, index) => (
					<React.Fragment key={index}>
						<li className="flex items-center p-4 hover:bg-gray-200">
							<span className="mr-3">{item.icon}</span>
							<a
								href={item.path}
								onClick={item.onClick}
								className="text-gray-700"
							>
								{item.title}
							</a>
						</li>
						{index < commonItems.length - 1 && (
							<hr className="border-gray-300" />
						)}
					</React.Fragment>
				))}
			</ul>
		</nav>
	);
};

export default Sidebar;
