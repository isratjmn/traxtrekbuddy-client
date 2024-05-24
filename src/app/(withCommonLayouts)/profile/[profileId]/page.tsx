"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
	useUpdateMyProfileMutation,
	useGetMyProfileQuery,
} from "@/redux/api/profileApi";
import { useRouter } from "next/navigation";
import TTForms from "@/component/Forms/TTForms";
import TTInput from "@/component/Forms/TTInput";
import { ToastContainer, toast } from "react-toastify";

type TParams = {
	params: {
		itemId: string;
	};
};

const EditProfileForm = ({ params }: TParams) => {
	const id = params?.itemId;
	const { data: getMyProfile, refetch } = useGetMyProfileQuery(id);
	console.log(getMyProfile);

	const [updateMyProfile, { isLoading: updating }] =
		useUpdateMyProfileMutation();
	const router = useRouter();

	const onSubmit = async (values: FieldValues) => {
		try {
			const res = await updateMyProfile({ id, body: values }).unwrap();
			console.log(res);
			await refetch();
			if (res?.id) {
				console.log(res);
				toast.success("Profile Updated Successfully!!!");
				router.push("/my-profile");
			}
			console.log("Profile updated successfully");
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};

	const defaultValues = {
		name: getMyProfile?.name || "",
		email: getMyProfile?.email || "",
		age: getMyProfile?.userProfile?.age || "",
		bio: getMyProfile?.userProfile?.bio || "",
	};

	return (
		<div className="w-full mt-20 item-center">
			<ToastContainer />
			<div className="w-[100%] rounded-lg mx-auto border p-12 bg-blue-50 shadow-lg max-w-[600px]">
				<h1 className="text-2xl text-green-500 font-bold mb-6">
					Update Your Profile
				</h1>
				<TTForms
					onSubmit={onSubmit}
					// resolver={zodResolver(passwordValidateSchema)}
					defaultValues={defaultValues}
				>
					<div className="grid grid-cols-1 pt-4 gap-4 mt-2 mb-4">
						<div>
							<TTInput
								name="name"
								label="Name"
								type="text"
								fullWidth={true}
							/>
						</div>
						<div>
							<TTInput
								name="email"
								label="Email"
								type="email"
								fullWidth={true}
								disabled={true}
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 pt-4 gap-4 md:grid-cols-2 mt-2 mb-4">
						<div>
							<TTInput
								name="bio"
								label="bio"
								type="text"
								fullWidth={true}
							/>
						</div>
						<div>
							<TTInput
								name="age"
								label="age"
								type="text"
								fullWidth={true}
							/>
						</div>
					</div>
					<button
						className="w-[100%] text-lg py-2 bg-green-500 text-white rounded mt-2"
						type="submit"
						disabled={updating}
					>
						{updating ? "Updating ..." : "Updated"}
					</button>
				</TTForms>
			</div>
		</div>
	);
};

export default EditProfileForm;
