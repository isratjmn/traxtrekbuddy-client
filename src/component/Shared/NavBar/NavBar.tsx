"use client";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "@assets/logo.png";
import dynamic from "next/dynamic";
import Spinner from "../Spinner/Spinner";

const NavBar = () => {
	const AuthButton = dynamic(
		() => import("@/component/UI/AuthButton/AuthButton"),
		{
			ssr: false,
			loading: () => <Spinner />,
		}
	);
	const LinksAuth = dynamic(
		() => import("@/component/UI/LinksAuth/LinksAuth"),
		{
			ssr: false,
			loading: () => <Spinner />,
		}
	);

	return (
		<div className="navbar bg-base-100 fixed top-0 left-0 w-full shadow-md z-50 px-6 h-24">
			<div className="container max-w-[1440px] mx-auto flex justify-between items-center">
				<div className="navbar-start flex items-center">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost lg:hidden mr-0 md:mr-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow bg-base-100 rounded-md w-52 space-y-4"
						>
							<li>
								<Link
									href="/"
									className="lg:text-lg lg:text-black font-bold lg:hover:text-teal-500 text-[16px] text-gray-700 hover:text-teal-600 transition"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="lg:text-lg lg:text-black font-bold lg:hover:text-teal-500 text-[16px] text-gray-700 hover:text-teal-600 transition"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/travels"
									className="lg:text-lg lg:text-black font-bold lg:hover:text-teal-500 text-[16px] text-gray-700 hover:text-teal-600 transition"
								>
									Travels
								</Link>
							</li>

							<LinksAuth />
						</ul>
					</div>
					<div className="flex md:text-xl text-base font-extrabold items-center gap-2">
						<Image
							src={logo}
							width={40}
							height={40}
							alt="brand logo"
						/>
						<Link
							href="/"
							className="text-base md:text-2xl font-extrabold text-black hover:text-teal-500 transition"
						>
							Trek
							<span className="text-teal-600 text-base md:text-2xl font-extrabold">
								Trex
							</span>
							-Travel
						</Link>
					</div>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1 gap-6">
						<li>
							<Link
								href="/"
								className="text-lg text-black font-bold hover:text-teal-500 transition"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/about"
								className="text-lg text-bold text-black font-bold hover:text-teal-500 transition"
							>
								About Us
							</Link>
						</li>
						<li>
							<Link
								href="/travels"
								className="text-lg text-bold text-black font-bold hover:text-teal-500 transition"
							>
								Travels
							</Link>
						</li>

						<LinksAuth />
					</ul>
				</div>

				<div className="navbar-end flex justify-end gap-2">
					<AuthButton />
				</div>
			</div>
		</div>
	);
};

export default NavBar;
