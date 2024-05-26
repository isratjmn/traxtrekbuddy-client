"use client";

import { logoutUser } from "@/services/actions/logOutUser";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import "./AuthButton.css";

const AuthButton = () => {
	const router = useRouter();
	const userInfo = getUserInfo();

	const handleLogout = () => {
		confirmAlert({
			title: "Confirm Logout",
			message: "Are you sure you want to logout.....!!",
			buttons: [
				{
					label: "Yes",
					onClick: () => {
						logoutUser(router);
						router.push("/login");
						router.refresh();
					},
				},
				{
					label: "No",
					onClick: () => {},
				},
			],
		});
	};

	const handleUserDashboard = () => {
		router.push(`/dashboard/${userInfo?.role}`);
	};

	return (
		<>
			{userInfo?.id ? (
				<>
					<button
						onClick={handleLogout}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded mt-4"
					>
						Logout
					</button>
					{userInfo?.role === "user" && (
						<button
							onClick={handleUserDashboard}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mt-4"
						>
							<FaUsers className="inline-block text-xl"/>
						</button>
					)}
				</>
			) : (
				<Link href="/login">
					<button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded mt-4">
						Login
					</button>
				</Link>
			)}

			{userInfo?.role === "admin" && (
				<Link href={`/dashboard/${userInfo?.role}`}>
					<button className="bg-teal-500 text-end hover:bg-teal-700 text-white font-bold py-2 px-3 rounded mt-4">
						<RiAdminFill className="inline-block" />
					</button>
				</Link>
			)}
		</>
	);
};

export default AuthButton;
