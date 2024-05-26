/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import TravelCard from "./TravelCard";
import { formattedDates } from "@/utilities/formatDates";

const Travel = async () => {
	const res = await fetch("http://localhost:5000/api/trips", {
		next: {
			revalidate: 30,
		},
	});
	if (!res.ok) {
		console.error("Failed to fetch trips");
		return <div>Failed to load trips</div>;
	}

	const { data: trips } = await res.json();
	return (
		
		<div className="container mx-auto px-4 pt-32 mb-20">
			<h1 className="text-4xl mx-auto font-bold mb-7">
				Recent Travel Posts
			</h1>

			<p className="text-left text-lg text-gray-600 mb-14 w-[90%] lg:w-[60%]">
				Our mission is to make solo travel safer, more enjoyable, and
				filled with unforgettable memories. With our easy-to-use
				platform, you can find travel buddies, plan trips together, and
				share your journey with new friends.
			</p>

			<div className="flex flex-wrap -mx-4">
				{trips.slice(0, 6).map((trip: any, index: any) => (
					<TravelCard
						key={index}
						trip={{
							...trip,
							startDate: formattedDates(trip.startDate),
							endDate: formattedDates(trip.endDate),
						}}
					/>
				))}
			</div>
			<div className="flex justify-center mt-8">
				<Link href="/trips">
					<button className="bg-teal-400 text-white font-bold py-2 px-4 rounded w-40 text-center">
						View All
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Travel;
