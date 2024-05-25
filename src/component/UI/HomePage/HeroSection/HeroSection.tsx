"use client";
import React from "react";
import Image from "next/image";
import star from "@assets/star.svg";
import Button from "../../Button/Button";
import Banner from "@assets/banner.jpg";
import iconShare from "@assets/play.svg";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
	return (
		<motion.section
			className="container mx-auto flex mt-16 flex-col space-y-10 pt-10 pb-32 lg:py-20 xl:space-y-0 xl:space-x-10 md:flex-row"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
		>
			<motion.div
				className="relative z-20 flex flex-1 flex-col lg:w-1/2 justify-center align-middle lg:justify-start"
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 1, delay: 0.5 }}
			>
				<h1 className="font-bold w-[80%] text-3xl lg:text-6xl z-[-3]">
					Travel, enjoy and live a new and full life{" "}
				</h1>
				<p className="text-base lg:text-lg mt-1 lg:mt-4 text-gray-500 xl:max-w-[520px]">
					We want to be on each of your journeys seeking the
					satisfaction of seeing the incorruptible beauty of nature.
					We can help you on an adventure around the world in just one
					app.
				</p>
				<div className="my-4 lg:my-6 flex flex-wrap gap-6">
					<div className="flex items-center gap-2">
						{Array(5)
							.fill(1)
							.map((_, index) => (
								<Image
									src={star}
									key={index}
									alt="star"
									width={22}
									height={22}
								/>
							))}
					</div>

					<p className="font-bold text-lg lg:text-xl text-teal-700">
						198k
						<span className="text-base lg:text-lg ml-1">
							Excellent Reviews
						</span>
					</p>
				</div>

				<div className="flex flex-row w-[40%] gap-3">
					<Link href="/travels">
						<Button
							type="button"
							title="Share Your Trip"
							variant="btn_teal"
						/>
					</Link>
					<Link href="#">
						<Button
							type="button"
							title="How we work?"
							icon={iconShare}
							variant="btn_white_text"
						/>
					</Link>
				</div>
			</motion.div>

			<motion.div
				className="relative flex flex-1 items-center  lg:w-1/2"
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 1, delay: 0.5 }}
			>
				<div className="relative z-20 flex rounded-2xl flex-col gap-8 bg-blue-100 px-6 py-6">
					<Image
						src={Banner}
						alt="404 Error"
						width={650}
						height={500}
						style={{
							marginTop: "10px",
							maxWidth: "100%",
							borderRadius: "10px",
						}}
					/>
				</div>
			</motion.div>
		</motion.section>
	);
};

export default HeroSection;
