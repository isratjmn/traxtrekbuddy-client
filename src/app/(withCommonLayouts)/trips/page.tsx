"use client";
import React, { useState } from "react";
import { useGetAllTipsQuery } from "@/redux/api/tripApi";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import Pagination from "@/component/Forms/Pagination";
import Spinner from "@/component/Shared/Spinner/Spinner";

const ITEMS_PER_PAGE = 8;

const formatDate = (dateString: string | number | Date) => {
	const date = new Date(dateString);
	return date.toISOString().split("T")[0];
};

const AllTrips = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });
	const query: Record<string, any> = {};

	if (debouncedTerm) {
		query["searchTerm"] = debouncedTerm;
	}

	const { data, isLoading } = useGetAllTipsQuery({ ...query });
	const trips = data?.trips || [];
	const totalTrips = trips.length;
	const totalPages = Math.ceil(totalTrips / ITEMS_PER_PAGE);

	const paginatedTrips = trips.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="container mx-auto mt-24 max-w-screen-xl">
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search trips..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full p-2 border rounded mb-4"
				/>
			</div>
			{isLoading ? (
				
					<Spinner />
				
			) : (
				<>
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
							<thead className="bg-blue-50">
								<tr>
									<th className="py-3 text-lg font-extrabold px-4 border-b text-left  text-gray-700">
										Image
									</th>
									<th className="py-3 text-lg font-extrabold px-4 border-b text-left  text-gray-700">
										Destination
									</th>
									<th className="py-3 text-lg font-extrabold px-4 border-b text-left  text-gray-700">
										Start Date
									</th>
									<th className="py-3 text-lg font-extrabold px-4 border-b text-left  text-gray-700">
										End Date
									</th>
									<th className="py-3 text-lg font-extrabold px-4 border-b text-left  text-gray-700">
										Travel Type
									</th>
								</tr>
							</thead>
							<tbody>
								{paginatedTrips.map((trip) => (
									<tr
										key={trip?.id}
										className="hover:bg-gray-50"
									>
										<td className="py-3 px-4 border-b">
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
										<td className="py-3 px-4 border-b">
											{trip.destination}
										</td>
										<td className="py-3 px-4 border-b">
											{formatDate(trip.startDate)}
										</td>
										<td className="py-3 px-4 border-b">
											{formatDate(trip.endDate)}
										</td>
										<td className="py-3 px-4 border-b">
											{trip.travelType}
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

export default AllTrips;
