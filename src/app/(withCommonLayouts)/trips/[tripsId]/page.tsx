"use client";
import useUserInfo from "@/hooks/useUserInfo";
import { useCreateTravelRequestMutation } from "@/redux/api/travelBuddyApi";
import { useGetTripQuery } from "@/redux/api/tripApi";
import { formattedDates } from "@/utilities/formatDates";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type TProps = {
	params: {
		tripsId: string;
	};
};

const TravelDetails = ({ params }: TProps) => {
	const user = useUserInfo();
	const { data: getTrip, isLoading } = useGetTripQuery(params?.tripsId);
	const [createTravelRequest] = useCreateTravelRequestMutation();
	const [requestCount, setRequestCount] = useState(0);

	useEffect(() => {
		if (!user) {
			toast.error("Please log in to request a travel buddy.");
		}
	}, [user]);

	useEffect(() => {
		if (getTrip) {
			setRequestCount(getTrip?.travelBuddyRequests?.length);
		}
	}, [getTrip]);

	if (isLoading) return <div className="my-4 text-teal-600">Loading...</div>;

	const handleBuddyReq = async () => {
		const toastId = toast.loading("Requesting...");
		try {
			const requestData = {
				tripId: params.tripsId,
				userId: user?.id,
			};
			const res = await createTravelRequest(requestData).unwrap();
			if (res?.id) {
				toast.success("Travel buddy request sent successfully", {
					id: toastId,
					duration: 2000,
				});
				setRequestCount((prevCount) => prevCount + 1);
			}
		} catch (error) {
			toast.error("Something went wrong!", {
				id: toastId,
				duration: 2000,
			});
		}
	};

	return (
		<div className=" text-black mt-4">
			<Toaster />
			<div className="mx-auto w-full">
				<header
					className="bg-cover object-top bg-center h-[500px] w-full relative z-10"
					style={{ backgroundImage: `url(${getTrip?.photos})` }}
				>
					<div className="bg-white bg-opacity-50 h-full flex items-center justify-center">
						<h1 className="text-5xl font-extrabold">
							{getTrip?.destination}
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
					<p className="text-lg mb-4 w-[60%]">
						{getTrip?.description}
					</p>
				</div>
			</div>

			<div className="container mx-auto pt-20 px-4 md:px-0">
				<div className="bg-gradient-to-r from-gray-200 to-teal-600 p-8 rounded-lg shadow-lg mb-12 w-[80%] mx-auto">
					<h2 className="text-3xl mb-4 font-extrabold text-teal-800">
						Travel Details
					</h2>
					<div className="space-y-6">
						<div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
							<span className="text-lg font-semibold text-teal-600">
								Travel Type
							</span>
							<span className="text-lg text-gray-700">
								{getTrip?.travelType}
							</span>
						</div>
						<div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
							<span className="text-lg font-semibold text-teal-600">
								Start Date
							</span>
							<span className="text-lg text-gray-700">
								{formattedDates(getTrip?.startDate)}
							</span>
						</div>
						<div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
							<span className="text-lg font-semibold text-teal-600">
								End Date
							</span>
							<span className="text-lg text-gray-700">
								{formattedDates(getTrip?.endDate)}
							</span>
						</div>
						<div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
							<span className="text-lg font-semibold text-teal-600">
								Itinerary
							</span>
							<span className="text-lg text-gray-700">
								{getTrip?.itinerary}
							</span>
						</div>
						<div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
							<span className="text-lg font-semibold text-teal-600">
								Location
							</span>
							<span className="text-lg text-gray-700">
								{getTrip?.location}
							</span>
						</div>
					</div>
					<div className="mt-8 text-center">
						<button
							onClick={handleBuddyReq}
							disabled={requestCount >= 2}
							className={`bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 ${
								requestCount >= 2
									? "cursor-not-allowed bg-teal-300"
									: "hover:bg-teal-800"
							}`}
						>
							Request to Join Trip
						</button>
					</div>
				</div>

				<div className="container mx-auto pt-20">
					<h2 className="text-4xl mx-auto font-bold mb-2">
						Gallery
					</h2>
					<p className="text-left text-lg text-gray-600 mb-10 w-[90%] lg:w-[60%] ">
						Our mission is to make solo travel safer, more
						enjoyable, and filled with unforgettable memories. With
						our easy-to-use platform, you can find travel buddies,
						plan trips together, and share your journey with new
						friends.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
						src="https://res.cloudinary.com/dmr810p4l/image/upload/v1717539382/vlogger-3_sgnolu.webp"
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
			</div>
		</div>
	);
};

export default TravelDetails;
