"use client";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { LuUserX } from "react-icons/lu";
import { BiTrip } from "react-icons/bi";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdOutlineAppRegistration } from "react-icons/md";
import { getDashboardData } from "@/services/actions/adminManagement";
import Spinner from "@/component/Shared/Spinner/Spinner";
import useUserInfo from "@/hooks/useUserInfo";

const UserDashboard = () => {
	const userInfo = useUserInfo();
	const [allData, setData] = useState<any>({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				const data = await getDashboardData();
				setData(data);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
			}
		};
		getData();
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	const stats = [
		{
			label: "Total Users",
			value: allData?.totalUser,
			icon: (
				<FaUsers className="text-[90px] group-hover:text-primaryColor transition-colors duration-300" />
			),
		},
		{
			label: "Total Active User",
			value: allData?.totalActiveUser,
			icon: (
				<FiUserCheck className="text-[90px] group-hover:text-primaryColor transition-colors duration-300" />
			),
		},
		{
			label: "Total Deactive User",
			value: allData?.totalDeActiveUser,
			icon: (
				<LuUserX className="text-[90px] group-hover:text-primaryColor transition-colors duration-300" />
			),
		},
		{
			label: "Total Trip",
			value: allData?.totalTrip,
			icon: (
				<BiTrip className="text-[90px] group-hover:text-primaryColor transition-colors duration-300" />
			),
		},
		{
			label: "Total Trip Request",
			value: allData?.totalTripRequest,
			icon: (
				<FaCodePullRequest className="text-[90px] group-hover:text-primaryColor transition-colors duration-300" />
			),
		},
		{
			label: "Total Trip Request Approved",
			value: allData?.totalTripRequestApproved,
			icon: (
				<MdOutlineAppRegistration className="text-[90px] group-hover:text-primaryColor transition-colors duration-300" />
			),
		},
	];

	return (
		<div className="w-[100%]">
			<h1 className="text-3xl pb-10 font-semibold text-center pt-4 md:pt-8">
			<span className="text-teal-600 capitalize font mr-4">
					{userInfo?.role?.charAt(0).toUpperCase() +
						userInfo?.role?.slice(1)}
				</span>
				Dashboard Home
			</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 mx-auto gap-4">
				
				{stats.map((stat, index) => (
					<div
						key={index}
						className="flex items-center gap-2 border p-4 max-w-[300px] w-full md:w-[180px] lg:w-[250px] justify-between group hover:border-[#9e483a] transition-colors duration-300"
					>
						<div>
							<h1 className="text-5xl group-hover:text-gray-300 font-semibold transition-colors duration-300">
								{stat.value}
								<span className="group-hover:text-primaryColor transition-colors duration-300">
									+
								</span>
							</h1>
							<h1 className="text-gray-400 pt-2 group-hover:text-primaryColor transition-colors duration-300">
								{stat.label}
							</h1>
						</div>
						{stat.icon}
					</div>
				))}
			</div>
		</div>
	);
};

export default UserDashboard;
