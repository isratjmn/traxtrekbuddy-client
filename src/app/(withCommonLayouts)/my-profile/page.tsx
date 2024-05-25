"use client";
import {
	useGetMyProfileQuery,
	useUpdateMyProfileMutation,
} from "@/redux/api/profileApi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUpload } from "react-icons/fa";

import SubmitTravelRequest from "@/component/Profile/SubmitTravelrequest";
import ProfileFileUploader from "@/component/Forms/ProfileFileUploader";
import Spinner from "@/component/Shared/Spinner/Spinner";
import Link from "next/link";

const MyProfile = () => {
	const { data: myData, refetch, isLoading } = useGetMyProfileQuery({});

	const [updateMyProfile, { isLoading: uploading }] =
		useUpdateMyProfileMutation({});
	const [profileImage, setProfileImage] = useState(
		myData?.userProfile?.profileImage
	);

	useEffect(() => {
		refetch();
	}, [myData, refetch]);

	const fileUploadHandler = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("data", JSON.stringify({}));
		updateMyProfile(formData);
		try {
			const updatedProfile = await updateMyProfile(formData).unwrap();
			if (updatedProfile) {
				setProfileImage(updatedProfile.userProfile.profileImage);
				refetch();
			}
		} catch (error) {
			console.error("Failed to upload profile image", error);
		}
	};

	return (
		<div className="container mx-auto px-4 py-10 ">
			<h5 className="text-teal-500 mb-4 mt-8 text-3xl py-6 font-extrabold">
				Personal Information
			</h5>
			<div className="flex flex-wrap">
				<div className="w-full md:w-[40%] mb-4 md:pr-4 rounded-xl">
					<Image
						src={myData?.userProfile?.profileImage}
						width={500}
						height={300}
						alt="ProfileImg"
					/>

					<div className="flex flex-wrap mt-10 w-full">
						<div className="w-[100%] lg:w-[92%] mb-3 text-lg gap-4">
							{uploading ? (
								<Spinner />
							) : (
								<ProfileFileUploader
									name="file"
									label="Image Upload"
									icon={<FaUpload className=" mr-2" />}
									onFileUpload={fileUploadHandler}
								/>
							)}
						</div>

						
					</div>
				</div>
				<div className="w-full md:w-[55%]">
					<div className="grid grid-cols-1 md:grid-cols-2  gap-4">
						<InformationBox label="Name" value={myData?.name} />
						<InformationBox label="Email" value={myData?.email} />
						<InformationBox
							label="Bio"
							value={myData?.userProfile?.bio}
						/>
						<InformationBox
							label="Age"
							value={myData?.userProfile?.age}
						/>
					</div>
					<Link href={`/profile/edit-profile`}>
						<button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded mt-4">
							Edit Your Profile
						</button>
					</Link>
					<SubmitTravelRequest />
				</div>
			</div>
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

export default MyProfile;
