"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
	useGetMyProfileQuery,
	useUpdateMyProfileMutation,
} from "@/redux/api/profileApi";
import TTInput from "@/component/Forms/TTInput";
import toast, { Toaster } from "react-hot-toast";
import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logOutUser";

const EditProfileForm = () => {
	const user = useUserInfo();
	console.log(user);
	const router = useRouter();
	const { data: getMyProfile, refetch } = useGetMyProfileQuery({});
	const [updateMyProfile, { isLoading: updating }] =
		useUpdateMyProfileMutation();

	const methods = useForm({
		defaultValues: {
			name: "",
			email: "",
		},
	});

	useEffect(() => {
		if (getMyProfile) {
			methods.reset({
				name: getMyProfile?.name || "",
				email: getMyProfile?.email || "",
			});
		}
	}, [getMyProfile, methods]);

	const handleFormSubmit = async (values: any) => {
		console.log({ values });
		try {
			const res = await updateMyProfile({
				name: values.name,
				email: values.email,
			}).unwrap();
			console.log(res);
			refetch();
			if (res?.id) {
				toast.success("Profile Updated Successfully!!!");
				logoutUser(router);
				router.push("/login");
				router.refresh();
			}
			console.log("Profile updated successfully");
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error("Error updating profile. Please try again.");
		}
	};

	return (
		<div className="w-full mt-20 item-center">
			<Toaster />
			<div className="w-[100%] rounded-lg mx-auto border p-12 bg-blue-50 shadow-lg max-w-[600px]">
				<h1 className="text-2xl text-teal-500 font-bold mb-6">
					Update Your Profile
				</h1>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(handleFormSubmit)}>
						<div className="grid grid-cols-1 pt-4 gap-4 mt-2 mb-4">
							<TTInput
								name="name"
								label="Name"
								type="text"
								fullWidth={true}
							/>
							<TTInput
								name="email"
								label="Email"
								type="text"
								fullWidth={true}
							/>
						</div>

						<button
							className="w-[100%] text-lg py-2 bg-teal-500 text-white rounded mt-2"
							type="submit"
							disabled={updating}
						>
							{updating ? "Updating ..." : "Update"}
						</button>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};

export default EditProfileForm;
