"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const destinations = [
	{
		name: "Paris, France",
		image: "https://res.cloudinary.com/dmr810p4l/image/upload/v1717301224/package3_ru53qu.jpg",
		description: "Experience the romance of the City of Love.",
	},
	{
		name: "Kyoto, Japan",
		image: "https://res.cloudinary.com/dmr810p4l/image/upload/v1717301224/package8_ybjvob.jpg",
		description:
			"Discover the ancient temples and serene gardens of Kyoto.",
	},
	{
		name: "Cape Town, South Africa",
		image: "https://res.cloudinary.com/dmr810p4l/image/upload/v1717301223/afghanistan_ag6oom.png",
		description:
			"Visit Table Mountain and explore the stunning coastline of Cape Town.",
	},
	{
		name: "Banff National Park, Canada",
		image: "https://res.cloudinary.com/dmr810p4l/image/upload/v1717301224/package6_gjligx.jpg",
		description:
			"Discover the breathtaking beauty of the Canadian Rockies in Banff National Park.",
	},
	{
		name: "Bali, Indonesia",
		image: "https://res.cloudinary.com/dmr810p4l/image/upload/v1717301224/package2_ciymw9.jpg",
		description:
			"Relax on pristine beaches and immerse yourself in the rich culture of Bali.",
	},
	{
		name: "Bora Bora, French Polynesia",
		image: "https://res.cloudinary.com/dmr810p4l/image/upload/v1717301223/england_rxpaip.png",
		description:
			"Relax in luxury and enjoy the crystal-clear waters of Bora Bora's lagoons.",
	},
];

const FeaturedDestinations = () => {
	return (
		<section className="py-12 mb-16">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl mx-auto font-bold mb-2">
					Featured Destinations
				</h2>
				<p className="text-left text-lg text-gray-600 mb-10 w-[90%] lg:w-[60%] ">
					Our mission is to make solo travel safer, more enjoyable,
					and filled with unforgettable memories. With our easy-to-use
					platform, you can find travel buddies, plan trips together,
					and share your journey with new friends.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{destinations.map((destination, index) => (
						<motion.div
							key={index}
							className="relative overflow-hidden rounded-lg shadow-lg"
							whileHover={{
								scale: 1.05,
								transition: { duration: 0.3 },
							}}
						>
							<div
								key={index}
								className="relative overflow-hidden rounded-lg"
							>
								<Image
									src={destination.image}
									alt={destination.name}
									width={500}
									height={500}
									className="object-cover w-full h-64"
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-0 hover:opacity-100">
									<p className="text-white text-lg font-semibold">
										{destination.name}
									</p>
								</div>
								<div className="absolute bottom-0 font-bold left-0 right-0 px-4 py-3 bg-white bg-opacity-75">
									{destination.description}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturedDestinations;
