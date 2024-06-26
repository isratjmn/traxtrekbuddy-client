"use client";

import * as z from "zod";
import { FieldValues } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TTForms from "@/component/Forms/TTForms";
import TTInput from "@/component/Forms/TTInput";
import { storeUserInfo } from "@/services/auth.service";
import { UserLogin } from "@/services/actions/UserLogin";
import { userRegister } from "@/services/actions/userRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const RegisterPage: React.FC = () => {
	const router = useRouter();
	const [error, setError] = useState<string>("");
	const schemaValidation = z.object({
		name: z.string().min(1, { message: "Name is required" }),
		email: z.string().email({ message: "Invalid email address" }),
		password: z.string().min(1, { message: "Password is required" }),
		confirmPassword: z
			.string()
			.min(1, { message: "Confirm Password is required" }),
	});

	const defaultValues = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const handleRegister = async (values: FieldValues) => {
		try {
			const res = await userRegister(values);
			if (res?.data?.id) {
				toast.success("User created successfully");
				const result = await UserLogin({
					email: values.email,
					password: values.password,
				});
				if (result?.data?.token) {
					storeUserInfo({ accessToken: result?.data?.token });
					router.push("/login");
					router.refresh();
				}
			} else {
				setError(res?.message || "Please try again!");
			}
		} catch (err: any) {
			console.error(err.message);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<Toaster position="top-center" />

			<div className="w-full max-w-2xl p-8 bg-white shadow-md rounded-md border-2 border-gray-300 text-center">
				<div className="flex flex-col items-center mb-4">
					<h2 className="font-bold text-2xl mt-4">
						Register
						<Link
							href="/"
							className="text-2xl pl-2 font-bold text-black hover:text-teal-500 transition"
						>
							Trek<span className="text-teal-500">Trex</span>
							-Travel
						</Link>
					</h2>
				</div>
				<TTForms
					onSubmit={handleRegister}
					defaultValues={defaultValues}
					resolver={zodResolver(schemaValidation)}
				>
					<div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
						<div className="">
							<TTInput
								label="Name"
								type="text"
								fullWidth={true}
								name="name"
							/>
						</div>
						<TTInput
							label="Email"
							type="email"
							fullWidth={true}
							name="email"
						/>
						<TTInput
							label="Password"
							type="password"
							fullWidth={true}
							name="password"
						/>
						<TTInput
							label="Confirm Password"
							type="password"
							fullWidth={true}
							name="confirmPassword"
						/>
					</div>
					<button
						className="w-full py-2 bg-teal-500 text-white rounded-md mb-4"
						type="submit"
					>
						Register
					</button>
					{error && (
						<div className="bg-red-400 border-red-900 p-3 rounded text-white mt-2">
							{"Registration Failed"}
						</div>
					)}
					<p className="text-gray-700 font-semibold">
						Do you have an account?{" "}
						<Link href="/login">
							<strong className="text-teal-500 underline">
								Login
							</strong>
						</Link>
					</p>
				</TTForms>
			</div>
		</div>
	);
};

export default RegisterPage;
