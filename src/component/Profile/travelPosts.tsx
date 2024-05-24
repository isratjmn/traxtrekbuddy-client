import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";
import { ApiError } from "next/dist/server/api-utils";
import { useDeleteTripMutation } from "@/redux/api/tripApi";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TravelPosts = () => {
	const router = useRouter();
	const { data, isLoading, error } = useGetMyProfileQuery({});
	const [deleteTrip] = useDeleteTripMutation();

	if (isLoading)
		return (
			<p className="text-center text-xl mt-6 text-green-600 font-extrabold">
				Loading...
			</p>
		);

	if (error)
		return (
			<p>
				{" "}
				Error loading travel requests: {(error as ApiError)?.message}
			</p>
		);
	const { trips } = data;
	const handleDeleteConfirm = async (id: string) => {
		try {
			const res = await deleteTrip(id).unwrap();
			if (res?.id) {
				toast.success("Trip has been deleted successfully.");
				router.push("/my-profile");
			}
		} catch (error) {
			console.error("Error deleting trip:", error);
		}
	};

	return (
		<div className="container mx-auto px-4 py-6">
			<h2 className="text-2xl font-bold mt-6 mb-4 text-green-600">
				My Travel Posts
			</h2>
			<ToastContainer />
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								SL. No
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Destination
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[40%] tracking-wider"
							>
								Description
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Travel Dates
							</th>
							<th scope="col" className="relative px-6 py-3">
								<span className="sr-only">Edit</span>
							</th>
							<th scope="col" className="relative px-6 py-3">
								<span className="sr-only">Delete</span>
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200 py-16">
						{trips?.map((trip: any, index: any) => (
							<tr key={trip.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									{index + 1}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{trip.destination}
								</td>
								<td className="px-4 py-4 w-[40%] whitespace-nowrap max-w-xs overflow-x-auto">
									{trip.description}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">{`${new Date(
									trip.startDate
								).toLocaleDateString()} - ${new Date(
									trip.endDate
								).toLocaleDateString()}`}</td>
								<td className="px-8 py-4 whitespace-nowrap text-right gap-3 flex">
									<div className="bg-gray-200 py-2 px-2 rounded items-center justify-center">
										<Link href={`/travel-post/${trip?.id}`}>
											<button className="text-indigo-600 hover:text-indigo-900 mr-4">
												<FaEdit className="text-2xl" />
											</button>
										</Link>
									</div>
									<div className="bg-gray-200 p-2 rounded items-center justify-center">
										<button
											className="text-red-600 hover:text-red-900"
											onClick={() =>
												handleDeleteConfirm(trip.id)
											}
										>
											<FaTrash className="text-xl" />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TravelPosts;
