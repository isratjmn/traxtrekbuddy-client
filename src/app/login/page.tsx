"use client";

import TTForms from "@/component/Forms/TTForms";
import TTInput from "@/component/Forms/TTInput";
import { UserLogin } from "@/services/actions/UserLogin";
import { storeUserInfo } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

const loginValidationSchema = z.object({
	email: z.string().email("Please enter a valid email address!"),
	password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const handleLogin = async (values: FieldValues) => {
		setLoading(true);
		setError("");
		try {
			const res = await UserLogin(values);
			if (res?.data?.token) {
				storeUserInfo({ accessToken: res?.data?.token });
				toast.success("Logged in successfully...!!");
				router.push("/");
				router.refresh();
			} else {
				setError(
					res?.message || "Something Mismatched..! Try again..!"
				);
			}
		} catch (err: any) {
			setError("An error occurred. Please try again.");
			toast.error("An error occurred. Please try again.");
			console.error(
				err?.message || "An error occurred. Please try again."
			);
		}
		setLoading(false);
	};
	return (
		<div className="flex items-center justify-center h-screen">
			<Toaster position="top-center" />

			<div className="w-full max-w-2xl p-8 border-2 border-gray-400 shadow-lg rounded-md text-center">
				<div className="flex flex-col items-center justify-center">
					<div></div>
					<h2 className="font-bold text-3xl pb-4">
						Login
						<Link
							href="/"
							className="text-3xl pl-2 font-bold text-black hover:text-teal-500 transition"
						>
							Trek<span className="text-teal-500">Trex</span>
							-Trave
						</Link>
						l
					</h2>
				</div>
				<div>
					<TTForms
						onSubmit={handleLogin}
						resolver={zodResolver(loginValidationSchema)}
						defaultValues={{
							email: "",
							password: "",
						}}
					>
						<div className="grid grid-cols-1 pt-4 gap-4 md:grid-cols-2 mt-2 mb-4">
							<div>
								<TTInput
									name="email"
									label="Email"
									type="email"
									fullWidth={true}
								/>
							</div>
							<div>
								<TTInput
									name="password"
									label="Password"
									type="password"
									fullWidth={true}
								/>
							</div>
						</div>

						<button
							className="w-full  text-lg py-2 bg-teal-500 text-white rounded mt-2"
							type="submit"
							disabled={loading}
						>
							{loading ? "Logging in..." : "Login"}
						</button>
						{error && (
							<div className="bg-red-400 border-red-900 p-3 rounded text-white mt-2">
								{"Something Mismatched! Please Try again!"}
							</div>
						)}
						<p className="text-black font-semibold mt-4">
							Don&apos;t have an account?{" "}
							<Link href="/register">
								<strong className="text-teal-500">
									Create an account
								</strong>
							</Link>
						</p>
					</TTForms>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
