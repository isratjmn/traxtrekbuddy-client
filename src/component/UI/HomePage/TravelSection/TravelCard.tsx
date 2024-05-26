"use client";

import { motion } from "framer-motion";
import { formattedDates } from "@/utilities/formatDates";
import Image from "next/image";
import Link from "next/link";

const TravelCard = ({ trip }: { trip: any }) => {
	return (
		<motion.div
			className="w-full sm:w-1/2 lg:w-1/3 p-4 flex"
			initial={{ scale: 0.5, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className="bg-white overflow-hidden rounded-lg shadow-lg flex flex-col justify-between w-full">
				{trip?.photos && (
					<div className="relative w-full h-56">
						<Image
							className="object-cover"
							src={trip.photos}
							alt={trip?.destination}
							layout="fill"
						/>
					</div>
				)}

				<div className="px-4 font-bold text-xl mt-4">
					{trip?.destination}
				</div>

				<div className="px-4 pt-4 pb-2 flex justify-start items-center space-x-2">
					<strong className="text-gray-600 text-lg">
						Travel dates:
					</strong>
					<span className="text-gray-600 text-[16px]">
						{formattedDates(trip.startDate)}
					</span>
					<span className="text-gray-600 text-[16px"> - </span>
					<span className="text-gray-600 text-[16px]">
						{formattedDates(trip.endDate)}
					</span>
				</div>

				<span className="text-gray-600 text-lg px-4">
					<strong>Travel Type: </strong>
					{trip?.travelType}
				</span>

				<div className="px-4 py-6">
					<Link href={`/trips/${trip.id}`}>
						<button className="bg-transparent border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white font-bold py-2 px-4 rounded border">
							View Details
						</button>
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default TravelCard;
