"use client";
import React, { useEffect } from "react";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";
import Link from "next/link";
import router from "next/router";

const MyUpdateProfile = () => {
	const {
		data: myProfile,
		isLoading,
		error,
		refetch,
	} = useGetMyProfileQuery({});

	useEffect(() => {
		refetch();

		const handleRouteChange = () => {
			refetch();
		};

		router.events.on("routeChangeComplete", handleRouteChange);

		// Clean up the event listener on component unmount
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [refetch]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading profile</div>;

	return (
		<div className="container mx-auto px-4 py-2">
			<div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
				<InformationBox label="Name" value={myProfile?.name} />
				<InformationBox label="Email" value={myProfile?.email} />
				<InformationBox
					label="Bio"
					value={myProfile?.userProfile?.bio}
				/>
				<InformationBox
					label="Age"
					value={myProfile?.userProfile?.age}
				/>
			</div>
			<Link href={"/profile/edit-profile"}>
				<button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded mt-4">
					Edit Your Profile
				</button>
			</Link>
		</div>
	);
};
const InformationBox = ({
	label,
	value,
}: {
	label: string;
	value: string | number | Date;
}) => {
	const displayValue =
		value instanceof Date ? value.toLocaleDateString() : value;
	return (
		<div className="bg-gray-100 rounded p-4">
			<p className="text-secondary font-semibold">{label}</p>
			<p>{displayValue}</p>
		</div>
	);
};
export default MyUpdateProfile;
