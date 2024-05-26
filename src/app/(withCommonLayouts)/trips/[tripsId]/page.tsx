"use client";
import { useGetTripQuery } from "@/redux/api/tripApi";
import { formattedDates } from "@/utilities/formatDates";
import Image from "next/image";

type TProps = {
	params: {
		tripsId: string;
	};
};

const TravelDetails = ({ params }: TProps) => {
	const { data, isLoading } = useGetTripQuery(params?.tripsId);
	console.log(data);

	if (isLoading) return <div className="my-4">Loading...</div>;

	return (
		<div className=" text-black mt-4">
			<div className="mx-auto w-full">
				<header
					className="bg-cover object-top bg-center h-[500px] w-full relative z-10"
					style={{ backgroundImage: `url(${data?.photos})` }}
				>
					<div className="bg-white bg-opacity-50 h-full flex items-center justify-center">
						<h1 className="text-5xl font-extrabold">
							{data?.destination}
						</h1>
					</div>
				</header>

				<div
					className="bg-blue-100 mx-auto w-[90%] p-8 rounded-lg shadow-md mb-12 relative z-20"
					style={{ marginTop: "-120px" }}
				>
					<h2 className="text-3xl mb-4 font-extrabold">
						Description
					</h2>
					<p className="text-lg mb-4 w-[60%]">{data?.description}</p>
				</div>
			</div>

			<div className="container mx-auto pt-20 px-4 md:px-0">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					<Image
						src="https://t3.ftcdn.net/jpg/02/45/68/40/360_F_245684006_e55tOria5okQtKmiLLbY30NgEHTIB0Og.jpg"
						width={360}
						height={240}
						alt="Destination1"
						className="rounded-lg shadow-md"
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
					<Image
						src="https://res.cloudinary.com/dmr810p4l/image/upload/v1716519955/about-us_g1f2n9.jpg"
						alt="Destination2"
						width={360}
						height={240}
						className="rounded-lg shadow-md"
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</div>

				<div className="bg-blue-100 p-8 container-full rounded-lg shadow-md mb-12 w-full">
					<h2 className="text-3xl mb-4 font-extrabold">
						Travel details
					</h2>
					<table className="table-auto w-full border border-gray-600">
						<tbody>
							<tr>
								<td className="text-lg border border-gray-400 px-4 py-3">
									Travel Type
								</td>
								<td className="text-lg border border-gray-400 px-4 py-3">
									{data?.travelType}
								</td>
							</tr>
							<tr>
								<td className="text-lg location border border-gray-400 px-4 py-3">
									Start Date
								</td>
								<td className="text-lg location border border-gray-400 px-4 py-3">
									{formattedDates(data?.startDate)}
								</td>
							</tr>
							<tr>
								<td className="text-lg location border border-gray-400 px-4 py-3">
									End Date
								</td>
								<td className="text-lg location border border-gray-400 px-4 py-3">
									{formattedDates(data?.endDate)}
								</td>
							</tr>
							<tr>
								<td className="text-lg location border border-gray-400 px-4 py-3">
									Itinerary
								</td>
								<td className="text-lg border border-gray-400 px-4 py-3">
									{data?.itinerary}
								</td>
							</tr>
							<tr>
								<td className="location border border-gray-400 px-4 py-3">
									Location
								</td>
								<td className="font-xl border border-gray-400 px-4 py-3">
									{data?.location}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="bg-gray-800 container p-8 rounded-lg shadow-md mb-12 w-full mx-0">
					<h2 className="text-3xl mb-4 text-white font-bold">
						View On Map
					</h2>
					<div className="h-64 w-full bg-blue-100 rounded-lg shadow-md">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509274!2d144.9630579159046!3d-37.8162797420216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d4b37c4d76e1!2sFlinders%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1600881548456!5m2!1sen!2sus"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen
							aria-hidden="false"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TravelDetails;
