"use client";
import React, { useState } from "react";
import { useDeleteTripMutation, useGetAllTipsQuery } from "@/redux/api/tripApi";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Pagination from "@/component/Forms/Pagination";
const ITEMS_PER_PAGE = 8;

const formatDate = (dateString: string | number | Date) => {
	const date = new Date(dateString);
	return date.toISOString().split("T")[0];
};

const ManageTrips = () => {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

	const query: Record<string, any> = {};

	if (debouncedTerm) {
		query["searchTerm"] = debouncedTerm;
	}
	const { data, isLoading } = useGetAllTipsQuery({ ...query });
	const [deleteTrip] = useDeleteTripMutation();

	const trips = data?.trips || [];
	const totalTrips = trips.length;
	const totalPages = Math.ceil(totalTrips / ITEMS_PER_PAGE);
	const paginatedTrips = trips.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handleRemoveTrip = async (id: string) => {
		try {
			const res = await deleteTrip(id).unwrap();
			if (res?.id) {
				toast.success("Trip has been deleted successfully.");
			}
		} catch (error) {
			console.error("Error deleting trip:", error);
		}
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="container mx-auto my-4 max-w-screen-xl">
			<Toaster position="top-center" />
			<div className="mb-2">
				<input
					type="text"
					placeholder="Search trips..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full p-2 border rounded mb-4"
				/>
			</div>
			{isLoading ? (
				<div className="text-center text-xl m-3 text-teal-600 font-extrabold">
					Loading...
				</div>
			) : (
				<>
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
							<thead className="bg-blue-50">
								<tr>
									<th className="py-2 text-lg font-extrabold px-4 border-b text-left text-gray-700">
										Image
									</th>
									<th className="py-2 text-lg font-extrabold px-4 border-b text-left text-gray-700">
										Destination
									</th>
									<th className="py-2 text-lg font-extrabold px-4 border-b text-left text-gray-700">
										Start Date
									</th>
									<th className="py-2 text-lg font-extrabold px-4 border-b text-left text-gray-700">
										End Date
									</th>
									<th className="py-2 text-lg font-extrabold px-4 border-b text-left text-gray-700">
										Travel Type
									</th>
									<th className="py-2 text-lg font-extrabold px-4 border-b text-left text-gray-700">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{paginatedTrips.map((trip: any) => (
									<tr
										key={trip?.id}
										className="hover:bg-gray-50"
									>
										<td className="py-2 px-4 border-b">
											{trip.photos && (
												<Image
													src={trip.photos}
													alt={trip.destination}
													width={100}
													height={100}
													className="object-cover rounded"
												/>
											)}
										</td>
										<td className="py-2 px-4 border-b">
											{trip.destination}
										</td>
										<td className="py-2 px-4 border-b">
											{formatDate(trip.startDate)}
										</td>
										<td className="py-2 px-4 border-b">
											{formatDate(trip.endDate)}
										</td>
										<td className="py-2 px-4 border-b">
											{trip.travelType}
										</td>
										<td className="py-2 px-4 border-b flex flex-col space-y-2">
											<Link
												className="px-2 py-2 flex text-white bg-teal-600 hover:bg-teal-800 rounded"
												href={`/admin-trip/${trip?.id}`}
											>
												<button className="text-indigo-600 hover:text-indigo-900 mr-4">
													<FaEdit className="text-2xl" />{" "}
												</button>
												Edit
											</Link>

											<button
												onClick={() =>
													handleRemoveTrip(trip.id)
												}
												className="px-3 py-2 flex gap-2 text-white bg-red-500 hover:bg-red-600 rounded"
											>
												<FaTrash size={20} />
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</>
			)}
		</div>
	);
};

export default ManageTrips;
