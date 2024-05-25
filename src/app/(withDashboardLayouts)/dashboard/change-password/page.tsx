"use client";

import TTForms from "@/component/Forms/TTForms";
import TTInput from "@/component/Forms/TTInput";
import { useChangePasswordMutation } from "@/redux/api/AuthApi";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo, removeUser } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FieldValues } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

const passwordValidateSchema = z.object({
	currentPassword: z
		.string()
		.min(4, { message: "Current Password is required" }),
	newPassword: z.string().min(4, { message: "New Password is required" }),
	confirmPassword: z
		.string()
		.min(1, { message: "Confirm Password is required" }),
});

const defaultValues = {
	currentPassword: "",
	newPassword: "",
	confirmPassword: "",
};

const ChangePassword = () => {
	const router = useRouter();
	const [changePassword] = useChangePasswordMutation();
	const { refetch: refetchProfile } = useGetMyProfileQuery(undefined, {
		skip: true,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const userInfo = getUserInfo();
		setUser(userInfo);
	}, []);
	const onSubmit = async (values: FieldValues) => {
		if (!user) {
			setError("User not authenticated...!");
			return;
		}
		setLoading(true);
		try {
			const payload = { ...values, userId: user.id };
			await changePassword(payload).unwrap();
			toast.success("Password changed successfully.....!");
			removeUser();
			router.push("/login");
			await refetchProfile();
		} catch (err: any) {
			setError(err.data?.error || "An error occurred. Please try again.");
			toast.error(
				err.data?.error || "An error occurred. Please try again."
			);
			console.error(err?.message);
		}
		setLoading(false);
	};
	return (
		<div className="flex items-center justify-center pt-20">
			<Toaster position="top-center" />
			<div className="w-full shadow-xl max-w-xl p-8 border-2 border-gray-400 rounded-md text-center">
				<div className="flex flex-col items-center justify-center">
					<h2 className="flex font-bold text-3xl pb-4">
						Change Password
						<Link
							href="/"
							className="text-3xl pl-2 font-bold text-black hover:text-teal-500 transition"
						>
							Trek<span className="text-teal-500">Trex</span>
							-Travel
						</Link>
					</h2>
				</div>

				<div>
					<TTForms
						onSubmit={onSubmit}
						resolver={zodResolver(passwordValidateSchema)}
						defaultValues={defaultValues}
					>
						<div className="grid grid-cols-1 pt-4 gap-4 md:grid-cols-2 mt-2 mb-4">
							<div>
								<TTInput
									name="currentPassword"
									label="Current Password"
									type="text"
									fullWidth={true}
								/>
							</div>
							<div>
								<TTInput
									name="newPassword"
									label="New Password"
									type="text"
									fullWidth={true}
								/>
							</div>
						</div>
						<div>
							<TTInput
								name="confirmPassword"
								label="Confirm Password"
								type="text"
								fullWidth={true}
							/>
						</div>

						<button
							className="w-full text-lg py-2 bg-teal-500 text-white rounded mt-2"
							type="submit"
							disabled={loading}
						>
							{loading
								? "Changing Password..."
								: "Change Password"}
						</button>
						{error && (
							<div className="flex bg-red-400 justify-start mx-0 p-3 rounded text-white mt-2">
								{error}
							</div>
						)}
					</TTForms>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
