import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";
import { ApiError } from "next/dist/server/api-utils";
import { useDeleteTripMutation } from "@/redux/api/tripApi";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Shared/Spinner/Spinner";

const TravelPosts = () => {
	const { data, isLoading, error, refetch } = useGetMyProfileQuery({});
	const [deleteTrip] = useDeleteTripMutation();

	if (isLoading) return <Spinner />;

	if (error)
		return (
			<p>Error loading travel requests: {(error as ApiError)?.message}</p>
		);
	const { trips } = data;
	const handleDeleteConfirm = async (id: string) => {
		try {
			const res = await deleteTrip(id).unwrap();
			if (res?.id) {
				toast.success("Trip has been deleted successfully.");
				refetch();
			}
		} catch (error) {
			console.error("Error deleting trip:", error);
		}
	};

	return (
		<div className="container mx-auto px-4 py-6">
			<h2 className="text-3xl font-bold mb-8 text-teal-600">
				My Travel Posts
			</h2>
			<ToastContainer />
			<div className="overflow-x-auto">
				<table className="min-w-[90%] bg-white border w-[80%] border-gray-300  shadow-lg">
					<thead className="bg-teal-600 text-white rounded-2xl">
						<tr>
							<th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-r border-gray-200">
								SL. No
							</th>
							<th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-r border-gray-200">
								Destination
							</th>
							<th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider w-1/2 border-r border-gray-200">
								Description
							</th>
							<th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider w-1/2 border-r border-gray-200">
								Travrl Type
							</th>
							<th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-r border-gray-200">
								Travel Dates
							</th>
							<th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-r border-gray-200">
								Edit
							</th>
							<th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
								Delete
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{trips?.map((trip: any, index: any) => (
							<tr key={trip.id} className="hover:bg-gray-100">
								<td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
									{index + 1}
								</td>
								<td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
									{trip.destination}
								</td>
								<td className="px-6 py-4 whitespace-pre-wrap border-r border-gray-200">
									{trip.description}
								</td>
								<td className="px-6 py-4 whitespace-pre-wrap border-r border-gray-200">
									{trip.travelType}
								</td>
								<td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{`${new Date(
									trip.startDate
								).toLocaleDateString()} - ${new Date(
									trip.endDate
								).toLocaleDateString()}`}</td>
								<td className="px-6 py-4 whitespace-nowrap text-center border-r border-gray-200">
									<Link href={`/travel-post/${trip.id}`}>
										<button className="text-indigo-600 hover:text-indigo-900">
											<FaEdit className="text-2xl" />
										</button>
									</Link>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-center">
									<button
										className="text-red-600 hover:text-red-900"
										onClick={() =>
											handleDeleteConfirm(trip.id)
										}
									>
										<FaTrash className="text-2xl" />
									</button>
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
